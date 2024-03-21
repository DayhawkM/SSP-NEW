'use strict'
// Imports
import { MongoClient } from "mongodb";

// Module Constants
const dbName = "SSP";
const dbUName = encodeURIComponent("dayhawkm");
const dbPass = encodeURIComponent("Cyclops44");
const url = `mongodb+srv://${dbUName}:${dbPass}@ssp.kupiwff.mongodb.net/?retryWrites=true&w=majority`;

// Module Objects
const dbClient = new MongoClient(url);
// Module Variables
let conn;
let db;

try
{
conn = await dbClient.connect();
console.log("Conn");
}
catch(err)
{
    console.error("HERE");
console.error(err);
}
db = conn.db(dbName);

export default db;