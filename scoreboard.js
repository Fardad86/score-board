// Import Supabase functions
import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = 'https://pyecsyykgzeionihrhwi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5ZWNzeXlrZ3plaW9uaWhyaHdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ1MjIzNzMsImV4cCI6MjA0MDA5ODM3M30.oBNxX9Hl-89r_aCrzLJwbkdtdJB-e7rhOmhZd0q9RUc';
const supabase = createClient(supabaseUrl, supabaseKey);

document.addEventListener('DOMContentLoaded', () => {
    const refreshButton = document.getElementById('refresh-board');
    const scoreBoard = document.getElementById('score-board');

    async function loadScores() {
        const { data: teams, error } = await supabase.from('teams').select();
        if (error) {
            console.error("Error loading scores: ", error);
            return;
        }
        scoreBoard.innerHTML = '';
        teams.forEach(team => {
            scoreBoard.innerHTML += `
                <div class="team">
                    <h4>${team.name}</h4>
                    <p>Score: ${team.score}</p>
                    <p>Status: ${team.status}</p>
                </div>
            `;
        });
    }

    refreshButton.addEventListener('click', loadScores);

    loadScores(); // Initial load of scores
});
