'use strict';

// Imports
import express from "express";

// Application Constants
const app = express();
const port = 8080;

// Routes
// Route for "/"
app.get("/", (req, res) => {
    res.send("<h1>Hello World</h1>");
});

// Route for "/login"
app.get("/login", (req, res) => {
    res.send("<h1>Login Page</h1>");
});

// Route for "/tickets"
app.get("/tickets", (req, res) => {
    res.send("<h1>Tickets Page</h1>");
});

// Route for "/users"
app.get("/users", (req, res) => {
    res.send("<h1>Users Page</h1>");
});

// Start Server
app.listen(port, () => {
    console.log(`Express server listening at ${port}`);
});