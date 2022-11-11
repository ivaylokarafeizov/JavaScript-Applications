function attachEvents() {
  let textarea = document.querySelector('#messages');

  document.querySelector('#submit').addEventListener('click', async () => {
    let author = document.querySelector('input[name="author"]');
    let content = document.querySelector('input[name="content"]');

    if (!author.value || !content.value) {
      return;
    }

    try {
      let response = await fetch('http://localhost:3030/jsonstore/messenger', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          author: author.value.trim(),
          content: content.value.trim(),
        }),
      });

      if (response.status != 200) {
        throw new Error('Error');
      }
    } catch (err) {
      alert('Error sending message');
    }

    author.value = '';
    content.value = '';
  });

  document.querySelector('#refresh').addEventListener('click', async () => {
    try {
      let response = await fetch('http://localhost:3030/jsonstore/messenger');

      if (response.status != 200) {
        throw new Error('Error');
      }

      let data = await response.json();

      let messageData = [];
      Object.values(data).forEach((message) => {
        messageData.push(`${message.author}: ${message.content}`);
      });

      textarea.value = messageData.join('\n');
    } catch (err) {
      alert('Error retrieving response from the server');
    }
  });
}

attachEvents();
