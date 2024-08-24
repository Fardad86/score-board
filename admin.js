// Import Supabase functions
import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = 'https://pyecsyykgzeionihrhwi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5ZWNzeXlrZ3plaW9uaWhyaHdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ1MjIzNzMsImV4cCI6MjA0MDA5ODM3M30.oBNxX9Hl-89r_aCrzLJwbkdtdJB-e7rhOmhZd0q9RUc';
const supabase = createClient(supabaseUrl, supabaseKey);

// Handle form submissions
document.addEventListener('DOMContentLoaded', () => {
    const createTeamForm = document.getElementById('create-team-form');
    const updateTeamForm = document.getElementById('update-team-form');
    const deleteTeamForm = document.getElementById('delete-team-form');

    // Create team
    createTeamForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const teamName = document.getElementById('create-team-name').value;

        const { data, error } = await supabase
            .from('teams')
            .insert([{ name: teamName, score: 0, status: '' }]);

        if (error) {
            console.error('Error creating team:', error);
        } else {
            alert('Team created successfully');
            loadTeams(); // Refresh the team list
        }
    });

    // Update team
    updateTeamForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const teamName = document.getElementById('update-team-name').value;
        const teamScore = parseInt(document.getElementById('update-team-score').value, 10);
        const teamStatus = document.getElementById('update-team-status').value;

        const { data, error } = await supabase
            .from('teams')
            .upsert([{ name: teamName, score: teamScore, status: teamStatus }]);

        if (error) {
            console.error('Error updating team:', error);
        } else {
            alert('Team updated successfully');
            loadTeams(); // Refresh the team list
        }
    });

    // Delete team
    deleteTeamForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const teamName = document.getElementById('delete-team-name').value;

        const { data, error } = await supabase
            .from('teams')
            .delete()
            .eq('name', teamName);

        if (error) {
            console.error('Error deleting team:', error);
        } else {
            alert('Team deleted successfully');
            loadTeams(); // Refresh the team list
        }
    });

    // Load teams and display them
    async function loadTeams() {
        const teamBoard = document.getElementById('team-board');
        teamBoard.innerHTML = '';

        const { data, error } = await supabase
            .from('teams')
            .select('*');

        if (error) {
            console.error('Error loading teams:', error);
        } else {
            data.forEach((team) => {
                teamBoard.innerHTML += `
                    <div class="team">
                        <h4>${team.name}</h4>
                        <p>Score: ${team.score}</p>
                        <p>Status: ${team.status}</p>
                    </div>
                `;
            });
        }
    }

    loadTeams(); // Initial load of teams
});
