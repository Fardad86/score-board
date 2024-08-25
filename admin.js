const supabaseUrl = 'https://pyecsyykgzeionihrhwi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5ZWNzeXlrZ3plaW9uaWhyaHdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ1MjIzNzMsImV4cCI6MjA0MDA5ODM3M30.oBNxX9Hl-89r_aCrzLJwbkdtdJB-e7rhOmhZd0q9RUc';
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// ساخت تیم جدید
document.getElementById('create-team-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const teamName = document.getElementById('team-name').value;

    try {
        const { data, error } = await supabase
            .from('teams')
            .insert([{ name: teamName, score: 0, status: '' }]);

        if (error) throw error;
        alert('Team created successfully');
        loadTeams(); // بارگذاری مجدد تیم‌ها پس از ایجاد تیم جدید
    } catch (error) {
        console.error('Error creating team:', error);
        alert('Failed to create team.');
    }
});

// بارگذاری تیم‌ها در منوی کشویی
async function loadTeams() {
    try {
        const { data, error } = await supabase
            .from('teams')
            .select('*');

        if (error) throw error;

        const updateTeamSelect = document.getElementById('update-team-name');
        const deleteTeamSelect = document.getElementById('delete-team-name');
        updateTeamSelect.innerHTML = '';
        deleteTeamSelect.innerHTML = '';

        data.forEach((team) => {
            const option = document.createElement('option');
            option.value = team.name;
            option.textContent = team.name;
            updateTeamSelect.appendChild(option);

            const deleteOption = document.createElement('option');
            deleteOption.value = team.name;
            deleteOption.textContent = team.name;
            deleteTeamSelect.appendChild(deleteOption);
        });
    } catch (error) {
        console.error('Error loading teams:', error);
        alert('Failed to load teams.');
    }
}

// آپدیت تیم
document.getElementById('update-team-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const teamName = document.getElementById('update-team-name').value;
    const score = parseInt(document.getElementById('team-score').value, 10);
    const status = document.getElementById('team-status').value;

    try {
        const { data, error } = await supabase
            .from('teams')
            .update({ score, status })
            .eq('name', teamName);

        if (error) throw error;
        alert('Team updated successfully');
        loadTeams();
    } catch (error) {
        console.error('Error updating team:', error);
        alert('Failed to update team.');
    }
});

// حذف تیم
document.getElementById('delete-team-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const teamName = document.getElementById('delete-team-name').value;

    try {
        const { data, error } = await supabase
            .from('teams')
            .delete()
            .eq('name', teamName);

        if (error) throw error;
        alert('Team deleted successfully');
        loadTeams();
    } catch (error) {
        console.error('Error deleting team:', error);
        alert('Failed to delete team.');
    }
});

// بارگذاری تیم‌ها هنگام بارگذاری صفحه
document.addEventListener('DOMContentLoaded', loadTeams);
