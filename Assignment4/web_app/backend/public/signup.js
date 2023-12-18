const signupForm = document.getElementById('signupForm');

signupForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData(signupForm);

    try {
        const response = await fetch('/register', {  // Change the URL to '/register'
            method: 'POST',
            body: formData,
        });

        if (response.status === 404) {
            // User not found, redirect to /signup
            window.location = '/signup';
        } else if (response.status === 200) {
            // Login successful, redirect to '/'
            window.location = '/';
        } else {
            // Handle other cases as needed
            console.error('Unexpected response:', response);
        }
    } catch (error) {
        console.error('Error during signup:', error);
        // Handle errors
    }
});
