const express = require("express");
const serverless = require("serverless-http");
const mysql = require("mysql");

const app = express();

const connection  = mysql.createConnection({
  host: process.env.DB_HOST, // enviroment variable to set
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});
connection.connect();

app.get("/tasks",function (request,response) {
  connection.query("SELECT * FROM tasks",function(err,result,fields) { 
    if(err !== null) {
      //for debugging purposes
      console.log("Error fetching tasks",err);
      //Response to the end client with suitable response
      //response.status(500).json({ message : "Something went wrong" });
      response.send(500); //response code 500 means user error
    }
    response.json({ tasks: result});
  });  
});

module.exports.handler = serverless(app);