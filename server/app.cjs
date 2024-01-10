// import * as express from "express"; //minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
// const Express = () => {
//   return express;
// };
// const app = express;
const path = require("path");
const express = require("express");
const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(express.static("images"));
// app.use("/static", express.static("public"));
app.use("/static", express.static(path.join(__dirname, "public")));
// app.use("/static", express.static("assets"));
app.use("/static", express.static(path.join(__dirname, "assets")));
// {app.get} == CORRECT - 01/09/2023 {lines[17-19]}
app.get("/", function (req, res, next) {
  next();
});

// app.listen({ port: 3069 }, () => {
app.listen(port, () => {
  console.log(`The Express Server is running @ http://localhost:${port}`);
});

//server.applyMiddleware(app);

/*
!EXAMPLE CRUD ROUTES
!----------------------------------------------------------------
 Respond with Hello World! on the homepage:
! Create
  app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  Respond to POST request on the root route (/), the application’s home page:
! Read
  app.post('/', (req, res) => {
    res.send('Got a POST request')
  })
  Respond to a PUT request to the /user route:
! Update
  app.put('/user', (req, res) => {
    res.send('Got a PUT request at /user')
  })
  Respond to a DELETE request to the /user route:
! Delete
  app.delete('/user', (req, res) => {
    res.send('Got a DELETE request at /user')
  }) 
 */ //!/!//!\\
