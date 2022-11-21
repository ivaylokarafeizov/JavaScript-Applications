import { render, html } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';
import { updateNotification } from '../utils/updateNotification.js';
import { updateNav } from '../utils/updateNav.js';
import { welcomeMessage } from '../utils/welcomeMessage.js';

async function onSubmit(e) {
  e.preventDefault();
  let form = e.target;
  let formData = new FormData(form);
  let { email, password } = Object.fromEntries(formData);

  if (!email || !password) {
    updateNotification('All fields are required!');
    return;
  }

  try {
    let res = await fetch('http://localhost:3030/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      updateNotification(res.message);
      return;
    }

    let data = await res.json();

    localStorage.setItem('email', data.email);
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('userId', data._id);
    localStorage.setItem('gender', data.gender);
    localStorage.setItem('username', data.username);

    page.redirect('/memes');
    updateNav();
    welcomeMessage(email);

    return data;
  } catch (err) {
    updateNotification(err.message);
  }
}

let loginTemplate = html`<section id="login">
  <form id="login-form" @submit="${onSubmit}">
    <div class="container">
      <h1>Login</h1>
      <label for="email">Email</label>
      <input id="email" placeholder="Enter Email" name="email" type="text" />
      <label for="password">Password</label>
      <input
        id="password"
        type="password"
        placeholder="Enter Password"
        name="password"
      />
      <input type="submit" class="registerbtn button" value="Login" />
      <div class="container signin">
        <p>Dont have an account?<a href="/register">Sign up</a>.</p>
      </div>
    </div>
  </form>
</section>`;

export let loginView = (ctx) =>
  render(loginTemplate, document.querySelector('main'));
