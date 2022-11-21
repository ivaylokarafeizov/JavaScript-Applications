import page from '../node_modules/page/page.mjs';
import { updateNav } from './utils/updateNav.js';
import { updateNotification } from './utils/updateNotification.js';
import { registerView } from './views/registerView.js';
import { loginView } from './views/loginView.js';
import { allMemesView } from './views/allMemesView.js';
import { homeView } from './views/homeView.js';
import { createView } from './views/createView.js';
import { editView } from './views/editView.js';
import { detailsView } from './views/detailsView.js';
import { profileView } from './views/profileView.js';

page('/register', registerView);
page('/login', loginView);
page('/', homeView);
page('/memes', allMemesView);
page('/memes/:id', detailsView);
page('/edit/:id', editView);
page('/create', createView);
page('/profile', profileView);

page.start();

let logoutA = document.querySelector(
  'div.profile:nth-child(2) > a:nth-child(3)'
);

logoutA.addEventListener('click', () => {
  fetch('http://localhost:3030/users/logout', {
    method: 'GET',
    headers: { 'X-Authorization': localStorage.accessToken },
  })
    .then((res) => {
      if (res.status == 204) {
        localStorage.clear();
        page.redirect('/');
        updateNav();

        return res;
      } else {
        return res.json();
      }
    })
    .catch((err) => updateNotification(err.message));
});

updateNav();
