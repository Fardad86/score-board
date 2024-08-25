document.addEventListener('DOMContentLoaded', function() {
    // Initialize Supabase client
    const supabaseUrl = 'https://pyecsyykgzeionihrhwi.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5ZWNzeXlrZ3plaW9uaWhyaHdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ1MjIzNzMsImV4cCI6MjA0MDA5ODM3M30.oBNxX9Hl-89r_aCrzLJwbkdtdJB-e7rhOmhZd0q9RUc';
    const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

    const refreshButton = document.getElementById('refresh-btn');
    const scoreBoard = document.getElementById('score-board');

    // Function to fetch and update the scoreboard
    async function fetchAndUpdateScoreBoard() {
        try {
            const { data, error } = await supabase
                .from('teams')
                .select('*')
                .order('score', { ascending: false }); // Sort by score in descending order

            if (error) {
                console.error('Error loading teams:', error);
            } else {
                updateScoreBoard(data);
            }
        } catch (err) {
            console.error('Error fetching teams:', err);
        }
    }

    // Event listener for refresh button
    if (refreshButton) {
        refreshButton.addEventListener('click', fetchAndUpdateScoreBoard);
    } else {
        console.error('Refresh button not found.');
    }

    // Function to update scoreboard
    function updateScoreBoard(teams) {
        if (scoreBoard) {
            // Create and append the table header if it does not exist
            if (!scoreBoard.querySelector('thead')) {
                const thead = document.createElement('thead');
                const headerRow = document.createElement('tr');
                const headers = ['Team Name', 'Score', 'Status'];
                
                headers.forEach(headerText => {
                    const th = document.createElement('th');
                    th.textContent = headerText;
                    headerRow.appendChild(th);
                });

                thead.appendChild(headerRow);
                scoreBoard.appendChild(thead);
            }

            // Create or clear the table body
            let tbody = scoreBoard.querySelector('tbody');
            if (!tbody) {
                tbody = document.createElement('tbody');
                scoreBoard.appendChild(tbody);
            } else {
                tbody.innerHTML = '';
            }

            // Add team data to the table
            teams.forEach(team => {
                const row = document.createElement('tr');

                const nameCell = document.createElement('td');
                nameCell.textContent = team.name;
                row.appendChild(nameCell);

                const scoreCell = document.createElement('td');
                scoreCell.textContent = team.score;
                row.appendChild(scoreCell);

                const statusCell = document.createElement('td');
                statusCell.textContent = team.status || ''; // Empty if status is null or undefined
                row.appendChild(statusCell);

                tbody.appendChild(row);
            });
        } else {
            console.error('Scoreboard element not found.');
        }
    }

    // Fetch and update scoreboard initially when the page loads
    fetchAndUpdateScoreBoard();
});
