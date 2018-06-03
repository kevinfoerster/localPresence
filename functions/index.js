const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

const setData = (id, entry) => {
  return admin
    .database()
    .ref(`${id}/entry`)
    .set(entry);
};
exports.checkIn = functions.https.onRequest((req, res) => {
  return Promise.all([setData(req.body.device, req.body.entry)]).then(() => {
    return res.send(`OK`);
  });
});
