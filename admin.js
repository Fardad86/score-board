import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pyecsyykgzeionihrhwi.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5ZWNzeXlrZ3plaW9uaWhyaHdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ1MjIzNzMsImV4cCI6MjA0MDA5ODM3M30.oBNxX9Hl-89r_aCrzLJwbkdtdJB-e7rhOmhZd0q9RUc'
const supabase = createClient(supabaseUrl, supabaseKey)

// Handle form submissions
document.addEventListener('DOMContentLoaded', async () => {
    const createTeamForm = document.getElementById('create-team-form');
    const updateTeamForm = document.getElementById('update-team-form');
    const deleteTeamForm = document.getElementById('delete-team-form');
    const updateTeamSelect = document.getElementById('update-team-select');
    const deleteTeamSelect = document.getElementById('delete-team-select');

    // Load teams and update select options
    async function loadTeams() {
        const { data: teams, error } = await supabase.from('teams').select();
        if (error) {
            console.error('Error fetching teams:', error);
            return;
        }

        updateTeamSelect.innerHTML = '<option value="">Select a team</option>';
        deleteTeamSelect.innerHTML = '<option value="">Select a team</option>';
        document.getElementById('team-board').innerHTML = '';

        teams.forEach(team => {
            updateTeamSelect.innerHTML += `<option value="${team.name}">${team.name}</option>`;
            deleteTeamSelect.innerHTML += `<option value="${team.name}">${team.name}</option>`;
            document.getElementById('team-board').innerHTML += `
                <div class="team">
                    <h4>${team.name}</h4>
                    <p>Score: ${team.score}</p>
                    <p>Status: ${team.status}</p>
                </div>
            `;
        });
    }

    // Create Team
    createTeamForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const teamName = document.getElementById('create-team-name').value;

        try {
            const { error } = await supabase.from('teams').insert([{ name: teamName, score: 0, status: '' }]);
            if (error) throw error;
            alert('Team created successfully');
            loadTeams(); // Refresh the team list
        } catch (error) {
            console.error("Error creating team: ", error);
        }
    });

    // Update Team
    updateTeamForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const teamName = updateTeamSelect.value;
        const teamScore = document.getElementById('update-team-score').value;
        const teamStatus = document.getElementById('update-team-status').value;

        try {
            // Fetch the current team data
            const { data: [team], error: fetchError } = await supabase.from('teams').select().eq('name', teamName).single();
            if (fetchError) throw fetchError;

            // Update the team score
            const updatedScore = (team.score || 0) + parseInt(teamScore, 10);
            const { error } = await supabase.from('teams').update({ score: updatedScore, status: teamStatus }).eq('name', teamName);
            if (error) throw error;

            alert('Team updated successfully');
            loadTeams(); // Refresh the team list
        } catch (error) {
            console.error("Error updating team: ", error);
        }
    });

    // Delete Team
    deleteTeamForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const teamName = deleteTeamSelect.value;

        try {
            const { error } = await supabase.from('teams').delete().eq('name', teamName);
            if (error) throw error;
            alert('Team deleted successfully');
            loadTeams(); // Refresh the team list
        } catch (error) {
            console.error("Error deleting team: ", error);
        }
    });

    loadTeams(); // Initial load of teams
});
