const assert = require('assert');
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const dbName = 'myproject';

describe('Patients collection', function() {
  let client;
  let db;
  let patientsCollection;

  before(function(done) {
    // Connect to the server
    MongoClient.connect(url, function(err, _client) {
      assert.equal(null, err);
      client = _client;
      db = client.db(dbName);
      patientsCollection = db.collection('patients');
      done();
    });
  });

  after(function(done) {
    // Close the connection
    client.close();
    done();
  });

  it('should contain the same data as the input file', function(done) {
    // Load the data from the input file
    const inputData = // TODO: load the data from the input file

    // Compare the data in the input file to the data in the collection
    patientsCollection.find().toArray(function(err, patients) {
      assert.equal(null, err);
      assert.deepEqual(patients, inputData);
      done();
    });
  });
});

// To print out all patient IDs where the first name is missing, you can modify the test like this
it('should contain the same data as the input file', function(done) {
    // Load the data from the input file
    const inputData = // TODO: load the data from the input file
  
    // Compare the data in the input file to the data in the collection
    patientsCollection.find().toArray(function(err, patients) {
      assert.equal(null, err);
      assert.deepEqual(patients, inputData);
  
      // Print out patient IDs where the first name is missing
      patients.forEach(function(patient) {
        if (!patient.FIRSTNAME) {
          console.log(patient._id);
        }
      });
  
      done();
    });
  });
// Here is an example of how you can test for missing email addresses and consent:
it('should print out patient IDs where the email address is missing and consent is Y', function(done) {
    patientsCollection.find({ CONSET: 'Y' }).toArray(function(err, patients) {
      assert.equal(null, err);
  
      patients.forEach(function(patient) {
        if (!patient.EMAIL) {
          console.log(patient._id);
        }
      });
  
      done();
    });
  });
  
  it('should have created emails for patients who have consent as Y', function(done) {
    const emailsCollection = db.collection('emails');
    emailsCollection.find({ patientId: { $exists: true } }).toArray(function(err, emails) {
      assert.equal(null, err);
  
      patientsCollection.find({ CONSET: 'Y' }).toArray(function(err, patients) {
        assert.equal(null, err);
  
        // Make sure there is an email for each patient with consent as Y
        assert.equal(patients.length, emails.length);
  
        done();
      });
    });
  });
  
  it('should have scheduled emails for each patient correctly', function(done) {
    const emailsCollection = db.collection('emails');
    emailsCollection.find().toArray(function(err, emails) {
      assert.equal(null, err);
  
      emails.forEach(function(email) {
        // Get the scheduled date for the email
        const scheduledDate = email.scheduledDate;
  
        // Make sure the email is scheduled for a future date
        assert(scheduledDate > new Date());
      });
  
      done();
    });
  });
  