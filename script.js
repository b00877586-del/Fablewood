import { auth, db } from "./firebase.js";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile
} from "https://www.gstatic.com/firebasejs/13.4.0/firebase-auth.js";
// Welcome Message
console.log("Welcome to Fablewood!");

// Explore Button
const welcomeButton = document.getElementById("welcomeBtn");

welcomeButton.addEventListener("click", function() {
    alert("أهلًا بك في عالم Fablewood! 🦋");
});


// Login Button
const loginButton = document.querySelector(".login-btn");

loginButton.addEventListener("click", function() {
    alert("صفحة تسجيل الدخول قريبًا!");
});


// Sign Up Button
const signupButton = document.querySelector(".signup-btn");

signupButton.addEventListener("click", function() {
    alert("صفحة إنشاء الحساب قريبًا!");
});


// Community Button
const communityButton = document.querySelector(".community-btn");

communityButton.addEventListener("click", function() {
    alert("أهلًا بك في مجتمع القراء! 📚");
});
// Authentication Elements

const authModal = document.getElementById("authModal");
const authForm = document.getElementById("authForm");
const authTitle = document.getElementById("authTitle");
const authSubmit = document.getElementById("authSubmit");
const authSwitch = document.getElementById("authSwitch");
const authMessage = document.getElementById("authMessage");

const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const signupButton = document.querySelector(".signup-btn");
const loginButton = document.querySelector(".login-btn");
const closeModal = document.getElementById("closeModal");

let isSignupMode = true;
