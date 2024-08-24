// Supabase configuration
const supabaseUrl = 'https://pyecsyykgzeionihrhwi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5ZWNzeXlrZ3plaW9uaWhyaHdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ1MjIzNzMsImV4cCI6MjA0MDA5ODM3M30.oBNxX9Hl-89r_aCrzLJwbkdtdJB-e7rhOmhZd0q9RUc';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

document.addEventListener('DOMContentLoaded', () => {
    const createTeamForm = document.getElementById('create-team-form');
    const updateTeamForm = document.getElementById('update-team-form');
    const deleteTeamForm = document.getElementById('delete-team-form');
    const updateTeamSelect = document.getElementById('update-team-select');
    const deleteTeamSelect = document.getElementById('delete-team-select');
    const teamBoard = document.getElementById('team-board');

    // Load teams into dropdown and display them
    async function loadTeams() {
        updateTeamSelect.innerHTML = '';
        deleteTeamSelect.innerHTML = '';
        teamBoard.innerHTML = '';

        const { data: teams, error } = await supabase
            .from('teams')
            .select('*');

        if (error) {
            console.error('Error loading teams:', error);
            return;
        }

        teams.forEach(team => {
            updateTeamSelect.innerHTML += `<option value="${team.id}">${team.name}</option>`;
            deleteTeamSelect.innerHTML += `<option value="${team.id}">${team.name}</option>`;

            teamBoard.innerHTML += `
                <div class="team">
                    <h4>${team.name}</h4>
                    <p>Score: ${team.score}</p>
                    <p>Status: ${team.status}</p>
                </div>
            `;
        });
    }

    // Create team
    createTeamForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const teamName = document.getElementById('create-team-name').value;

        const { error } = await supabase
            .from('teams')
            .insert([{ name: teamName, score: 0, status: '' }]);

        if (error) {
            console.error('Error creating team:', error);
            return;
        }

        loadTeams();
    });

    // Update team
    updateTeamForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const teamId = updateTeamSelect.value;
        const teamScore = parseInt(document.getElementById('update-team-score').value, 10);
        const teamStatus = document.getElementById('update-team-status').value;

        // Get current score to add to it
        const { data: currentData, error: fetchError } = await supabase
            .from('teams')
            .select('score')
            .eq('id', teamId)
            .single();

        if (fetchError) {
            console.error('Error fetching current score:', fetchError);
            return;
        }

        const newScore = currentData.score + teamScore;

        const { error } = await supabase
            .from('teams')
            .update({ score: newScore, status: teamStatus })
            .eq('id', teamId);

        if (error) {
            console.error('Error updating team:', error);
            return;
        }

        loadTeams();
    });

    // Delete team
    deleteTeamForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const teamId = deleteTeamSelect.value;

        const { error } = await supabase
            .from('teams')
            .delete()
            .eq('id', teamId);

        if (error) {
            console.error('Error deleting team:', error);
            return;
        }

        loadTeams();
    });

    loadTeams();
});
