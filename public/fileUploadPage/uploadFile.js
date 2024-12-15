const dragDropArea = document.getElementById('drag-drop-area');
const fileInput = document.getElementById('file-upload');

// Add drag & drop functionality
dragDropArea.addEventListener('dragover', (event) => {
  event.preventDefault();
  dragDropArea.classList.add('dragover');
});

dragDropArea.addEventListener('dragleave', () => {
  dragDropArea.classList.remove('dragover');
});

dragDropArea.addEventListener('drop', (event) => {
  event.preventDefault();
  dragDropArea.classList.remove('dragover');

  // Handle dropped files
  const files = event.dataTransfer.files;
  if (files.length) {
    fileInput.files = files; // Assign dropped files to the hidden input
  }
});

dragDropArea.addEventListener('click', () => {
  fileInput.click(); // Simulate a click on the hidden input
});
