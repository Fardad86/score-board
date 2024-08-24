// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { getFirestore, collection, addDoc, deleteDoc, doc, getDocs, setDoc } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

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
const db = getFirestore(app);

// Handle create/update team
document.addEventListener('DOMContentLoaded', () => {
    const createTeamForm = document.getElementById('create-team-form');
    const deleteTeamForm = document.getElementById('delete-team-form');

    // Create/Update team
    createTeamForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const teamName = document.getElementById('team-name').value;
        const teamScore = document.getElementById('team-score').value;
        const teamStatus = document.getElementById('team-status').value;

        try {
            await setDoc(doc(db, 'teams', teamName), {
                score: parseInt(teamScore, 10),
                status: teamStatus
            });
            alert('Team created/updated successfully');
            loadTeams(); // Refresh the team list
        } catch (error) {
            console.error("Error adding/updating team: ", error);
        }
    });

    // Delete team
    deleteTeamForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const teamName = document.getElementById('delete-team-name').value;

        try {
            await deleteDoc(doc(db, 'teams', teamName));
            alert('Team deleted successfully');
            loadTeams(); // Refresh the team list
        } catch (error) {
            console.error("Error deleting team: ", error);
        }
    });

    // Load teams and display them
    async function loadTeams() {
        const teamBoard = document.getElementById('team-board');
        teamBoard.innerHTML = '';

        try {
            const querySnapshot = await getDocs(collection(db, 'teams'));
            querySnapshot.forEach((doc) => {
                const teamData = doc.data();
                teamBoard.innerHTML += `
                    <div class="team">
                        <h4>${doc.id}</h4>
                        <p>Score: ${teamData.score}</p>
                        <p>Status: ${teamData.status}</p>
                    </div>
                `;
            });
        } catch (error) {
            console.error("Error loading teams: ", error);
        }
    }

    loadTeams(); // Initial load of teams
});
