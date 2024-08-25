// Initialize Supabase client
const supabaseUrl = 'https://pyecsyykgzeionihrhwi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5ZWNzeXlrZ3plaW9uaWhyaHdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ1MjIzNzMsImV4cCI6MjA0MDA5ODM3M30.oBNxX9Hl-89r_aCrzLJwbkdtdJB-e7rhOmhZd0q9RUc';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

document.addEventListener('DOMContentLoaded', () => {
    const createTeamForm = document.getElementById('create-team-form');
    const updateTeamForm = document.getElementById('update-team-form');
    const deleteTeamForm = document.getElementById('delete-team-form');
    const teamBoard = document.getElementById('team-board');
    const updateTeamSelect = document.getElementById('update-team-select');
    const deleteTeamSelect = document.getElementById('delete-team-select');

    async function loadTeams() {
        const { data, error } = await supabase
            .from('teams')
            .select('*');

        if (error) {
            console.error('Error loading teams:', error);
        } else {
            populateTeamSelects(data);
            updateTeamBoard(data);
        }
    }

    function populateTeamSelects(teams) {
        updateTeamSelect.innerHTML = '';
        deleteTeamSelect.innerHTML = '';
        teams.forEach(team => {
            const option1 = document.createElement('option');
            option1.value = team.id;
            option1.textContent = team.name;
            updateTeamSelect.appendChild(option1);

            const option2 = document.createElement('option');
            option2.value = team.id;
            option2.textContent = team.name;
            deleteTeamSelect.appendChild(option2);
        });
    }

    function updateTeamBoard(teams) {
        teamBoard.innerHTML = '';
        teams.forEach(team => {
            const teamDiv = document.createElement('div');
            teamDiv.textContent = `Name: ${team.name}, Score: ${team.score}, Status: ${team.status || '-'}`;
            teamBoard.appendChild(teamDiv);
        });
    }

    createTeamForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('create-team-name').value;

        const { data, error } = await supabase
            .from('teams')
            .insert([{ name, score: 0, status: null }]);

        if (error) {
            console.error('Error creating team:', error);
        } else {
            loadTeams();
            createTeamForm.reset();
        }
    });

    updateTeamForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = updateTeamSelect.value;
        const score = parseInt(document.getElementById('update-team-score').value, 10);
        const status = document.getElementById('update-team-status').value;

        const { data: currentData, error: fetchError } = await supabase
            .from('teams')
            .select('score')
            .eq('id', id)
            .single();

        if (fetchError) {
            console.error('Error fetching current team score:', fetchError);
        } else {
            const newScore = (currentData ? currentData.score : 0) + score;

            const { error: updateError } = await supabase
                .from('teams')
                .update({ score: newScore, status })
                .eq('id', id);

            if (updateError) {
                console.error('Error updating team:', updateError);
            } else {
                loadTeams();
                updateTeamForm.reset();
            }
        }
    });

    deleteTeamForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = deleteTeamSelect.value;

        const { error } = await supabase
            .from('teams')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting team:', error);
        } else {
            loadTeams();
            deleteTeamForm.reset();
        }
    });

    loadTeams();
});
