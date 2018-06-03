#!/usr/bin/env node
require('dotenv').load();
var request = require('request');
var firebase = require('firebase');

// Initialize Firebase
var config = {
  apiKey: process.env.FIREBASE_API_KEY,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID
};
firebase.initializeApp(config);

var database = firebase.database();

database.ref('users');
firebase
  .database()
  .ref()
  .on('child_changed', function(snapshot) {
    request.post(
      {
        url: process.env.REQUEST_URL,
        formData: snapshot.val()
      },
      function optionalCallback(err, httpResponse, body) {
        if (err) {
          return console.error('upload failed:', err);
        }
        console.log('Update successful!  Server responded with:', body);
      }
    );
  });
