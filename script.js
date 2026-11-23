// Firebase Imports
import { auth, db } from "./firebase.js";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/13.4.0/firebase-auth.js";

import {
    doc,
    setDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/13.4.0/firebase-firestore.js";


// Welcome Message
console.log("Welcome to Fablewood!");


// Explore Button
const welcomeButton = document.getElementById("welcomeBtn");

welcomeButton.addEventListener("click", function() {
    alert("أهلًا بك في عالم Fablewood! 🦋");
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


// Open Modal
signupButton.addEventListener("click", function() {
    isSignupMode = true;
    updateAuthMode();
    authModal.classList.add("active");
});

loginButton.addEventListener("click", function() {
    isSignupMode = false;
    updateAuthMode();
    authModal.classList.add("active");
});


// Close Modal
closeModal.addEventListener("click", function() {
    authModal.classList.remove("active");
    authForm.reset();
    authMessage.textContent = "";
});


// Switch Between Login and Signup
authSwitch.addEventListener("click", function(event) {
    if (event.target.tagName === "SPAN") {
        isSignupMode = !isSignupMode;
        updateAuthMode();
    }
});


// Update Form
function updateAuthMode() {

    authTitle.textContent = isSignupMode
        ? "إنشاء حساب جديد"
        : "تسجيل الدخول";

    authSubmit.textContent = isSignupMode
        ? "إنشاء حساب"
        : "تسجيل الدخول";

    usernameInput.style.display = isSignupMode
        ? "block"
        : "none";

    usernameInput.required = isSignupMode;

    authSwitch.innerHTML = isSignupMode
        ? 'لديك حساب بالفعل؟ <span>تسجيل الدخول</span>'
        : 'ليس لديك حساب؟ <span>إنشاء حساب</span>';

    authMessage.textContent = "";
}
// Create Account / Login
authForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const username = usernameInput.value.trim();

    authMessage.textContent = "جارٍ تنفيذ طلبك...";
    authSubmit.disabled = true;

    try {

        if (isSignupMode) {

            // Create Account
            const userCredential =
                await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

            const user = userCredential.user;

            // Save Username
            await updateProfile(user, {
                displayName: username
            });

            // Save User Data in Firestore
            await setDoc(doc(db, "users", user.uid), {
                username: username,
                email: email,
                createdAt: serverTimestamp()
            });

            authMessage.textContent =
                "تم إنشاء حسابك بنجاح! أهلًا بك في Fablewood 🦋";

        } else {

            // Login
            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            authMessage.textContent =
                "تم تسجيل الدخول بنجاح! أهلًا بعودتك ❤️";
        }

        authForm.reset();

        setTimeout(function() {
            authModal.classList.remove("active");
            authMessage.textContent = "";
        }, 1500);

    } catch (error) {

        console.error(error);

        const errorMessages = {
            "auth/email-already-in-use":
                "هذا البريد مسجل بالفعل.",

            "auth/invalid-email":
                "البريد الإلكتروني غير صحيح.",

            "auth/weak-password":
                "كلمة المرور ضعيفة، استخدمي 6 أحرف على الأقل.",

            "auth/invalid-credential":
                "البريد الإلكتروني أو كلمة المرور غير صحيحة.",

            "auth/network-request-failed":
                "تحققي من اتصال الإنترنت."
        };

        authMessage.textContent =
            errorMessages[error.code] ||
            "حدث خطأ، حاولي مرة أخرى.";

    } finally {

        authSubmit.disabled = false;

    }

});

// Check Login State
const profileBtn = document.getElementById("profileBtn");

onAuthStateChanged(auth, function(user) {

    if (user) {

        console.log("Logged in:", user.displayName);

        signupButton.style.display = "none";
        loginButton.style.display = "none";

        profileBtn.style.display = "inline-block";

    } else {

        console.log("No user logged in.");

        signupButton.style.display = "inline-block";
        loginButton.style.display = "inline-block";

        profileBtn.style.display = "none";
    }

});


// Open Profile Page
profileBtn.addEventListener("click", function() {
    window.location.href = "profile.html";
});
