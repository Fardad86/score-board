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
    const updateTeamSelect = document.getElementById('update-team-select');
    const deleteTeamSelect = document.getElementById('delete-team-select');

    // Load teams into the dropdowns
    async function loadTeams() {
        const { data: teams, error } = await supabase.from('teams').select();
        if (error) {
            console.error("Error loading teams: ", error);
            return;
        }
        updateTeamSelect.innerHTML = '';
        deleteTeamSelect.innerHTML = '';
        teams.forEach(team => {
            const option = `<option value="${team.name}">${team.name}</option>`;
            updateTeamSelect.innerHTML += option;
            deleteTeamSelect.innerHTML += option;
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
            alert('Failed to create team');
        }
    });

    // Update Team
    updateTeamForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const teamName = updateTeamSelect.value;
        const additionalScore = parseInt(document.getElementById('update-team-score').value) || 0;
        const status = document.getElementById('update-team-status').value;

        try {
            const { data: existingTeam, error: fetchError } = await supabase.from('teams').select().eq('name', teamName).single();
            if (fetchError) throw fetchError;

            const newScore = (existingTeam?.score || 0) + additionalScore;

            const { error: updateError } = await supabase.from('teams').update({ score: newScore, status }).eq('name', teamName);
            if (updateError) throw updateError;

            alert('Team updated successfully');
            loadTeams(); // Refresh the team list
        } catch (error) {
            console.error("Error updating team: ", error);
            alert('Failed to update team');
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
            alert('Failed to delete team');
        }
    });

    loadTeams(); // Initial load of teams
});
