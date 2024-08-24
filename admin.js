import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://pyecsyykgzeionihrhwi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5ZWNzeXlrZ3plaW9uaWhyaHdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ1MjIzNzMsImV4cCI6MjA0MDA5ODM3M30.oBNxX9Hl-89r_aCrzLJwbkdtdJB-e7rhOmhZd0q9RUc';

const supabase = createClient(supabaseUrl, supabaseKey);

// Function to create a new team
async function createTeam(teamName) {
    const { data, error } = await supabase
        .from('teams')
        .insert([{ name: teamName, score: 0, status: 'active' }]);

    if (error) {
        console.error('Error creating team:', error);
    } else {
        console.log('Team created successfully:', data);
    }
}

// Function to update team score and status
async function updateTeam(teamName, score, status) {
    const { data, error } = await supabase
        .from('teams')
        .update({ score: supabase.raw('score + ?', [score]), status: status || 'active' })
        .eq('name', teamName);

    if (error) {
        console.error('Error updating team:', error);
    } else {
        console.log('Team updated successfully:', data);
    }
}

// Function to delete a team
async function deleteTeam(teamName) {
    const { data, error } = await supabase
        .from('teams')
        .delete()
        .eq('name', teamName);

    if (error) {
        console.error('Error deleting team:', error);
    } else {
        console.log('Team deleted successfully:', data);
    }
}

// Event listeners for the admin panel
document.getElementById('create-team-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const teamName = document.getElementById('team-name').value;
    await createTeam(teamName);
});

document.getElementById('update-team-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const teamName = document.getElementById('update-team-name').value;
    const score = parseInt(document.getElementById('team-score').value, 10);
    const status = document.getElementById('team-status').value;
    await updateTeam(teamName, score, status);
});

document.getElementById('delete-team-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const teamName = document.getElementById('delete-team-name').value;
    await deleteTeam(teamName);
});
