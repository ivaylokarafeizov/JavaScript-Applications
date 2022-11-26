import { getMyCars } from '../api/data.js';
import { render, html } from '../../node_modules/lit-html/lit-html.js';

let myCarsTemplate = (cars) => html`<section id="my-listings">
  <h1>My car listings</h1>
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
      : html`<p class="no-cars">You haven't listed any cars yet.</p>`}
  </div>
</section>`;

export let showMyCars = async (ctx) => {
  let userId = JSON.parse(sessionStorage.user)._id;
  let cars = await getMyCars(userId);
  render(myCarsTemplate(cars), document.querySelector('#site-content'));
};
