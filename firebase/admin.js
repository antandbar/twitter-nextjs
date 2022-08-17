import { getFirestore } from "firebase/firestore";
const admin = require("firebase-admin");


const serviceAccount = require("./firebase-keys.json");

try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://devter-b4b4b.firebaseapp.com",
    });
  } catch (e) {}
  
  export const firestore = getFirestore();
