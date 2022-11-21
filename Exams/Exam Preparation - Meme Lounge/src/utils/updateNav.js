import { homeView } from '../views/homeView.js';

export function updateNav() {
  if (localStorage.length == 0) {
    document.querySelector('.user').style.display = 'none';
    document.querySelector('.guest').style.display = 'block';
    homeView();
  } else {
    document.querySelector('.user').style.display = 'block';
    document.querySelector('.guest').style.display = 'none';
  }
}
