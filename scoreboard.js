document.addEventListener('DOMContentLoaded', function() {
    // Initialize Supabase client
    const supabaseUrl = 'https://pyecsyykgzeionihrhwi.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5ZWNzeXlrZ3plaW9uaWhyaHdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ1MjIzNzMsImV4cCI6MjA0MDA5ODM3M30.oBNxX9Hl-89r_aCrzLJwbkdtdJB-e7rhOmhZd0q9RUc';
    const supabase = supabase.createClient(supabaseUrl, supabaseKey);

    const refreshButton = document.getElementById('refresh-btn');
    const scoreBoard = document.getElementById('score-board');

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
                const teamDiv = document.createElement('div');
                teamDiv.className = 'team';
                teamDiv.textContent = `Team: ${team.name}, Score: ${team.score}, Status: ${team.status || 'N/A'}`;
                scoreBoard.appendChild(teamDiv);
            });
        } else {
            console.error('Scoreboard element not found.');
        }
    }
});
