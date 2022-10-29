function loadRepos() {
  let result = document.querySelector('#res');

  const request = new XMLHttpRequest();
  request.open('GET', 'https://api.github.com/users/testnakov/repos');
  request.onreadystatechange = () => {
    if (request.readyState == 4) {
      result.textContent = request.responseText;
    }
  };
  request.send();
}
