import { render, html, nothing } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';
import { getShoesBySearch } from '../api/data.js';

const searchTemplate = (shoes) => html` <section id="search">
  <h2>Search by Brand</h2>

  <form class="search-wrapper cf" @submit=${onSearch}>
    <input
      id="#search-input"
      type="text"
      name="search"
      placeholder="Search here..."
      required
    />
    <button type="submit">Search</button>
  </form>

  <h3>Results:</h3>

  <div id="search-container">
    <ul class="card-wrapper">
      ${shoes.length
        ? shoes.map(
            (s) => html`<li class="card">
              <img src="${s.imageUrl}" alt="travis" />
              <p>
                <strong>Brand: </strong><span class="brand">${s.brand}</span>
              </p>
              <p>
                <strong>Model: </strong><span class="model">${s.model}</span>
              </p>
              <p>
                <strong>Value:</strong><span class="value">${s.value}</span>$
              </p>

              ${sessionStorage.length
                ? html`<a class="details-btn" href="/details/${s._id}"
                    >Details</a
                  >`
                : nothing}
            </li>`
          )
        : html`<h2>There are no results found.</h2>`}
    </ul>
  </div>
</section>`;

async function onSearch(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const query = formData.get('search').trim();

  page.redirect(`/search?query=${query}`);
}

export let showSearch = async (ctx) => {
  const brand = ctx.querystring.split('=')[1];
  const shoes = brand == undefined ? [] : await getShoesBySearch(brand);

  render(searchTemplate(shoes), document.querySelector('main'));
};
