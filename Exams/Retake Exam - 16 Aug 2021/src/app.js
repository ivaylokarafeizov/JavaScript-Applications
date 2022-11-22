import { showHome } from './views/home.js';
import { showLogin } from './views/login.js';
import { logout } from './api/users.js';
import { showRegister } from './views/register.js';
import { showCatalog } from './views/catalog.js';
import { showDetails } from './views/details.js';
import { showCreate } from './views/create.js';
import { showEdit } from './views/edit.js';
import { updateNav } from './utils/updateNav.js';
import page from '../node_modules/page/page.mjs';

page('/', showHome);
page('/login', showLogin);
page('/catalog', showCatalog);
page('/create', showCreate);
page('/register', showRegister);
page('/details/:id', showDetails);
page('/edit/:id', showEdit);

page.start();

let logoutA = document.querySelector('#user > a:nth-child(2)');
logoutA.addEventListener('click', () => {
  logout();
  updateNav();
});

updateNav();
