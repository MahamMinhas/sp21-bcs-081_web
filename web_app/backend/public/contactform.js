function submitForm() {
    // Get the form data
    var firstName = document.getElementById('first-name').value;
    var lastName = document.getElementById('last-name').value;
    var email = document.getElementById('email').value;
    var contactNumber = document.getElementById('contact-number').value;
    var areaCode = document.getElementById('area-code').value;
    var preferredPhysio = document.getElementById('preferred-physio').value;
    var preferredTime = document.getElementById('preferred-time').value;
    var day = document.getElementById('day').value;
    var service = document.getElementById('service').value;
    var message = document.getElementById('message').value;

    // Display submitted data
    alert('Form submitted successfully');

    // Optionally, you can send the data to a server using AJAX

    // Clear the form
    document.getElementById('contactForm').reset();

    return false;
}