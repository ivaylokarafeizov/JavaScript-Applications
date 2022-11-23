import { showDashboard } from './views/dashboard.js';
import { showLogin } from './views/login.js';
import { logout } from './api/users.js';
import { showRegister } from './views/register.js';
import { showMyBooks } from './views/myBooks.js';
import { showDetails } from './views/details.js';
import { showCreate } from './views/create.js';
import { showEdit } from './views/edit.js';
import { updateNav } from './utils/updateNav.js';
import page from '../node_modules/page/page.mjs';

page('/', showDashboard);
page('/login', showLogin);
page('/my-books', showMyBooks);
page('/create', showCreate);
page('/register', showRegister);
page('/details/:id', showDetails);
page('/edit/:id', showEdit);

page.start();

let logoutA = document.querySelector('#user > a:nth-child(4)');
logoutA.addEventListener('click', () => {
  logout();
  updateNav();
});

updateNav();
