const admin = require("firebase-admin");
const firebaseConfig = require("./config");

// Google Auth
serviceAccount = require("../serviceAccount.json");
const adminConfig = JSON.parse(process.env.FIREBASE_CONFIG);
adminConfig.credential = admin.credential.cert(serviceAccount);
admin.initializeApp(adminConfig);

// Initialize Firebase
const firebase = require("firebase");
firebase.initializeApp(firebaseConfig);

// Database sugar
const db = admin.firestore();

//exports
module.exports = {
  admin,
  db
};