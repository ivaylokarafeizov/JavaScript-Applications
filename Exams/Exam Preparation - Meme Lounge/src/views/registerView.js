import { render, html } from '../../node_modules/lit-html/lit-html.js';
import { updateNotification } from '../utils/updateNotification.js';
import { updateNav } from '../utils/updateNav.js';
import { welcomeMessage } from '../utils/welcomeMessage.js';
import page from '../../node_modules/page/page.mjs';

async function onSubmit(e) {
  e.preventDefault();
  let form = e.target;
  let formData = new FormData(form);
  let { username, email, password, repeatPass, gender } =
    Object.fromEntries(formData);

  if (!username || !email || !password || !repeatPass) {
    updateNotification('All fields are required!');
    return;
  }

  if (password != repeatPass) {
    updateNotification('Passwords do not match!');
    return;
  }

  try {
    let res = await fetch('http://localhost:3030/users/register', {
      method: 'POST',
      body: JSON.stringify({
        username,
        email,
        password,
        gender,
      }),
    });

    if (!res.ok) {
      updateNotification(await res.json());
      return;
    }

    let data = await res.json();

    localStorage.setItem('email', data.email);
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('userId', data._id);
    localStorage.setItem('gender', data.gender);
    localStorage.setItem('username', data.username);

    updateNav();
    welcomeMessage(email);
    page.redirect('/memes');

    return data;
  } catch (err) {
    updateNotification(err.message);
  }
}

let registerTemplate = html`<section id="register">
  <form id="register-form" @submit="${onSubmit}">
    <div class="container">
      <h1>Register</h1>
      <label for="username">Username</label>
      <input
        id="username"
        type="text"
        placeholder="Enter Username"
        name="username"
      />
      <label for="email">Email</label>
      <input id="email" type="text" placeholder="Enter Email" name="email" />
      <label for="password">Password</label>
      <input
        id="password"
        type="password"
        placeholder="Enter Password"
        name="password"
      />
      <label for="repeatPass">Repeat Password</label>
      <input
        id="repeatPass"
        type="password"
        placeholder="Repeat Password"
        name="repeatPass"
      />
      <div class="gender">
        <input type="radio" name="gender" id="female" value="female" />
        <label for="female">Female</label>
        <input type="radio" name="gender" id="male" value="male" checked />
        <label for="male">Male</label>
      </div>
      <input type="submit" class="registerbtn button" value="Register" />
      <div class="container signin">
        <p>Already have an account?<a href="/login">Sign in</a>.</p>
      </div>
    </div>
  </form>
</section>`;

export let registerView = (ctx) =>
  render(registerTemplate, document.querySelector('main'));
