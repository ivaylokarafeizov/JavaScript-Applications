import { render, html } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';
import { getCarsBySearch } from '../api/data.js';

const byYearSearchTemplate = (cars) => html`<section id="search-cars">
  <h1>Filter by year</h1> 
  <div class="container">
    <input
      id="search-input"
      type="text"
      name="search"
      placeholder="Enter desired production year"
    />
    <button class="button-list" @click="${onSearch}">Search</button>
  </div>
  ${
    cars.length
      ? html`<h2>Results:</h2>
          <div class="listings">
            ${cars.map(
              (c) => html`<div class="listing">
                <div class="preview">
                  <img src="${c.imageUrl}" />
                </div>
                <h2>${c.brand} ${c.model}</h2>
                <div class="info">
                  <div class="data-info">
                    <h3>Year: ${c.year}</h3>
                    <h3>Price: ${c.price} $</h3>
                  </div>
                  <div class="data-buttons">
                    <a href="/details/${c._id}" class="button-carDetails"
                      >Details</a
                    >
                  </div>
                </div>
              </div>`
            )}
          </div>`
      : html`<p class="no-cars">No results.</p>`
  } 
  </div>
</section>`;

async function onSearch(e) {
  e.preventDefault();
  let search = document.querySelector('input[name="search"]');
  const query = search.value.trim();

  page.redirect(`/by-year?query=${query}`);
}

export let showByYear = async (ctx) => {
  const year = ctx.querystring.split('=')[1];
  const cars = year == undefined ? [] : await getCarsBySearch(year);

  render(byYearSearchTemplate(cars), document.querySelector('#site-content'));
};
