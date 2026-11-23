import { initializeApp } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyChxoVgYJpKMCuQ_Wv7U2qCOlY6NRZA67M",
  authDomain: "fablewood-478bc.firebaseapp.com",
  projectId: "fablewood-478bc",
  storageBucket: "fablewood-478bc.firebasestorage.app",
  messagingSenderId: "850075489148",
  appId: "1:850075489148:web:3dbfb0eae66dfcc47ecaf9",
  measurementId: "G-EF9W8D1W6R"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
