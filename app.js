// پیکربندی Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

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

// منطق لاگین ادمین
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
        
            if (username === 'admin' && password === 'admin0912') {
                window.location.href = 'admin.html';
            } else {
                document.getElementById('error-message').innerText = 'Invalid login credentials';
            }
        });
    }

    loadTeams();
});

// منطق مدیریت تیم‌ها
const addTeamBtn = document.getElementById('add-team-btn');
const scoreBoard = document.getElementById('score-board');
const adminSection = document.getElementById('admin-section');

if (addTeamBtn) {
    addTeamBtn.addEventListener('click', async () => {
        const teamName = document.getElementById('team-name').value;
        await addDoc(collection(db, "teams"), {
            name: teamName,
            score: 0,
            status: ''
        });
        loadTeams();
    });
}

async function loadTeams() {
    if (scoreBoard) {
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
}
