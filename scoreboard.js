import { createClient } from 'https://cdn.skypack.dev/@supabase/supabase-js';

const supabaseUrl = 'https://pyecsyykgzeionihrhwi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5ZWNzeXlrZ3plaW9uaWhyaHdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ1MjIzNzMsImV4cCI6MjA0MDA5ODM3M30.oBNxX9Hl-89r_aCrzLJwbkdtdJB-e7rhOmhZd0q9RUc';
const supabase = createClient(supabaseUrl, supabaseKey);

document.addEventListener('DOMContentLoaded', () => {
    const scoreBoard = document.getElementById('score-board');

    // Real-time subscription
    supabase
        .from('teams')
        .on('INSERT', payload => {
            console.log('New team added:', payload.new);
            updateScoreBoard();
        })
        .on('UPDATE', payload => {
            console.log('Team updated:', payload.new);
            updateScoreBoard();
        })
        .on('DELETE', payload => {
            console.log('Team deleted:', payload.old);
            updateScoreBoard();
        })
        .subscribe();

    async function updateScoreBoard() {
        scoreBoard.innerHTML = '';

        try {
            const { data, error } = await supabase
                .from('teams')
                .select('*');

            if (error) throw error;

            data.forEach((team) => {
                scoreBoard.innerHTML += `
                    <div class="team">
                        <h4>${team.name}</h4>
                        <p>Score: ${team.score}</p>
                        <p>Status: ${team.status}</p>
                    </div>
                `;
            });
        } catch (error) {
            console.error("Error loading teams: ", error);
        }
    }

    updateScoreBoard(); // Initial load of scoreboard
});
