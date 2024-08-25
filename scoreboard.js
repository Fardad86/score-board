document.addEventListener('DOMContentLoaded', function() {
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
