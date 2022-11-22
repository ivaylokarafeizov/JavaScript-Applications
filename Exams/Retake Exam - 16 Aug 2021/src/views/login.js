import { login } from '../api/users.js';
import { render, html } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';
import { updateNav } from '../utils/updateNav.js';

let loginTemplate = (onSubmit) =>
  html`<section id="login-page" class="auth">
    <form id="login" @submit="${onSubmit}">
      <div class="container">
        <div class="brand-logo"></div>
        <h1>Login</h1>
        <label for="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Sokka@gmail.com"
        />

        <label for="login-pass">Password:</label>
        <input type="password" id="login-password" name="password" />
        <input type="submit" class="btn submit" value="Login" />
        <p class="field">
          <span
            >If you don't have profile click <a href="/register">here</a></span
          >
        </p>
      </div>
    </form>
  </section>`;

export function showLogin(ctx) {
  render(loginTemplate(onSubmit), document.querySelector('#main-content'));

  async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { email, password } = Object.fromEntries(formData);

    await login(email, password);

    updateNav();
    page.redirect('/');
  }
}
