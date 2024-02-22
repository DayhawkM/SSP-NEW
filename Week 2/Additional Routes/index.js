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
    // Redirect unauthenticated users to the login page
    // Since this middleware is intended for route protection,
    // it should invoke `next()` instead of redirecting the response
    // This allows the request to continue to the route handler if authentication passes
    // or to the next middleware if there's any
    // You can add your authentication logic here
    res.redirect("/login");
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

// Route for intentionally raising an error
app.get("/breaker", (req, res, next) => {
    throw new Error("BORKED");
});

// Error handling middleware for handling all errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// 404 Response middleware
app.use((err, req, res, next) =>
{
console.error(err.stack)
res.status(500);
res.format(
{
// html: () =>
// {
// res.render("500", {url: req.url});
// },
json: () =>
{
res.json({error: "Internal Server Error"});
},
default: () =>
{
res.type("txt").send("Internal Server Error");
}
});
});
// Start Server
app.listen(port, () => {
    console.log(`Express server listening at ${port}`);
});