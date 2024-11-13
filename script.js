const pageForm = document.getElementById('pageForm');
const pageCountInput = document.getElementById('pageCount');
const contentInputs = document.getElementById('contentInputs');

// Generate title and content input fields based on page count
pageCountInput.addEventListener('input', function () {
  const pageCount = parseInt(pageCountInput.value, 10);
  contentInputs.innerHTML = ''; // Clear previous inputs

  for (let i = 1; i <= pageCount; i++) {
    // Title field
    const titleLabel = document.createElement('label');
    titleLabel.textContent = `Title for Page ${i}:`;
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.name = `title${i}`;
    titleInput.placeholder = `Enter title for Page ${i}`;
    contentInputs.appendChild(titleLabel);
    contentInputs.appendChild(titleInput);

    // Content field
    const contentLabel = document.createElement('label');
    contentLabel.textContent = `Content for Page ${i}:`;
    const contentTextarea = document.createElement('textarea');
    contentTextarea.name = `content${i}`;
    contentTextarea.placeholder = `Enter content for Page ${i}`;
    contentInputs.appendChild(contentLabel);
    contentInputs.appendChild(contentTextarea);
  }
});

// Handle form submission
pageForm.addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent form from reloading the page

  // Retrieve form values
  const pageCount = parseInt(pageCountInput.value, 10);
  const pageData = [];

  for (let i = 1; i <= pageCount; i++) {
    const title = document.querySelector(`input[name="title${i}"]`).value;
    const content = document.querySelector(`textarea[name="content${i}"]`).value;
    pageData.push({ title, content });
  }

  // Store values in session storage and redirect to metronome page
  sessionStorage.setItem('pageCount', pageCount);
  sessionStorage.setItem('pageData', JSON.stringify(pageData));
  window.location.href = 'metronome.html';
});
