import { register } from '../api/users.js';
import { render, html } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';
import { updateNav } from '../utils/updateNav.js';

let registerTemplate = (onSubmit) =>
  html`<section id="register">
    <div class="container">
      <form id="register-form" @submit="${onSubmit}">
        <h1>Register</h1>
        <p>Please fill in this form to create an account.</p>
        <hr />

        <p>Username</p>
        <input
          type="text"
          placeholder="Enter Username"
          name="username"
          required
        />

        <p>Password</p>
        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          required
        />

        <p>Repeat Password</p>
        <input
          type="password"
          placeholder="Repeat Password"
          name="repeatPass"
          required
        />
        <hr />

        <input type="submit" class="registerbtn" value="Register" />
      </form>
      <div class="signin">
        <p>Already have an account? <a href="/login">Sign in</a>.</p>
      </div>
    </div>
  </section>`;

export function showRegister() {
  render(registerTemplate(onSubmit), document.querySelector('#site-content'));

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const username = formData.get('username');
    const password = formData.get('password');
    const repeatPassword = formData.get('repeatPass');

    try {
      if (!username || !password || !repeatPassword) {
        throw new Error('All fields are required!');
      }

      if (password != repeatPassword) {
        throw new Error('Passwords do not match!');
      }

      await register(username, password);
      updateNav(username);
      page.redirect('/');
    } catch (error) {
      alert(error.message);
    }
  }
}
