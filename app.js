// Import Supabase functions
import { createClient } from 'https://cdn.skypack.dev/@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = 'https://pyecsyykgzeionihrhwi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5ZWNzeXlrZ3plaW9uaWhyaHdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ1MjIzNzMsImV4cCI6MjA0MDA5ODM3M30.oBNxX9Hl-89r_aCrzLJwbkdtdJB-e7rhOmhZd0q9RUc';
const supabase = createClient(supabaseUrl, supabaseKey);

// Handle login
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const email = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password
            });

            if (error) {
                console.error("Error logging in: ", error.message);
                document.getElementById('error-message').textContent = "Failed to log in. Please check your credentials.";
            } else {
                window.location.href = "admin.html"; // Redirect to admin panel
            }
        } catch (error) {
            console.error("Unexpected error: ", error);
            document.getElementById('error-message').textContent = "An unexpected error occurred.";
        }
    });
});
