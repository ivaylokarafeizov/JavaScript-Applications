import { deleteById, getById } from '../api/data.js';
import { render, html, nothing } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';

let detailsTemplate = (isOwner, shoes, onDelete) => html`<section id="details">
  <div id="details-wrapper">
    <p id="details-title">Shoe Details</p>
    <div id="img-wrapper">
      <img src="${shoes.imageUrl}" alt="example1" />
    </div>
    <div id="info-wrapper">
      <p>Brand: <span id="details-brand">${shoes.brand}</span></p>
      <p>Model: <span id="details-model">${shoes.model}</span></p>
      <p>Release date: <span id="details-release">${shoes.release}</span></p>
      <p>Designer: <span id="details-designer">${shoes.designer}</span></p>
      <p>Value: <span id="details-value">${shoes.value}</span></p>
    </div>
    ${isOwner
      ? html`<div id="action-buttons">
          <a href="/edit/${shoes._id}" id="edit-btn">Edit</a>
          <a href="javascript:void(0)" id="delete-btn" @click="${onDelete}"
            >Delete</a
          >
        </div>`
      : nothing}
  </div>
</section>`;

export async function showDetails(ctx) {
  let shoesId = ctx.params.id;
  let shoes = await getById(shoesId);

  let isOwner = false;

  if (sessionStorage.user) {
    isOwner = JSON.parse(sessionStorage.user)._id == shoes._ownerId;
  }

  render(
    detailsTemplate(isOwner, shoes, onDelete),
    document.querySelector('main')
  );

  async function onDelete() {
    let choice = confirm('Are you sure you want to delete this book?');

    if (choice) {
      await deleteById(shoesId);
      page.redirect('/dashboard');
    }
  }
}
