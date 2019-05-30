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
//connection.connect();

app.get("/tasks",function (request,response) {
  connection.query("SELECT * FROM tasks",function(err,result,fields) { 
    if(err !== null) {
      //for debugging purposes
      console.log("Error fetching tasks",err);
      //Response to the end client with suitable response      
      response.send(500); //response code 500 means user error
    } else {
      response.json({ tasks: result});
    }   
  });  
});

app.delete("/tasks/:id",function(request,response){
  const taskId = request.params.id;
  console.log(taskId);
  connection.query("DELETE FROM tasks WHERE task_id = ?",[taskId],function(err,result,fields){
    if(err !== null) {
      console.log("something went wrond deleting the task",err );
      response.send(500);
    } else {
    response.send("Item Deleted");
    }
  });
  //delete the task from database 
  //respond with a 200 status code
 

});

module.exports.handler = serverless(app);