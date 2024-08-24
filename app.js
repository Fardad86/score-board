// Import the necessary Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

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
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Admin login logic
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
        
            try {
                // Assuming you have set up Firebase Authentication for email/password sign-in
                await signInWithEmailAndPassword(auth, username, password);
                // Redirect to admin page on successful login
                window.location.href = 'admin.html';
            } catch (error) {
                // Display error message
                document.getElementById('error-message').innerText = 'Invalid login credentials';
            }
        });
    }
});

// Logic for adding and managing teams
const addTeamBtn = document.getElementById('add-team-btn');
const scoreBoard = document.getElementById('score-board');

if (addTeamBtn) {
    addTeamBtn.addEventListener('click', async () => {
        const teamName = document.getElementById('team-name').value;
        if (teamName) {
            await db.collection("teams").add({
                name: teamName,
                score: 0,
                status: ''
            });
            loadTeams();
        }
    });
}

async function loadTeams() {
    if (scoreBoard) {
        scoreBoard.innerHTML = '';
        const querySnapshot = await db.collection("teams").get();
        querySnapshot.forEach((doc) => {
            const team = doc.data();
            const teamDiv = document.createElement('div');
            teamDiv.className = 'team';
            teamDiv.innerHTML = `${team.name}: ${team.score} - ${team.status}`;
            scoreBoard.appendChild(teamDiv);
        });
    }
}

// Function to update team score or status
async function updateTeam(teamId, newScore, newStatus) {
    const teamRef = db.collection("teams").doc(teamId);
    await teamRef.update({
        score: newScore,
        status: newStatus
    });
    loadTeams();
}

// Function to delete a team
async function deleteTeam(teamId) {
    await db.collection("teams").doc(teamId).delete();
    loadTeams();
}

