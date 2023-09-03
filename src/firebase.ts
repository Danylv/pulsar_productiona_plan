import { initializeApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
export const firebaseConfig: any = {
   apiKey: "AIzaSyDy3gihPJzOoKfzAlhSRGGCkgQQ5LFbVwY",
   authDomain: "pulsar-a051b.firebaseapp.com",
   // The value of `databaseURL` depends on the location of the database
   databaseURL: "https://pulsar-a051b-default-rtdb.europe-west1.firebasedatabase.app/",
   projectId: "pulsar-a051b",
   storageBucket: "pulsar-a051b.appspot.com",
   messagingSenderId: "669343389939",
   appId: "m9EaQf13aD6Z0d6T0uAb",
   // For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
   measurementId: "G-MEASUREMENT_ID",
   
};


// const apps = getApps();
// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);
