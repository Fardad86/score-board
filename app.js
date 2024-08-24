// Include the Supabase library via CDN
const script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/supabase.min.js';
script.onload = () => {
    const { createClient } = window['supabase'];

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
                // Authenticate with Supabase
                const { data, error } = await supabase.auth.signInWithPassword({
                    email,
                    password
                });

                if (error) {
                    throw error;
                }

                // Redirect to admin panel on successful login
                window.location.href = "admin.html";
            } catch (error) {
                console.error("Error logging in: ", error);
                alert("Failed to log in. Please check your credentials.");
            }
        });
    });
};
document.head.appendChild(script);
