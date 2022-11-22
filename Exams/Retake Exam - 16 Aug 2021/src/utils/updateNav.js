import { showHome } from '../views/home.js';

export function updateNav() {
  if (sessionStorage.length == 0) {
    document.querySelector('#user').style.display = 'none';
    document.querySelector('#guest').style.display = 'block';
    showHome();
  } else {
    document.querySelector('#user').style.display = 'block';
    document.querySelector('#guest').style.display = 'none';
  }
}
