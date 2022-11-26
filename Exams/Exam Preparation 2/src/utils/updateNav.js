import { welcomeMessage } from '../utils/welcomeMessage.js';

export function updateNav() {
  if (sessionStorage.length == 0) {
    document.querySelector('#profile').style.display = 'none';
    document.querySelector('#guest').style.display = 'block';
  } else {
    document.querySelector('#profile').style.display = 'block';
    document.querySelector('#guest').style.display = 'none';
    welcomeMessage(JSON.parse(sessionStorage.user).username);
  }
}
