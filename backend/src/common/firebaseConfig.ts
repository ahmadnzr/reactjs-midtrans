import admin, { ServiceAccount } from "firebase-admin";

const { PROJECT_ID, PRIVATE_KEY, CLIENT_EMAIL } = process.env;

const serviceAccount: ServiceAccount = {
  projectId: PROJECT_ID,
  clientEmail: CLIENT_EMAIL,
  privateKey: PRIVATE_KEY,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
