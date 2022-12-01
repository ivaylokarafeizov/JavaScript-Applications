import { register } from '../api/users.js';
import { render, html } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';
import { updateNav } from '../utils/updateNav.js';

let registerTemplate = (onSubmit) =>
  html`<section id="register">
    <div class="form">
      <h2>Register</h2>
      <form class="login-form" @submit="${onSubmit}">
        <input
          type="text"
          name="email"
          id="register-email"
          placeholder="email"
        />
        <input
          type="password"
          name="password"
          id="register-password"
          placeholder="password"
        />
        <input
          type="password"
          name="re-password"
          id="repeat-password"
          placeholder="repeat password"
        />
        <button type="submit">register</button>
        <p class="message">Already registered? <a href="/login">Login</a></p>
      </form>
    </div>
  </section>`;

export function showRegister() {
  render(registerTemplate(onSubmit), document.querySelector('main'));

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get('password');
    const repeatPassword = formData.get('re-password');

    try {
      if (!email || !password || !repeatPassword) {
        throw new Error('All fields are required!');
      }

      if (password != repeatPassword) {
        throw new Error('Passwords do not match!');
      }

      await register(email, password);
      updateNav();
      page.redirect('/dashboard');
    } catch (error) {
      alert(error.message);
    }
  }
}
