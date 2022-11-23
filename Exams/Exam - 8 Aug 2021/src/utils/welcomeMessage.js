export function welcomeMessage(email) {
  let welcomeSpan = document.querySelector('#user > span:nth-child(1)');
  welcomeSpan.innerHTML = `Welcome, ${email}`;
}
