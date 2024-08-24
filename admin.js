import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://your-project-id.supabase.co'; // Replace with your Supabase URL
const supabaseKey = 'your-public-anon-key'; // Replace with your Supabase Key
const supabase = createClient(supabaseUrl, supabaseKey);

// Handle form submissions
document.addEventListener('DOMContentLoaded', () => {
    const createTeamForm = document.getElementById('create-team-form');
    const updateTeamForm = document.getElementById('update-team-form');
    const deleteTeamForm = document.getElementById('delete-team-form');
    
    // Create Team
    createTeamForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const teamName = document.getElementById('create-team-name').value;

        try {
            const { error } = await supabase.from('teams').insert([{ name: teamName, score: 0, status: '' }]);
            if (error) throw error;
            alert('Team created successfully');
            loadTeams(); // Refresh the list
        } catch (error) {
            console.error('Error creating team:', error);
        }
    });

    // Update Team
    updateTeamForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const teamName = document.getElementById('update-team-name').value;
        const teamScore = parseInt(document.getElementById('update-team-score').value, 10);
        const teamStatus = document.getElementById('update-team-status').value;

        try {
            const { data, error } = await supabase
                .from('teams')
                .update({ score: teamScore + (await getCurrentScore(teamName)), status: teamStatus })
                .eq('name', teamName);
            if (error) throw error;
            alert('Team updated successfully');
            loadTeams(); // Refresh the list
        } catch (error) {
            console.error('Error updating team:', error);
        }
    });

    // Delete Team
    deleteTeamForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const teamName = document.getElementById('delete-team-name').value;

        try {
            const { error } = await supabase.from('teams').delete().eq('name', teamName);
            if (error) throw error;
            alert('Team deleted successfully');
            loadTeams(); // Refresh the list
        } catch (error) {
            console.error('Error deleting team:', error);
        }
    });

    // Load Teams
    async function loadTeams() {
        const teamSelect = document.getElementById('update-team-name');
        const deleteTeamSelect = document.getElementById('delete-team-name');

        try {
            const { data: teams, error } = await supabase.from('teams').select('*');
            if (error) throw error;

            teamSelect.innerHTML = '';
            deleteTeamSelect.innerHTML = '';

            teams.forEach(team => {
                const option = document.createElement('option');
                option.value = team.name;
                option.text = team.name;
                teamSelect.appendChild(option);
                deleteTeamSelect.appendChild(option.cloneNode(true));
            });
        } catch (error) {
            console.error('Error loading teams:', error);
        }
    }

    async function getCurrentScore(teamName) {
        try {
            const { data: [team], error } = await supabase
                .from('teams')
                .select('score')
                .eq('name', teamName)
                .single();
            if (error) throw error;
            return team ? team.score : 0;
        } catch (error) {
            console.error('Error fetching current score:', error);
            return 0;
        }
    }

    loadTeams(); // Initial load of teams
});
