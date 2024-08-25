document.addEventListener('DOMContentLoaded', function() {
    // Initialize Supabase client
    const supabaseUrl = 'https://pyecsyykgzeionihrhwi.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5ZWNzeXlrZ3plaW9uaWhyaHdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ1MjIzNzMsImV4cCI6MjA0MDA5ODM3M30.oBNxX9Hl-89r_aCrzLJwbkdtdJB-e7rhOmhZd0q9RUc';

    // Ensure Supabase is correctly loaded
    if (typeof window.supabase !== 'undefined') {
        const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

        const refreshButton = document.getElementById('refresh-btn');
        const scoreBoardBody = document.querySelector('#score-board tbody');

        async function fetchTeams() {
            try {
                const { data, error } = await supabase
                    .from('teams')
                    .select('*');

                if (error) {
                    console.error('Error fetching teams:', error);
                    return [];
                }

                return data;
            } catch (err) {
                console.error('Error fetching teams:', err);
                return [];
            }
        }

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

        refreshButton.addEventListener('click', async function() {
            const teams = await fetchTeams();
            updateScoreBoard(teams);
        });

        // Initial load
        refreshButton.click();
    } else {
        console.error('Supabase client is not loaded correctly.');
    }
});
