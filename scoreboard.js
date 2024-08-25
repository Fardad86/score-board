document.addEventListener('DOMContentLoaded', function() {
    // Initialize Supabase client
    const supabaseUrl = 'https://pyecsyykgzeionihrhwi.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5ZWNzeXlrZ3plaW9uaWhyaHdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ1MjIzNzMsImV4cCI6MjA0MDA5ODM3M30.oBNxX9Hl-89r_aCrzLJwbkdtdJB-e7rhOmhZd0q9RUc';
    const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

    const refreshButton = document.getElementById('refresh-btn');
    const scoreBoardBody = document.querySelector('#score-board tbody');

    if (refreshButton) {
        refreshButton.addEventListener('click', async function() {
            try {
                const { data, error } = await supabase
                    .from('teams')
                    .select('*');

                if (error) {
                    console.error('Error loading teams:', error);
                } else {
                    updateScoreBoard(data);
                }
            } catch (err) {
                console.error('Error fetching teams:', err);
            }
        });
    } else {
        console.error('Refresh button not found.');
    }

    function updateScoreBoard(teams) {
        if (scoreBoard) {
            scoreBoard.innerHTML = '';
            teams.forEach(team => {
                const teamDiv = document.createElement('tr');
                
                const nameCell = document.createElement('td');
                nameCell.textContent = team.name;
                teamDiv.appendChild(nameCell);
                
                const scoreCell = document.createElement('td');
                scoreCell.textContent = team.score;
                teamDiv.appendChild(scoreCell);
                
                const statusCell = document.createElement('td');
                statusCell.textContent = team.status ? team.status : '';
                teamDiv.appendChild(statusCell);
                
                scoreBoard.appendChild(teamDiv);
            });
        } else {
            console.error('Scoreboard element not found.');
        }
    }

});
