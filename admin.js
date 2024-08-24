import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pyecsyykgzeionihrhwi.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5ZWNzeXlrZ3plaW9uaWhyaHdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ1MjIzNzMsImV4cCI6MjA0MDA5ODM3M30.oBNxX9Hl-89r_aCrzLJwbkdtdJB-e7rhOmhZd0q9RUc'
const supabase = createClient(supabaseUrl, supabaseKey)

// Handle create/update team
document.addEventListener('DOMContentLoaded', async () => {
    const createTeamForm = document.getElementById('create-team-form');
    const teamSelect = document.getElementById('team-select');
    const teamList = document.getElementById('team-list');

    async function loadTeams() {
        const { data: teams, error } = await supabase.from('teams').select();
        if (error) {
            console.error('Error fetching teams:', error);
            return;
        }

        teamSelect.innerHTML = '<option value="">Select a team</option>';
        teamList.innerHTML = '';

        teams.forEach(team => {
            teamSelect.innerHTML += `<option value="${team.name}">${team.name}</option>`;
            teamList.innerHTML += `
                <div class="team-item">
                    <span>${team.name} - Score: ${team.score}</span>
                    <button data-name="${team.name}" class="delete-btn">Delete</button>
                </div>
            `;
        });

        // Add delete button event listeners
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', async (event) => {
                const teamName = event.target.dataset.name;
                const { error } = await supabase.from('teams').delete().eq('name', teamName);
                if (error) {
                    console.error('Error deleting team:', error);
                } else {
                    loadTeams(); // Refresh team list
                }
            });
        });
    }

    createTeamForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const teamName = document.getElementById('team-name').value;
        const teamScore = document.getElementById('team-score').value;
        const teamStatus = document.getElementById('team-status').value;

        try {
            await supabase.from('teams').upsert({
                name: teamName,
                score: parseInt(teamScore, 10),
                status: teamStatus
            });
            alert('Team created/updated successfully');
            loadTeams(); // Refresh the team list
        } catch (error) {
            console.error("Error adding/updating team: ", error);
        }
    });

    loadTeams(); // Initial load of teams
});
