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
