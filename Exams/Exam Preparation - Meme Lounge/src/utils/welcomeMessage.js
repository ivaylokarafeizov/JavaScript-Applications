export function welcomeMessage(email) {
  let welcomeSpan = document.querySelector(
    'div.profile:nth-child(2) > span:nth-child(1)'
  );
  welcomeSpan.innerHTML = `Welcome, ${email}`;
}
