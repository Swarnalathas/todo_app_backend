const express = require("express");
const serverless = require("serverless-http");
const mysql = require("mysql");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const connection  = mysql.createConnection({
  host: process.env.DB_HOST, // enviroment variable to set
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});
//connection.connect();

app.get("/tasks",function (request,response) {
  connection.query("SELECT * FROM tasks",function(err,result,fields) { 
    if(err) {      
      console.log("Error fetching tasks",err);       
      response.status(500).json({
        error: err
      }); 
    } else {
      response.json({ tasks: result});
    }   
  });  
});

app.post("/tasks",function (request,response) {
  const taskToBeSaved = request.body;    
  connection.query('INSERT INTO tasks SET ?',taskToBeSaved, function (err, results, fields) {
    if(err) {      
      console.log("Error fetching tasks",err);       
      response.status(500).json({
        error: err
      }); 
    } else {
      response.json({ 
        task_id: results.insertId
        });      
    }   
  }); 
});

app.put("/tasks/:id",function(request,response){
  const updatedTask = request.params.id;
  const updateTaskDesc = request.body; 
  connection.query('UPDATE tasks SET ? WHERE task_id = ?', [updateTaskDesc, updatedTask], function (err, results, fields) {
    if(err) {      
      console.log("Error fetching tasks",err);       
      response.status(500).json({
        error: err
      }); 
    } else {      
        response.send("Tasks Updated");         
    }   
  }); 
});

app.delete("/tasks/:id",function(request,response){
  const taskId = request.params.id; 
  connection.query("DELETE FROM tasks WHERE task_id = ?",[taskId],function(err,result,fields){
    if(err !== null) {
      console.log("something went wrond deleting the task",err );
      response.send(500);
    } else {
    response.send("Item Deleted");
    }
  });  
});

module.exports.handler = serverless(app);