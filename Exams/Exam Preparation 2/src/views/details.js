import { deleteById, getById } from '../api/data.js';
import { render, html, nothing } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';

let detailsTemplate = (isOwner, car, onDelete) => html`<section
  id="listing-details"
>
  <h1>Details</h1>
  <div class="details-info">
    <img src="${car.imageUrl}" />
    <hr />
    <ul class="listing-props">
      <li><span>Brand:</span>${car.brand}</li>
      <li><span>Model:</span>${car.model}</li>
      <li><span>Year:</span>${car.year}</li>
      <li><span>Price:</span>${car.price}$</li>
    </ul>
    <p class="description-para">${car.description}</p>
    ${isOwner
      ? html`<div class="listings-buttons">
          <a href="/edit/${car._id}" class="button-list">Edit</a>
          <a href="javascript:void(0)" @click="${onDelete}" class="button-list"
            >Delete</a
          >
        </div>`
      : nothing}
  </div>
</section>`;

export async function showDetails(ctx) {
  let carId = ctx.params.id;
  let car = await getById(carId);

  let isOwner = false;

  if (sessionStorage.user) {
    isOwner = JSON.parse(sessionStorage.user)._id == car._ownerId;
  }

  render(
    detailsTemplate(isOwner, car, onDelete),
    document.querySelector('#site-content')
  );

  async function onDelete() {
    let choice = confirm('Are you sure you want to delete this car?');

    if (choice) {
      await deleteById(carId);
      page.redirect('/all-listings');
    }
  }
}
