// import { showDashboard } from './views/dashboard.js';
import { showLogin } from './views/login.js';
import { logout } from './api/users.js';
import { showRegister } from './views/register.js';
import { showHome } from './views/home.js';
import { showAllListings } from './views/allListings.js';
import { showMyCars } from './views/myCars.js';
import { showDetails } from './views/details.js';
import { showByYear } from './views/byYearSearch.js';
import { showCreate } from './views/create.js';
import { showEdit } from './views/edit.js';
import { updateNav } from './utils/updateNav.js';
import page from '../node_modules/page/page.mjs';

page('/', showHome);
page('/login', showLogin);
page('/all-listings', showAllListings);
page('/by-year', showByYear);
page('/my-cars', showMyCars);
page('/create', showCreate);
page('/register', showRegister);
page('/details/:id', showDetails);
page('/edit/:id', showEdit);

page.start();

let logoutA = document.querySelector('#profile > a:nth-child(4)');
logoutA.addEventListener('click', () => {
  logout();
  updateNav();
});

updateNav();
