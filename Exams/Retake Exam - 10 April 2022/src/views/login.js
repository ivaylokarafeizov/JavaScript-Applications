import { login } from '../api/users.js';
import { render, html } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';
import { updateNav } from '../utils/updateNav.js';

let loginTemplate = (onSubmit) =>
  html`<section id="login-page" class="auth">
    <form id="login" @submit="${onSubmit}">
      <h1 class="title">Login</h1>
      <article class="input-group">
        <label for="login-email">Email: </label>
        <input type="email" id="login-email" name="email" />
      </article>
      <article class="input-group">
        <label for="password">Password: </label>
        <input type="password" id="password" name="password" />
      </article>
      <input type="submit" class="btn submit-btn" value="Log In" />
    </form>
  </section>`;

export function showLogin(ctx) {
  render(loginTemplate(onSubmit), document.querySelector('#main-content'));

  async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { email, password } = Object.fromEntries(formData);

    if (!email || !password) {
      return alert('All fields are required!');
    }

    await login(email, password);
    updateNav();
    page.redirect('/');
  }
}
