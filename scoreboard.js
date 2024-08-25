document.addEventListener('DOMContentLoaded', function() {
    const supabaseUrl = 'https://pyecsyykgzeionihrhwi.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5ZWNzeXlrZ3plaW9uaWhyaHdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ1MjIzNzMsImV4cCI6MjA0MDA5ODM3M30.oBNxX9Hl-89r_aCrzLJwbkdtdJB-e7rhOmhZd0q9RUc';
    const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

    const refreshButton = document.getElementById('refresh-btn');
    const scoreBoardBody = document.querySelector('#score-board tbody');

    // Function to load and display teams
    async function loadTeams() {
        const { data, error } = await supabase
            .from('teams')
            .select('*');

        if (error) {
            console.error('Error loading teams:', error);
            return;
        }

        updateScoreBoard(data);
    }

    // Function to update the scoreboard table
    function updateScoreBoard(teams) {
        scoreBoardBody.innerHTML = '';
        teams.forEach(team => {
            const row = document.createElement('tr');

            const nameCell = document.createElement('td');
            nameCell.textContent = team.name;
            row.appendChild(nameCell);

            const scoreCell = document.createElement('td');
            scoreCell.textContent = team.score;
            row.appendChild(scoreCell);

            const statusCell = document.createElement('td');
            statusCell.textContent = team.status || '-';
            row.appendChild(statusCell);

            scoreBoardBody.appendChild(row);
        });
    }

    // Event listener for the refresh button
    refreshButton.addEventListener('click', loadTeams);

    // Initial load of teams when the page loads
    loadTeams();
});
