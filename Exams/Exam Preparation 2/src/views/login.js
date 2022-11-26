import { login } from '../api/users.js';
import { render, html } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';
import { updateNav } from '../utils/updateNav.js';

let loginTemplate = (onSubmit) =>
  html`<section id="login">
    <div class="container">
      <form id="login-form" @submit="${onSubmit}">
        <h1>Login</h1>
        <p>Please enter your credentials.</p>
        <hr />

        <p>Username</p>
        <input placeholder="Enter Username" name="username" type="text" />

        <p>Password</p>
        <input type="password" placeholder="Enter Password" name="password" />
        <input type="submit" class="registerbtn" value="Login" />
      </form>
      <div class="signin">
        <p>Dont have an account? <a href="/register">Sign up</a>.</p>
      </div>
    </div>
  </section>`;

export function showLogin(ctx) {
  render(loginTemplate(onSubmit), document.querySelector('#site-content'));

  async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { username, password } = Object.fromEntries(formData);

    if (!username || !password) {
      return alert('All fields are required!');
    }

    await login(username, password);
    updateNav(username);
    page.redirect('/');
  }
}
