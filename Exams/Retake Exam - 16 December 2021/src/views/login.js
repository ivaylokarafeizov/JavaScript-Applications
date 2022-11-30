import { login } from '../api/users.js';
import { render, html } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';
import { updateNav } from '../utils/updateNav.js';

let loginTemplate = (onSubmit) =>
  html`<section id="loginaPage">
    <form class="loginForm" @submit="${onSubmit}">
      <h2>Login</h2>
      <div>
        <label for="email">Email:</label>
        <input
          id="email"
          name="email"
          type="text"
          placeholder="steven@abv.bg"
          value=""
        />
      </div>
      <div>
        <label for="password">Password:</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="********"
          value=""
        />
      </div>

      <button class="btn" type="submit">Login</button>

      <p class="field">
        <span
          >If you don't have profile click <a href="/register">here</a></span
        >
      </p>
    </form>
  </section>`;

export function showLogin(ctx) {
  render(loginTemplate(onSubmit), document.querySelector('#content'));

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
