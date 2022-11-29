import { deleteById, getById } from '../api/data.js';
import { render, html, nothing } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';

let detailsTemplate = (isOwner, song, onDelete) => html`<section
  id="detailsPage"
>
  <div class="wrapper">
    <div class="albumCover">
      <img src="${song.imgUrl}" />
    </div>
    <div class="albumInfo">
      <div class="albumText">
        <h1>Name: ${song.name}</h1>
        <h3>Artist: ${song.artist}</h3>
        <h4>Genre: ${song.genre}</h4>
        <h4>Price: $${song.price}</h4>
        <h4>Date: ${song.releaseDate}</h4>
        <p>Description: ${song.description}</p>
      </div>
      ${isOwner
        ? html`<div class="actionBtn">
            <a href="/edit/${song._id}" class="edit">Edit</a>
            <a @click="${onDelete}" href="javascript:void(0)" class="remove"
              >Delete</a
            >
          </div>`
        : nothing}
    </div>
  </div>
</section>`;

export async function showDetails(ctx) {
  let songId = ctx.params.id;
  let song = await getById(songId);

  let isOwner = false;

  if (sessionStorage.user) {
    isOwner = JSON.parse(sessionStorage.user)._id == song._ownerId;
  }

  render(
    detailsTemplate(isOwner, song, onDelete),
    document.querySelector('#main-content')
  );

  async function onDelete() {
    let choice = confirm('Are you sure you want to delete this book?');

    if (choice) {
      await deleteById(songId);
      page.redirect('/catalog');
    }
  }
}
