// Include the Supabase library via CDN
const script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/supabase.min.js';
script.onload = () => {
    const { createClient } = window['supabase'];

    // Supabase configuration
    const supabaseUrl = 'https://pyecsyykgzeionihrhwi.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5ZWNzeXlrZ3plaW9uaWhyaHdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ1MjIzNzMsImV4cCI6MjA0MDA5ODM3M30.oBNxX9Hl-89r_aCrzLJwbkdtdJB-e7rhOmhZd0q9RUc';
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Handle create/update and delete team
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
                const { error } = await supabase
                    .from('teams')
                    .upsert({ name: teamName, score: parseInt(teamScore, 10), status: teamStatus });
                
                if (error) {
                    throw error;
                }

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
                const { error } = await supabase
                    .from('teams')
                    .delete()
                    .match({ name: teamName });
                
                if (error) {
                    throw error;
                }

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
                const { data, error } = await supabase
                    .from('teams')
                    .select('*');

                if (error) {
                    throw error;
                }

                data.forEach((team) => {
                    teamBoard.innerHTML += `
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

        loadTeams(); // Initial load of teams
    });
};
document.head.appendChild(script);
