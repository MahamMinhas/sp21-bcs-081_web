$(document).ready(function () {
    $("#signup-form").validate({
        rules: {
            username: {
                required: true,
                minlength: 3,
            },
            email: {
                required: true,
                email: true,
            },
            password: {
                required: true,
                minlength: 6,
            },
        },
        messages: {
            username: {
                required: "Please enter your username",
                minlength: "Username must be at least 3 characters long",
            },
            email: {
                required: "Please enter your email",
                email: "Please enter a valid email address",
            },
            password: {
                required: "Please enter a password",
                minlength: "Password must be at least 6 characters long",
            },
        },
        submitHandler: function (form) {
            // Display a success message (you can replace this with your own logic)
            $("#message").html("<p>Form submitted successfully!</p>");
            // Prevent the form from actually submitting to the server
            return false;
        },
    });
});
