const admin = require("firebase-admin");
require('dotenv').config()

const { PROJECT_ID, PRIVATE_KEY, CLIENT_EMAIL } = process.env;

const serviceAccount = {
  projectId: PROJECT_ID,
  clientEmail: CLIENT_EMAIL,
  privateKey: PRIVATE_KEY,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
