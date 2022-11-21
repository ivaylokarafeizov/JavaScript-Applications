import { render, html } from '../../node_modules/lit-html/lit-html.js';

async function getUserMemes(userId) {
  try {
    let res = await fetch(
      `http://localhost:3030/data/memes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
      { method: 'GET', headers: { 'Content-Type': 'application/json' } }
    );

    let data = await res.json();
    return data;
  } catch (err) {
    alert(err.message);
  }
}

let profileTemplate = (username, email, gender, memes) => html`<section
  id="user-profile-page"
  class="user-profile"
>
  <article class="user-info">
    <img id="user-avatar-url" alt="user-profile" src="/images/${gender}.png" />
    <div class="user-content">
      <p>Username: ${username}</p>
      <p>Email: ${email}</p>
      <p>My memes count: ${memes.length}</p>
    </div>
  </article>
  <h1 id="user-listings-title">User Memes</h1>
  <div class="user-meme-listings">
    ${memes != undefined && memes.length != 0
      ? memes.map(
          (m) => html`<div class="user-meme">
            <p class="user-meme-title">${m.title}</p>
            <img class="userProfileImage" alt="meme-img" src="${m.imageUrl}" />
            <a class="button" href="/memes/${m._id}">Details</a>
          </div>`
        )
      : html`<p class="no-memes">No memes in database.</p>`}
  </div>
</section>`;

export async function profileView(ctx) {
  let userId = localStorage.getItem('userId');
  let email = localStorage.getItem('email');
  let gender = localStorage.getItem('gender');
  let username = localStorage.getItem('username');

  let memes = await getUserMemes(userId);

  render(
    profileTemplate(username, email, gender, memes),
    document.querySelector('main')
  );
}
