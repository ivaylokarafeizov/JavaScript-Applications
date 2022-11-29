import { login } from '../api/users.js';
import { render, html } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';
import { updateNav } from '../utils/updateNav.js';

let loginTemplate = (onSubmit) =>
  html`<section id="loginPage">
    <form @submit="${onSubmit}">
      <fieldset>
        <legend>Login</legend>
        <label for="email" class="vhide">Email</label>
        <input
          id="email"
          class="email"
          name="email"
          type="text"
          placeholder="Email"
        />
        <label for="password" class="vhide">Password</label>
        <input
          id="password"
          class="password"
          name="password"
          type="password"
          placeholder="Password"
        />
        <button type="submit" class="login">Login</button>
        <p class="field">
          <span
            >If you don't have profile click <a href="/register">here</a></span
          >
        </p>
      </fieldset>
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
