document.addEventListener('DOMContentLoaded', function() {
    // URL و کلید API برای Supabase
    const supabaseUrl = 'https://pyecsyykgzeionihrhwi.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5ZWNzeXlrZ3plaW9uaWhyaHdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ1MjIzNzMsImV4cCI6MjA0MDA5ODM3M30.oBNxX9Hl-89r_aCrzLJwbkdtdJB-e7rhOmhZd0q9RUc';

    // بارگذاری Supabase از CDN
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.0.2/dist/supabase.min.js';
    script.onload = function() {
        const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

        const refreshButton = document.getElementById('refresh-btn');
        const scoreBoardBody = document.querySelector('#score-board tbody');

        async function loadTeams() {
            try {
                const { data, error } = await supabase
                    .from('teams')
                    .select('*');

                if (error) {
                    console.error('Error loading teams:', error);
                } else {
                    console.log('Teams data:', data);  // Log the data received
                    updateScoreBoard(data);
                }
            } catch (err) {
                console.error('Error fetching teams:', err);
            }
        }

        function updateScoreBoard(teams) {
            console.log('Updating scoreboard with:', teams); // Log the data to be updated

            scoreBoardBody.innerHTML = ''; // Clear the existing rows

            if (!teams || teams.length === 0) {
                scoreBoardBody.innerHTML = '<tr><td colspan="3">No teams found</td></tr>';
                return;
            }

            teams.forEach(team => {
                const row = document.createElement('tr');

                const nameCell = document.createElement('td');
                nameCell.textContent = team.name || 'N/A';  // Default to 'N/A' if name is undefined
                row.appendChild(nameCell);

                const scoreCell = document.createElement('td');
                scoreCell.textContent = team.score != null ? team.score : 'N/A';  // Default to 'N/A' if score is null
                row.appendChild(scoreCell);

                const statusCell = document.createElement('td');
                statusCell.textContent = team.status || '-';  // Default to '-' if status is undefined
                row.appendChild(statusCell);

                scoreBoardBody.appendChild(row);
            });
        }

        // Set up event listener for the refresh button
        if (refreshButton) {
            refreshButton.addEventListener('click', loadTeams);
        }

        // Load teams initially
        loadTeams();
    };
    document.head.appendChild(script);
});
