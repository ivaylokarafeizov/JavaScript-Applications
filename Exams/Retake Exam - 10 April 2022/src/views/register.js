import { register } from '../api/users.js';
import { render, html } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';
import { updateNav } from '../utils/updateNav.js';

let registerTemplate = (onSubmit) =>
  html`<section id="register-page" class="auth">
    <form id="register" @submit="${onSubmit}">
      <h1 class="title">Register</h1>
      <article class="input-group">
        <label for="register-email">Email: </label>
        <input type="email" id="register-email" name="email" />
      </article>
      <article class="input-group">
        <label for="register-password">Password: </label>
        <input type="password" id="register-password" name="password" />
      </article>
      <article class="input-group">
        <label for="repeat-password">Repeat Password: </label>
        <input type="password" id="repeat-password" name="repeatPassword" />
      </article>
      <input type="submit" class="btn submit-btn" value="Register" />
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
    const repeatPassword = formData.get('repeatPassword');

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
