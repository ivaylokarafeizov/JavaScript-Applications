import { render, html } from '../../node_modules/lit-html/lit-html.js';
import { getAllPets } from '../api/data.js';

let dashboardTemplate = (pets) => html`<section id="dashboard">
  <h2 class="dashboard-title">Services for every animal</h2>
  <div class="animals-dashboard">
    ${pets.length
      ? pets.map(
          (p) => html`<div class="animals-board">
            <article class="service-img">
              <img class="animal-image-cover" src="${p.image}" />
            </article>
            <h2 class="name">${p.name}</h2>
            <h3 class="breed">${p.breed}</h3>
            <div class="action">
              <a class="btn" href="/details/${p._id}">Details</a>
            </div>
          </div>`
        )
      : html`<div>
          <p class="no-pets">No pets in dashboard</p>
        </div>`}
  </div>
</section>`;

export let showDashboard = async (ctx) => {
  let pets = await getAllPets();
  render(dashboardTemplate(pets), document.querySelector('#content'));
};
