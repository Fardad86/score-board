// mentor.js

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://pyecsyykgzeionihrhwi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5ZWNzeXlrZ3plaW9uaWhyaHdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ1MjIzNzMsImV4cCI6MjA0MDA5ODM3M30.oBNxX9Hl-89r_aCrzLJwbkdtdJB-e7rhOmhZd0q9RUc';
const supabase = createClient(supabaseUrl, supabaseKey);

document.addEventListener('DOMContentLoaded', () => {
    const updateScoreForm = document.getElementById('update-score-form');
    const updateTeamSelect = document.getElementById('update-team-select');
    const scoreBoard = document.getElementById('score-board');

    async function loadTeams() {
        const { data, error } = await supabase
            .from('teams')
            .select('*');

        if (error) {
            console.error('Error loading teams:', error);
        } else {
            populateTeamSelects(data);
            updateScoreBoard(data);
        }
    }

    function populateTeamSelects(teams) {
        updateTeamSelect.innerHTML = '';
        teams.forEach(team => {
            const option = document.createElement('option');
            option.value = team.id;
            option.textContent = team.name;
            updateTeamSelect.appendChild(option);
        });
    }

    function updateScoreBoard(teams) {
        if (scoreBoard) {
            scoreBoard.innerHTML = '';
            teams.sort((a, b) => b.score - a.score); // Sort teams by score in descending order
            teams.forEach(team => {
                const row = document.createElement('div');
                row.className = 'team';
                row.innerHTML = `
                    <strong>Team:</strong> ${team.name} <br>
                    <strong>Score:</strong> ${team.score} <br>
                    <strong>Status:</strong> ${team.status || ''}
                `;
                scoreBoard.appendChild(row);
            });
        } else {
            console.error('Scoreboard element not found.');
        }
    }

    updateScoreForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = updateTeamSelect.value;
        const score = parseInt(document.getElementById('update-team-score').value, 10);
        const status = document.getElementById('update-team-status').value;

        const { data: currentData, error: fetchError } = await supabase
            .from('teams')
            .select('score')
            .eq('id', id)
            .single();

        if (fetchError) {
            console.error('Error fetching current team score:', fetchError);
        } else {
            const newScore = (currentData ? currentData.score : 0) + score;

            const { error: updateError } = await supabase
                .from('teams')
                .update({ score: newScore, status })
                .eq('id', id);

            if (updateError) {
                console.error('Error updating team:', updateError);
            } else {
                loadTeams();
                updateScoreForm.reset();
            }
        }
    });

    loadTeams();
});
