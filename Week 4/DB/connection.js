'use strict';

// Imports
import { MongoClient } from "mongodb";

// This will allow for the connection to be made and later specifying which database to work with.

// Module Constants
const dbName = "SSP";
const dbUName = encodeURIComponent("mdayhawk");
const dbPass = encodeURIComponent("Cartoon.311");
const url = `mongodb+srv://${dbUName}:${dbPass}@ssp.zuogj4k.mongodb.net/?retryWrites=true&w=majority`;

// Module Objects
const dbClient = new MongoClient(url);
// Module Variables
let conn;
let db;

try { conn = await dbClient.connect();
 } 
 catch (err)
  { 
    console.error(err); 
}
 db = conn.db(dbName);

 export default db;