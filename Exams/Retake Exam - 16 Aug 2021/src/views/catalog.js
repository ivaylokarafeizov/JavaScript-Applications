import { getAllGames } from '../api/data.js';
import { render, html } from '../../node_modules/lit-html/lit-html.js';

let catalogTemplate = (games) => html`<section id="catalog-page">
  <h1>All Games</h1>
  ${games.length
    ? games.map(
        (g) => html`<div class="allGames">
          <div class="allGames-info">
            <img src="${g.imageUrl}" />
            <h6>${g.category}</h6>
            <h2>${g.title}</h2>
            <a href="/details/${g._id}" class="details-button">Details</a>
          </div>
        </div>`
      )
    : html`<h3 class="no-articles">No articles yet</h3>`}
</section>`;

export let showCatalog = async (ctx) => {
  let games = await getAllGames();
  render(catalogTemplate(games), document.querySelector('#main-content'));
};
