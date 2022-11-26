export function welcomeMessage(username) {
  let welcomeA = document.querySelector('#profile > a:nth-child(1)');
  welcomeA.innerHTML = `Welcome ${username}`;
}
