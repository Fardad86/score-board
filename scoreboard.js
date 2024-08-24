import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://your-project-id.supabase.co'; // Replace with your Supabase URL
const supabaseKey = 'your-public-anon-key'; // Replace with your Supabase Key
const supabase = createClient(supabaseUrl, supabaseKey);

document.addEventListener('DOMContentLoaded', () => {
    const refreshButton = document.getElementById('refresh-button');
    const scoreBoard = document.getElementById('score-board');

    async function loadTeams() {
        scoreBoard.innerHTML = '';

        try {
            const { data: teams, error } = await supabase.from('teams').select('*');
            if (error) throw error;

            teams.forEach(team => {
                scoreBoard.innerHTML += `
                    <div class="team">
                        <h4>${team.name}</h4>
                        <p>Score: ${team.score}</p>
                        <p>Status: ${team.status}</p>
                    </div>
                `;
            });
        } catch (error) {
            console.error('Error loading teams:', error);
        }
    }

    refreshButton.addEventListener('click', () => {
        loadTeams(); // Refresh the list when button is clicked
    });

    loadTeams(); // Initial load of teams
});
