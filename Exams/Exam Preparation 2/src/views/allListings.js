import { render, html } from '../../node_modules/lit-html/lit-html.js';
import { getAllCars } from '../api/data.js';

let allListingsTemplate = (cars) => html`<section id="car-listings">
  <h1>Car Listings</h1>
  <div class="listings">
    ${cars.length
      ? cars.map(
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
        )
      : html`<p class="no-cars">No cars in database.</p>`}
  </div>
</section>`;

export let showAllListings = async (ctx) => {
  let cars = await getAllCars();
  render(allListingsTemplate(cars), document.querySelector('#site-content'));
};
