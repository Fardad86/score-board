import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://pyecsyykgzeionihrhwi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5ZWNzeXlrZ3plaW9uaWhyaHdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ1MjIzNzMsImV4cCI6MjA0MDA5ODM3M30.oBNxX9Hl-89r_aCrzLJwbkdtdJB-e7rhOmhZd0q9RUc';

const supabase = createClient(supabaseUrl, supabaseKey);

// Function to load teams and display on scoreboard
async function loadTeams() {
    const { data, error } = await supabase
        .from('teams')
        .select('*');

    if (error) {
        console.error('Error loading teams:', error);
        return;
    }

    const scoreboard = document.getElementById('score-board');
    scoreboard.innerHTML = '';

    data.forEach(team => {
        const row = document.createElement('div');
        row.className = 'score-row';
        row.innerHTML = `
            <div class="team-name">${team.name}</div>
            <div class="team-score">${team.score}</div>
            <div class="team-status">${team.status}</div>
        `;
        scoreboard.appendChild(row);
    });
}

// Event listener for refresh button
document.getElementById('refresh-scoreboard').addEventListener('click', loadTeams);

// Initial load
loadTeams();
