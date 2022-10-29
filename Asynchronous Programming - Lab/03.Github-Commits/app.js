async function loadCommits() {
  let username = document.querySelector('#username');
  let repo = document.querySelector('#repo');
  let commitsUl = document.querySelector('#commits');

  try {
    const response = await fetch(
      `https://api.github.com/repos/${username.value}/${repo.value}/commits`
    );

    if (response.ok == false) {
      throw new Error(`Error: ${response.status} (Not Found)`);
    }

    const data = await response.json();
    const items = data.map((item) => {
      let li = document.createElement('li');
      li.textContent = `${item.commit.author.name}: ${item.commit.message}`;
      return li;
    });

    commitsUl.replaceChildren(...items);
  } catch (error) {
    let li = document.querySelector('li');
    li.textContent = error.message;
    commitsUl.replaceChildren(li);
  }

  username.value = '';
  repo.value = '';
}
