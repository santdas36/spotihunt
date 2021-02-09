import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyC9gyVJKR3e9bE9gXRsKQ_Bdl2EejJKMGE",
  authDomain: "spot-i-hunt.firebaseapp.com",
  projectId: "spot-i-hunt",
  storageBucket: "spot-i-hunt.appspot.com",
  messagingSenderId: "555769904290",
  appId: "1:555769904290:web:0157604e6136295d89ebfb",
  measurementId: "G-CTR51E85X7"
};

const firebaseAdmin = firebase.initializeApp(firebaseConfig);
const db = firebaseAdmin.firestore();
const auth = firebase.auth();
const analytics = firebase.analytics();
const timestamp = firebase.firestore.FieldValue.serverTimestamp();
export { auth, db, timestamp, analytics };
