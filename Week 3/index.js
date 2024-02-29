
'use strict';

// Imports
import express from "express";

// Application Constants
const app = express();

// Configuration
app.disable("x-powered-by");
app.set("view engine", "ejs");

// Static file serving middleware
app.use(express.static('public'));
app.use("/favicon.ico", express.static("public/assets/ico/SSP.ico"));

// Error handling middleware for 500 Internal Server Error
function handle_500(req, res, next) {
    res.status(500);
    res.format({
        html: () => {
            res.render("500", { url: req.protocol + "://" + req.hostname + req.originalUrl });
        },
        json: () => {
            res.json({ error: "Internal Server Error" });
        },
        default: () => {
            res.type("txt").send("Internal Server Error");
        }
    });
}

// Error handling middleware for 401 Unauthorized
function handle_401(req, res, next) {
    res.status(401);
    res.format({
        html: () => {
            res.render("401", { url: req.protocol + "://" + req.hostname + req.originalUrl });
        },
        json: () => {
            res.json({ error: "Unauthorized" });
        },
        default: () => {
            res.type("txt").send("Unauthorized");
        }
    });
}

// Route handler for the root URL
app.get("/", (req, res) => {
    res.render("index");
});

// Route handler for generating a 500 error
app.get("/break-it", (req, res) => {
    throw new Error("Broken It");
});

// Route handler for /tickets
app.get("/tickets", (req,res) => {
    // Local Variables
    let fakeDatabase = [
        { name: "Space Hill", price: 93.0 },
        { name: "Little Lightning Bank", price: 30.0 },
        { name: "Spooky Bungalow", price: 12.0 }
    ];
    res.render("tickets", { user: "Luke", data: fakeDatabase });
});

// Route handler for generating a 401 error
app.get('/unauth-it', function(req, res) {
    const error = new Error("Unauthorized It");
    error.status = 401;
    throw error;
});

// 404 error handling middleware
app.use((req, res, next) => {
    res.status(404);
    res.format({
        html: () => {
            res.render("404", { url: req.protocol + "://" + req.hostname + req.originalUrl });
        },
        json: () => {
            res.json({ error: "Not found" });
        },
        default: () => {
            res.type("txt").send("Not found");
        }
    });
});


// Generic error handling middleware
app.use((err, req, res, next) => {
    switch (err.status) {
        case 401:
            handle_401(req, res, next);
            break;
        default:
            handle_500(req, res, next);
            break;
    }
    console.error("You sent me: " + err.stack);
});

// Start the server
app.listen(8080, () => {
    console.log("Server listening...");
});