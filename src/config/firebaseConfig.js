import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAZesq2vMfwJXWguYhk5UB0-JCYQiSKnbA",
  authDomain: "todoapp-5dbb7.firebaseapp.com",
  projectId: "todoapp-5dbb7",
  storageBucket: "todoapp-5dbb7.appspot.com",
  messagingSenderId: "480551659222",
  appId: "1:480551659222:web:46b813230192d8449fcb77",
  measurementId: "G-S3JCBB886G"
};

const app = initializeApp(firebaseConfig);

export default firebaseConfig