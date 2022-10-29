async function loadRepos() {
  let username = document.querySelector('#username').value;

  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos`
    );

    if (response.ok == false) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    let reposUl = document.querySelector('#repos');
    const items = data.map((repo) => {
      let li = document.createElement('li');
      let a = document.createElement('a');
      a.href = repo.html_url;
      a.textContent = repo.full_name;
      li.appendChild(a);

      return li;
    });

    reposUl.replaceChildren(...items);
  } catch (error) {
    let reposUl = document.querySelector('#repos');
    reposUl.textContent = error.message;
  }
}
