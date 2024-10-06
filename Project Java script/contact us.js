const sendBtn = document.getElementById('#send-btn');

sendBtn.addEventListener('click', (e) => {
  e.preventDefault();
  
  const name = document.getElementById('#name').value;
  const email = document.getElementById('#email').value;
  const message = document.getElementById('#message').value;
  
  // Send data to server using AJAX or fetch API
  // For demonstration purposes, we'll just log the data
  console.log('Form submitted:', {
    name,
    email,
    message
  });
  
  // Reset form fields
  form.reset();
});
