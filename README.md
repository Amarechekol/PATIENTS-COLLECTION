This project loads patient data from a flat file into a MongoDB collection, and schedules emails for patients with CONSET=Yes.

Prerequisites
Node.js
MongoDB
Setup
Install the dependencies:
Copy code
npm install
Start the MongoDB server:
Copy code
mongod
Run the project:
Copy code
node index.js
Testing
To run the tests, use the following command:

Copy code
npm test
Notes
The input data file is assumed to be in the following format:
Copy code

The node-schedule package is used to schedule the emails.
