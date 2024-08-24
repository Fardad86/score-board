import { createClient } from 'https://cdn.skypack.dev/@supabase/supabase-js';

// تعریف URL و API Key
const supabaseUrl = 'https://pyecsyykgzeionihrhwi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5ZWNzeXlrZ3plaW9uaWhyaHdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ1MjIzNzMsImV4cCI6MjA0MDA5ODM3M30.oBNxX9Hl-89r_aCrzLJwbkdtdJB-e7rhOmhZd0q9RUc';
const supabase = createClient(supabaseUrl, supabaseKey);

document.addEventListener('DOMContentLoaded', () => {
    const scoreBoard = document.getElementById('score-board');
    const refreshBtn = document.getElementById('refresh-btn');

    // تابع برای به‌روزرسانی اسکوربورد
    async function updateScoreBoard() {
        scoreBoard.innerHTML = '';

        try {
            const { data, error } = await supabase
                .from('teams')
                .select('*');

            if (error) throw error;

            // نمایش داده‌ها در جدول
            scoreBoard.innerHTML = `
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

    // بارگذاری اولیه داده‌ها
    updateScoreBoard();

    // اضافه کردن عملکرد به دکمه رفرش
    refreshBtn.addEventListener('click', () => {
        updateScoreBoard();
    });
});
