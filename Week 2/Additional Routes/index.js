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
app.get("/login", (req, res) =>
{
res.send("<h1>Login</h1>");
});
app.get("/tickets", (req, res) =>
{
res.redirect(401, "/login");
});
app.get("/users", (req, res) =>
{
res.redirect(401, "/login");
});

// Start Server
app.listen(port, () => {
    console.log(`Express server listening at ${port}`);
});