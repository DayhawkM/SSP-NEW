'use strict'
// Imports
import express from "express";
// Application Constants
const app = express();

// Configuration
app.disable("x-powered-by");
app.set("view engine", "ejs");

app.use(express.static('public'));
app.use("/favicon.ico", express.static("public\\assets\\ico\\SSP.ico"));

function handle_500(req, res, next)
{
res.status(500);
res.format(
{
html: () =>
{
res.render("500", { url: req.protocol + "://" + req.hostname + req.originalUrl 
});
},
json: () =>
{
res.json({ error: "Internal Server Error" });
},
default: () =>
{
res.type("txt").send("Internal Server Error");
}
});
}

function handle_401(req, res, next)
{
res.status(500);
res.format(
{
html: () =>
{
res.render("401", { url: req.protocol + "://" + req.hostname + req.originalUrl 
});
},
json: () =>
{
res.json({ error: "Internal Server Error" });
},
default: () =>
{
res.type("txt").send("Internal Server Error");
}
});
}

app.get("/", (req, res) =>
{
res.render("index");
});

app.use((err, req, res, next) =>
{
switch (err.status)
{
case 401: 
handle_401(req, res, next);
break;
default: 
handle_500(req, res, next);
break;
}
console.error("You sent me: " + err.stack);})

app.use((req, res, next) =>
{
res.status(404);
res.format(
{
html: () =>
{
res.render("404", {url: req.protocol + "://" + req.hostname + req.originalUrl});
},
json: () =>
{
res.json({error: "Not found"});
},
default: () =>
{
res.type("txt").send("Not found");
}
});
})

app.get("/break-it", (req,res) =>
{
throw new Error("Broken It");
});

app.get('/unauth-it', function(req, res)
{
const error = new Error("Unauthorised It");
error.status = 401;
throw error;
});

app.get("/tickets", (req,res) =>
{
// Local Variables
let fakeDatabase =
[
{ name: "Space Hill", price: 93.0 },
{ name: "Little Lightning Bank", price: 30.0 },
{ name: "Spooky Bungalow", price: 12.0 }
]
res.render("tickets", { user: "Luke", data: fakeDatabase });
});


app.listen(8080, () =>
{
console.log("Server listening...");
});
