This project loads patient data from a flat file into a MongoDB collection, and schedules emails for patients with CONSET=Yes.

Prerequisites

Node.js,
MongoDB

Setup

Install the dependencies:
npm install

Start the MongoDB server:
mongod

Run the project
node demo.js

Testing
 npm insall mocha
To run the tests, use the following command:
npm test
The node-schedule package is used to schedule the emails.
