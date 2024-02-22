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

app.listen(8080, () =>
{
console.log("Server listening...");
});
