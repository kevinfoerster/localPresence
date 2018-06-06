const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

const setData = (id, body) => {
  return admin
    .database()
    .ref(`${id}`)
    .set(body);
};
exports.checkIn = functions.https.onRequest((req, res) => {
  return Promise.all([setData(req.body.device, req.body)]).then(() => {
    return res.send(`OK`);
  });
});
