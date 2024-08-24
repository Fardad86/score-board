// Firebase configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";


const firebaseConfig = {
    apiKey: "AIzaSyDkfWwCITUJf1qR-3A2KD-xwf87ho98GTc",
    authDomain: "lig-score-board.firebaseapp.com",
    projectId: "lig-score-board",
    storageBucket: "lig-score-board.appspot.com",
    messagingSenderId: "993583824589",
    appId: "1:993583824589:web:0f9bb30c2bf766b238f384"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

const loginBtn = document.getElementById('login-btn');
const addTeamBtn = document.getElementById('add-team-btn');
const scoreBoard = document.getElementById('score-board');
const adminSection = document.getElementById('admin-section');

loginBtn.addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            adminSection.style.display = 'block';
            document.getElementById('login-section').style.display = 'none';
            loadTeams();
        })
        .catch((error) => {
            console.error("Error logging in: ", error);
        });
});

addTeamBtn.addEventListener('click', async () => {
    const teamName = document.getElementById('team-name').value;
    await addDoc(collection(db, "teams"), {
        name: teamName,
        score: 0,
        status: ''
    });
    loadTeams();
});

async function loadTeams() {
    scoreBoard.innerHTML = '';
    const querySnapshot = await getDocs(collection(db, "teams"));
    querySnapshot.forEach((doc) => {
        const team = doc.data();
        const teamDiv = document.createElement('div');
        teamDiv.className = 'team';
        teamDiv.innerHTML = `${team.name}: ${team.score} - ${team.status}`;
        scoreBoard.appendChild(teamDiv);
    });
}
