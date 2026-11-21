// Welcome Message
console.log("Welcome to Fablewood!");

// Explore Button
const welcomeButton = document.getElementById("welcomeBtn");

welcomeButton.addEventListener("click", function() {
    alert("Welcome to Fablewood! 🦋");
});

// Login Button
const loginButton = document.querySelector(".login-btn");

loginButton.addEventListener("click", function() {
    alert("Login page is coming soon!");
});

// Sign Up Button
const signupButton = document.querySelector(".signup-btn");

signupButton.addEventListener("click", function() {
    alert("Create your account soon!");
});

// Community Button
const communityButton = document.querySelector(".community-btn");

communityButton.addEventListener("click", function() {
    alert("Welcome to our reading community! 📚");
});
