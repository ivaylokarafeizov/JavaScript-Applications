function loadRepos() {
  let username = document.querySelector('#username').value;

  fetch(`https://api.github.com/users/${username}/repos`)
    .then((response) => {
      if (response.ok == false) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => {
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
    })
    .catch((error) => {
      let reposUl = document.querySelector('#repos');
      reposUl.textContent = error.message;
    });
}
