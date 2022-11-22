import { register } from '../api/users.js';
import { render, html } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';
import { updateNav } from '../utils/updateNav.js';

let registerTemplate = (onSubmit) =>
  html`<section id="register-page" class="content auth">
    <form id="register" @submit="${onSubmit}">
      <div class="container">
        <div class="brand-logo"></div>
        <h1>Register</h1>

        <label for="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="maria@email.com"
        />

        <label for="pass">Password:</label>
        <input type="password" name="password" id="register-password" />

        <label for="con-pass">Confirm Password:</label>
        <input type="password" name="confirm-password" id="confirm-password" />

        <input class="btn submit" type="submit" value="Register" />

        <p class="field">
          <span
            >If you already have profile click <a href="/login">here</a></span
          >
        </p>
      </div>
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
    const repeatPassword = formData.get('confirm-password');

    try {
      if (!email || !password) {
        throw new Error('All fields are required!');
      }

      if (email.length < 3) {
        throw new Error('Email should be at least 3 characters long!');
      }

      if (password.length < 3) {
        throw new Error('Password should be at least 3 characters long!');
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
