import firebase from "firebase";
import {
    FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_DATABASE_URL,
    FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID
} from "react-native-dotenv";

// TODO: This is untested
const firebaseConfig = {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    databaseURL: FIREBASE_DATABASE_URL,
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET,
    messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
    appId: FIREBASE_APP_ID,
    measurementId: FIREBASE_MEASUREMENT_ID
};

// TODO: Install and init firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const dbRef = firebase.database().ref();

// Children
export const routesRef = dbRef.child("routes");
export const runsRef = dbRef.child("runs");