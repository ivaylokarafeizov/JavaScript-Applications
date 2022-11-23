import { register } from '../api/users.js';
import { render, html } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';
import { updateNav } from '../utils/updateNav.js';
import { welcomeMessage } from '../utils/welcomeMessage.js';

let registerTemplate = (onSubmit) =>
  html`<section id="register-page" class="register">
    <form id="register-form" @submit="${onSubmit}">
      <fieldset>
        <legend>Register Form</legend>
        <p class="field">
          <label for="email">Email</label>
          <span class="input">
            <input type="text" name="email" id="email" placeholder="Email" />
          </span>
        </p>
        <p class="field">
          <label for="password">Password</label>
          <span class="input">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
            />
          </span>
        </p>
        <p class="field">
          <label for="repeat-pass">Repeat Password</label>
          <span class="input">
            <input
              type="password"
              name="confirm-pass"
              id="repeat-pass"
              placeholder="Repeat Password"
            />
          </span>
        </p>
        <input class="button submit" type="submit" value="Register" />
      </fieldset>
    </form>
  </section>`;

export function showRegister() {
  render(registerTemplate(onSubmit), document.querySelector('#site-content'));

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get('password');
    const repeatPassword = formData.get('confirm-pass');

    try {
      if (!email || !password || !repeatPassword) {
        throw new Error('All fields are required!');
      }

      if (password != repeatPassword) {
        throw new Error('Passwords do not match!');
      }

      await register(email, password);
      updateNav(email);
      page.redirect('/');
    } catch (error) {
      alert(error.message);
    }
  }
}
