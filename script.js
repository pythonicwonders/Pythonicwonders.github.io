function saveData() {
  const name = document.getElementById('name').value;
  const nickname = document.getElementById('nickname').value;

  const newData = `${name},${nickname}\n`;

  // GitHub Gist API to update the CSV file
  const gistId = '20d13560f02f7a41fe67e298e32d8ea460bb6c59';
  const apiUrl = `https://api.github.com/gists/${gistId}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const currentContent = data.files['Mygist2.csv'].content;
      const updatedContent = currentContent + newData;

      // Update the Gist with the new content
      return fetch(apiUrl, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          files: {
            'Mygist2.csv': {
              content: updatedContent,
            },
          },
        }),
      });
    })
    .then(() => alert('Data saved successfully!'))
    .catch(error => console.error('Error:', error));
}
