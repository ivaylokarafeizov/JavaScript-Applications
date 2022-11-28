import { showDashboard } from './views/dashboard.js';
import { showLogin } from './views/login.js';
import { logout } from './api/users.js';
import { showRegister } from './views/register.js';
import { showHome } from './views/home.js';
import { showDetails } from './views/details.js';
import { showCreate } from './views/create.js';
import { showEdit } from './views/edit.js';
import { updateNav } from './utils/updateNav.js';
import page from '../node_modules/page/page.mjs';

page('/', showHome);
page('/login', showLogin);
page('/dashboard', showDashboard);
page('/create', showCreate);
page('/register', showRegister);
page('/details/:id', showDetails);
page('/edit/:id', showEdit);

page.start();

let logoutA = document.querySelector(
  'nav:nth-child(1) > ul:nth-child(2) > li:nth-child(6) > a:nth-child(1)'
);
logoutA.addEventListener('click', () => {
  logout();
  updateNav();
});

updateNav();
