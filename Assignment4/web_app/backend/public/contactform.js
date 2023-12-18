// contactform.js

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('logo-container');
  
    form.addEventListener('submit', function (event) {
      event.preventDefault();
  
      const formData = new FormData(form);
  
      fetch('/register', {
        method: 'POST',
        body: formData
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(data => {
        console.log(data); // You can handle the success response here
        // Optionally, redirect to another page or update the UI
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        // Handle the error
      });
    });
  });
  