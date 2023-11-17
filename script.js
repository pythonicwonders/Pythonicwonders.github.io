function saveData() {
  const name = document.getElementById('name').value;
  const nickname = document.getElementById('nickname').value;

  const newData = `${name},${nickname}\n`;

  // GitHub Gist API to update the CSV file
  const gistId = '0c8105ba21f3a578a19305cb37d4d3b3;
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
