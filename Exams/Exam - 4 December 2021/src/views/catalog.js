import { render, html, nothing } from '../../node_modules/lit-html/lit-html.js';
import { getAllSongs } from '../api/data.js';

let catalogTemplate = (songs) => html`<section id="catalogPage">
  <h1>All Albums</h1>
  ${songs.length
    ? songs.map(
        (s) => html`<div class="card-box">
          <img src="${s.imgUrl}" />
          <div>
            <div class="text-center">
              <p class="name">Name: ${s.name}</p>
              <p class="artist">Artist: ${s.artist}</p>
              <p class="genre">Genre: ${s.genre}</p>
              <p class="price">Price: $${s.price}</p>
              <p class="date">Release Date: ${s.releaseDate}</p>
            </div>
            ${sessionStorage.length
              ? html`<div class="btn-group">
                  <a href="/details/${s._id}" id="details">Details</a>
                </div>`
              : nothing}
          </div>
        </div>`
      )
    : html`<p>No Albums in Catalog!</p>`}
</section>`;

export let showCatalog = async (ctx) => {
  let songs = await getAllSongs();
  render(catalogTemplate(songs), document.querySelector('#main-content'));
};
