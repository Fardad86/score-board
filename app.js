// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDkfWwCITUJf1qR-3A2KD-xwf87ho98GTc",
    authDomain: "lig-score-board.firebaseapp.com",
    projectId: "lig-score-board",
    storageBucket: "lig-score-board.appspot.com",
    messagingSenderId: "993583824589",
    appId: "1:993583824589:web:0f9bb30c2bf766b238f384"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Handle login
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            window.location.href = "admin.html"; // Redirect to admin panel
        } catch (error) {
            console.error("Error logging in: ", error);
            alert("Failed to log in. Please check your credentials.");
        }
    });
});
