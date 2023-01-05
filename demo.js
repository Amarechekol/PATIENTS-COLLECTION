const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const nodeSchedule = require('node-schedule');

const url = 'mongodb://localhost:27017';
const dbName = 'myproject';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  // Load the data into the Patients collection
  const patientsCollection = db.collection('patients');
  patientsCollection.insertMany(inputData, function(err, result) {
    assert.equal(null, err);
    console.log("Inserted documents into the patients collection");
  });

  // Schedule emails for patients with CONSET=Yes
  const emailsCollection = db.collection('emails');
  patientsCollection.find({ CONSET: 'Yes' }).forEach(function(patient) {
    // Schedule an email for each patient
    scheduleEmail(emailsCollection, patient, 1, 'Day 1');
    scheduleEmail(emailsCollection, patient, 2, 'Day 2');
    scheduleEmail(emailsCollection, patient, 3, 'Day 3');
    scheduleEmail(emailsCollection, patient, 4, 'Day 4');
  });

  client.close();
});

function scheduleEmail(emailsCollection, patient, numDays, name) {
  // Set the scheduled date for the email
  const scheduledDate = new Date();
  scheduledDate.setDate(scheduledDate.getDate() + numDays);

  // Create the email document
  const email = {
    patientId: patient._id,
    name: name,
    scheduledDate: scheduledDate
  };

  // Insert the email into the collection
  emailsCollection.insertOne(email, function(err, result) {
    assert.equal(null, err);
    console.log("Inserted email into the emails collection");
  });

  // Schedule the email to be sent at the scheduled date
  nodeSchedule.scheduleJob(scheduledDate, function() {
    sendEmail(patient, email);
  });
}

function sendEmail(patient, email) {
  // TODO: send the email to the patient
  console.log(`Sending email "${email.name}" to patient ${patient._id}`);
}



