const express = require("express");
const serverless = require("serverless-http");

const app = express();

app.get("/tasks",function (request,response) {
  const username = request.query.username;
  response.json({
    //message :"Hello from my tasks from Lambda function"
    //message : `Username ${username} requested the tasks`
    tasks:[
      { Description :"Walk dog",TaskId: 1 , Completed : true , UserId:1},
      { Description :"Buy Suger",TaskId: 2 , Completed : false , UserId:1},
      { Description :"Clean Vessel",TaskId: 3 , Completed : false , UserId:1},
      { Description :"Swimming",TaskId: 4 , Completed : true , UserId:1}
    ]
  });
});

module.exports.handler = serverless(app);