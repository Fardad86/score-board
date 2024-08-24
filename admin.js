import { createClient } from 'https://cdn.skypack.dev/@supabase/supabase-js';

// تعریف URL و API Key
const supabaseUrl = 'https://pyecsyykgzeionihrhwi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5ZWNzeXlrZ3plaW9uaWhyaHdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ1MjIzNzMsImV4cCI6MjA0MDA5ODM3M30.oBNxX9Hl-89r_aCrzLJwbkdtdJB-e7rhOmhZd0q9RUc';
const supabase = createClient(supabaseUrl, supabaseKey);

document.addEventListener('DOMContentLoaded', () => {
    const createTeamForm = document.getElementById('create-team-form');
    const deleteTeamForm = document.getElementById('delete-team-form');
    const teamBoard = document.getElementById('team-board');

    // تابع برای بارگذاری تیم‌ها
    async function loadTeams() {
        teamBoard.innerHTML = '';

        try {
            const { data, error } = await supabase
                .from('teams')
                .select('*');

            if (error) throw error;

            teamBoard.innerHTML = `
                <table>
                    <thead>
                        <tr>
                            <th>Team Name</th>
                            <th>Score</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${data.map(team => `
                            <tr>
                                <td>${team.name}</td>
                                <td>${team.score}</td>
                                <td>${team.status}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
        } catch (error) {
            console.error("Error loading teams: ", error);
        }
    }

    // تابع برای ارسال فرم ایجاد/به‌روزرسانی تیم
    createTeamForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const name = document.getElementById('team-name').value;
        const score = parseInt(document.getElementById('team-score').value);
        const status = document.getElementById('team-status').value;

        try {
            const { data, error } = await supabase
                .from('teams')
                .upsert([{ name, score, status }]);

            if (error) throw error;
            loadTeams();
        } catch (error) {
            console.error("Error creating/updating team: ", error);
        }
    });

    // تابع برای ارسال فرم حذف تیم
    deleteTeamForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const name = document.getElementById('delete-team-name').value;

        try {
            const { data, error } = await supabase
                .from('teams')
                .delete()
                .eq('name', name);

            if (error) throw error;
            loadTeams();
        } catch (error) {
            console.error("Error deleting team: ", error);
        }
    });

    // بارگذاری اولیه تیم‌ها
    loadTeams();
});
