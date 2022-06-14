# AirWorthy

## Application Description

A full stack application that uses an authentication system to allow FAA Inspectors, Airliners, and Aircraft Technicians to update progress on their work all while keeping a log of records on projects completed.

## The Task

The MERN full-stack application had to meet the following requirements:

Use React for the front end.

* Use GraphQL with a Node.js and Express.js server.

* Use MongoDB and the Mongoose ODM for the database.

* Use queries and mutations for retrieving, adding, updating, and deleting data.

* Be deployed using Heroku (with data).

* Have a polished UI.

* Be responsive.

* Be interactive (i.e., accept and respond to user input).

* Include authentication (JWT).

* Protect sensitive API key information on the server.

* Have a clean repository that meets quality coding standards (file structure, naming conventions, best practices for class and id naming conventions, indentation, high-quality comments, etc.).

* Have a high-quality README (with unique name, description, technologies used, screenshot, and link to deployed application).

## Technologies Used

### Application
* concurrently

### Client
* @testing-library/jest-dom
* @testing-library/react-testing-library
* bootstrap
* jQuery
* auth0/jwt-decode
* lokesh/lightbox2
* sass/node-sass
* necolas/normalize.css
* floating-ui/popper.js
* facebook/react-dom
* facebook/create-react-app
* remix-run/react-router-dom
* webpack-contrib/sass-loader
* mattboldt/typed.js
* GoogleChrome/web-vitals

### Server
* apollographql/apollo-server
* kelektiv/node.bcrypt.js
* bootstrap
* snetz/cjs
* expressjs/express
* graphql/graphql-js
* auth0/node-jsonwebtoken
* Automattic/mongoose
* remy/nodemon

## User Story

```md
AS AN FAA inspector 
I WANT to have a central database
SO THAT I maintain the authenticity of work from certified and uncertified technicians.

AS AN Airline Company 
I WANT to have a central database
SO THAT I am be able to track the progress of the teams that are assigned to maintenance of our aircraft.

AS AN Aircraft Maintenance Technician 
I WANT to be able to see the projects I am working on and assigned to
SO THAT I can log my work history to log my time as I complete the work I do on the aircraft.
```
## Acceptance Criteria

```md
GIVEN an airplane maintenance database
WHEN I load the search engine
THEN I am presented with a menu with the options to Login or Signup
```
## Screenshot

Landing Page:
![Landing Page](/assets/images/AirWorthy_Landing.png)

Manager Interface:
![Manager Interface] ()

## GitHub Repository & Deployed Application (Heroku)

* GitHub Repository: <https://github.com/BinaryBitBytes/AirWorthy>
* Deployed Application: <https://air-worthy.herokuapp.com/>