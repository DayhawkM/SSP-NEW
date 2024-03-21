'use strict';

import bodyParser from "body-parser";
import express from "express";
import db from "../connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', (req, res) => {
    res.render("tokens");
});

router.get('/buy-tokens', async (req, res) => {
    try {
        let collection = await db.collection("Tokens");
        let results = await collection.find({}).toArray();
        res.render("buy-tokens", { games: results });
    } catch (error) {
        console.error("Error fetching data from MongoDB:", error);
        res.status(404).send("Internal Server Error");
    }
});

router.post("/buy-tokens", async (req, res, next) => {
    try {
        let collection = await db.collection("orders");
        let newDoc = {};
        
        // Demo what's in the body
        console.log(req.body);

        // Prepare the new order document
        newDoc.order = [];
        newDoc.date = new Date();
        Object.keys(req.body).forEach(key => {
            newDoc.order.push({ "name": key, "used": false });
        });

        // Insert the new order document
        let result = await collection.insertOne(newDoc);
        
        // Log the order ID
        console.log("Order ID:", result.insertedId);

        // Render the "tokens-bought" view with the order ID
        res.render("tokens-bought", { orderId: result.insertedId });
    } catch (error) {
        next(error);
    }
});

// View Orders by ID
router.get("/orders/:orderId", async (req, res, next) => {
    let findID;
    let collection = await db.collection("orders");
    let result;
    try {
        findID = new ObjectId(req.params.orderId);
        result = await collection.findOne({ "_id" : findID });

        // Check if we have that result, if not 404
        if (!result) {
            next();
        } else {
            res.render("order", { order: result });
        }
    } catch (err) {
        next(err);
    }
});

// Update Order by ID
router.post("/orders/:orderId", async (req, res, next) => {
    try {
        let collection = await db.collection("orders");
        let findID = new ObjectId(req.params.orderId);
        let result;

        // Log the request body
        console.log(req.body);

        // Update the order based on the order ID and the request body contents
        result = await collection.updateOne(
            { "_id": findID },
            { "$set": { "order.$[element].used": true } },
            { arrayFilters: [{ "element.name": { $eq: req.body.usedtoken } }] }
        );

        // Retrieve the updated order
        result = await collection.findOne({ "_id": findID });

        // Render the order page again to reflect the changes
        res.render("order", { order: result });
    } catch (error) {
        next(error);
    }
});

export default router;