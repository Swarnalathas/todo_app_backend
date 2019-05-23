const express = require("express");
const serverless = require("serverless-http");

const app = express();

app.get("/tasks",function (request,response) {
  const username = request.query.username;
  response.json({
    //message :"Hello from my tasks from Lambda function"
    message : `Username ${username} requested the tasks`
  });
});

module.exports.handler = serverless(app);