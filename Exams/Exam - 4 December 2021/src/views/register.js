import { register } from '../api/users.js';
import { render, html } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';
import { updateNav } from '../utils/updateNav.js';

let registerTemplate = (onSubmit) =>
  html`<section id="registerPage">
    <form @submit="${onSubmit}">
      <fieldset>
        <legend>Register</legend>
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
        <label for="conf-pass" class="vhide">Confirm Password:</label>
        <input
          id="conf-pass"
          class="conf-pass"
          name="conf-pass"
          type="password"
          placeholder="Confirm Password"
        />
        <button type="submit" class="register">Register</button>
        <p class="field">
          <span
            >If you already have profile click <a href="/login">here</a></span
          >
        </p>
      </fieldset>
    </form>
  </section>`;

export function showRegister() {
  render(registerTemplate(onSubmit), document.querySelector('#main-content'));

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get('password');
    const repeatPassword = formData.get('conf-pass');

    try {
      if (!email || !password || !repeatPassword) {
        throw new Error('All fields are required!');
      }

      if (password != repeatPassword) {
        throw new Error('Passwords do not match!');
      }

      await register(email, password);
      updateNav();
      page.redirect('/');
    } catch (error) {
      alert(error.message);
    }
  }
}
