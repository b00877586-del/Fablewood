// Firebase Imports
import { auth, db } from "./firebase.js";

import {
    onAuthStateChanged,
    updateProfile
} from "https://www.gstatic.com/firebasejs/13.4.0/firebase-auth.js";

import {
    doc,
    getDoc,
    setDoc
} from "https://www.gstatic.com/firebasejs/13.4.0/firebase-firestore.js";


// Profile Elements
const profileName = document.getElementById("profileName");
const profileEmail = document.getElementById("profileEmail");
const profileBio = document.getElementById("profileBio");
const profileImage = document.getElementById("profileImage");
const editProfileBtn = document.getElementById("editProfileBtn");


// Check User Login
onAuthStateChanged(auth, async function(user) {

    if (!user) {
        alert("يجب تسجيل الدخول أولًا!");
        window.location.href = "index.html";
        return;
    }

    try {

        // Get User Data
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        let userData = {};

        if (userSnap.exists()) {
            userData = userSnap.data();
        }

        // Display User Information
        profileName.textContent =
            userData.username || user.displayName || "قارئ جديد";

        profileEmail.textContent = user.email;

        profileBio.textContent =
            userData.bio || "لم يكتب المستخدم نبذة عنه بعد.";

        profileImage.src =
            user.photoURL || "https://via.placeholder.com/120";


        // Edit Profile
        editProfileBtn.addEventListener("click", async function() {

            const newName = prompt(
                "اكتبي اسمك الجديد:",
                profileName.textContent
            );

            if (newName === null || !newName.trim()) {
                return;
            }

            const newBio = prompt(
                "اكتبي نبذة عن نفسك:",
                userData.bio || ""
            );

            if (newBio === null) {
                return;
            }

            try {

                // Update Firebase Auth
                await updateProfile(user, {
                    displayName: newName.trim()
                });

                // Update Firestore
                await setDoc(userRef, {
                    username: newName.trim(),
                    bio: newBio.trim()
                }, { merge: true });

                // Update Page
                profileName.textContent = newName.trim();

                profileBio.textContent =
                    newBio.trim() || "لم يكتب المستخدم نبذة عنه بعد.";

                userData.bio = newBio.trim();

                alert("تم تحديث ملفك الشخصي بنجاح! ❤️");

            } catch (error) {

                console.error(error);
                alert("حدث خطأ أثناء تحديث الملف الشخصي.");

            }

        });

    } catch (error) {

        console.error(error);
        alert("تعذر تحميل بيانات الملف الشخصي.");

    }

});
