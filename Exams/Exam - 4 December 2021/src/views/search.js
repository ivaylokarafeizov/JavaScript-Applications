import { render, html, nothing } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';
import { getSongsBySearch } from '../api/data.js';

const searchTemplate = (songs) => html`<section id="searchPage">
  <h1>Search by Name</h1>

  <div class="search">
    <input
      id="search-input"
      type="text"
      name="search"
      placeholder="Enter desired albums's name"
    />
    <button class="button-list" @click="${onSearch}">Search</button>
  </div>
  <h2>Results:</h2>
  ${songs.length
    ? songs.map(
        (s) => html`<div class="search-result">
          <div class="card-box">
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
          </div>
        </div>`
      )
    : html`<p class="no-result">No result.</p>`}
</section> `;

async function onSearch(e) {
  e.preventDefault();
  const search = document.querySelector('input[name="search"]');
  const query = search.value.trim();

  if (!query) {
    return;
  }

  page.redirect(`/search?query=${query}`);
}

export let showSearch = async (ctx) => {
  const name = ctx.querystring.split('=')[1];
  const songs = name == undefined ? [] : await getSongsBySearch(name);

  render(searchTemplate(songs), document.querySelector('#main-content'));
};
