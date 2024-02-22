'use strict';

// Imports
import express from "express";

// Application Constants
const app = express();
const port = 8080;

// Middleware logging function
app.use((req, res, next) => {
    console.log(`Request from IP: ${req.ip}, URL: ${req.originalUrl}`);
    next(); // Call next to proceed to the next middleware or route handler
});

// Middleware for user authentication
function auth_user(req, res, next) {
    // Check if the user is authenticated (you can add your authentication logic here)
    // For demonstration purposes, let's assume authentication always fails
    const isAuthenticated = false;

    // If the user is not authenticated, redirect to the login page
    if (!isAuthenticated) {
        res.redirect("/login");
    } else {
        // If the user is authenticated, proceed to the next middleware or route handler
        next();
    }
}

// Routes
// Route for "/"
app.get("/", (req, res) => {
    res.send("<h1>Hello World</h1>");
});

// Route for "/login"
app.get("/login", (req, res) => {
    res.send("<h1>Login</h1>");
});

// Route for "/tickets"
app.get("/tickets", auth_user, (req, res) => {
    res.send("<h1>Tickets</h1>");
});

// Route for "/users"
app.get("/users", auth_user, (req, res) => {
    res.send("<h1>Users</h1>");
});

// Start Server
app.listen(port, () => {
    console.log(`Express server listening at ${port}`);
});