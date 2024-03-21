import express from "express";
import bodyParser from "body-parser";
import db from "./connection.js";
import { ObjectId } from "mongodb";

const app = express();
app.disable("x-powered-by");
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

// Route for rendering the tokens.ejs view
app.get("/tokens", (req, res) => {
    res.render("tokens");
});

// Route for rendering the buy-tokens form
app.get("/tokens/buy-tokens", async (req, res) => {
    try {
        const collection = await db.collection("Tokens");
        const results = await collection.find({}).toArray();
        res.render("buy-tokens", { games: results });
    } catch (error) {
        console.error("Error fetching data from MongoDB:", error);
        res.status(404).send("Internal Server Error");
    }
});

// Route for handling the submission of buy-tokens form and storing data in MongoDB
app.post("/tokens/buy-tokens", async (req, res) => {
    try {
        const collection = await db.collection("orders");
        const newDoc = {
            order: Object.keys(req.body).map(key => ({ name: key, used: false })),
            date: new Date()
        };
        const result = await collection.insertOne(newDoc);
        const orderId = result.insertedId; // Get the ID of the inserted document
        res.render("tokens-bought", { orderId }); // Pass orderId to the view
    } catch (error) {
        console.error("Error storing data in MongoDB:", error);
        res.status(404).send("Internal Server Error");
    }
});

// Route for viewing orders by ID
app.get("/tokens/orders/:orderId", async (req, res) => {
    try {
        const orderId = req.params.orderId; // Get the order ID from the URL
        const collection = await db.collection("orders");
        const order = await collection.findOne({ _id: new ObjectId(orderId) }); // Use new keyword with ObjectId
        if (!order) {
            return res.status(404).send("Order not found");
        }
        res.render("order", { order });
    } catch (error) {
        console.error("Error fetching order from MongoDB:", error);
        res.status(500).send(`Internal Server Error: ${error.message}`);
    }
});

app.listen(8000, () => {
    console.log("Server listening on port 8000...");
});