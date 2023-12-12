function submitForm() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;

    var data = {
        name: name,
        email: email,
        message: message
    };

    // Make an AJAX request to your server
    fetch('/submit-form', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('Form submitted successfully');
        document.getElementById('contactForm').reset();
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Error submitting form');
    });

    // Prevent the default form submission
    return false;
}
