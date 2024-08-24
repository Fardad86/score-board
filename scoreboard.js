// Supabase configuration
const supabaseUrl = 'https://pyecsyykgzeionihrhwi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5ZWNzeXlrZ3plaW9uaWhyaHdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ1MjIzNzMsImV4cCI6MjA0MDA5ODM3M30.oBNxX9Hl-89r_aCrzLJwbkdtdJB-e7rhOmhZd0q9RUc';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

document.addEventListener('DOMContentLoaded', () => {
    const refreshBtn = document.getElementById('refresh-btn');
    const scoreBoard = document.getElementById('score-board');

    async function loadScores() {
        scoreBoard.innerHTML = '';

        const { data: teams, error } = await supabase
            .from('teams')
            .select('*');

        if (error) {
            console.error('Error loading scores:', error);
            return;
        }

        teams.forEach(team => {
            scoreBoard.innerHTML += `
                <div class="team">
                    <h4>${team.name}</h4>
                    <p>Score: ${team.score}</p>
                    <p>Status: ${team.status}</p>
                </div>
            `;
        });
    }

    refreshBtn.addEventListener('click', loadScores);

    loadScores();
});
