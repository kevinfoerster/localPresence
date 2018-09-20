#!/usr/bin/env node
require('dotenv').load();
var request = require('request');
var firebase = require('firebase');
const location = process.env.LOCATION;
const auth_token = process.env.HOME_ASSITANT_LONG_LIVED_TOKEN;
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
    if (!location || snapshot.val().name === location) {
      request.post(
        {
          url: process.env.REQUEST_URL,
          headers: auth_token
            ? {
                Authorization: `Bearer ${auth_token}`
              }
            : null,
          formData: snapshot.val()
        },
        function optionalCallback(err, httpResponse, body) {
          if (err) {
            return console.error('upload failed:', err);
          }
          console.log('Update successful!  Server responded with:', body);
        }
      );
    }
  });
