import {
  deleteById,
  getById,
  apply,
  getApplicationsByOfferId,
  getApplicationsBySpecificUser,
} from '../api/data.js';
import { render, html, nothing } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';

let detailsTemplate = (
  isOwner,
  offer,
  onDelete,
  applications,
  hasApplications,
  onApply
) => html`<section id="details">
  <div id="details-wrapper">
    <img id="details-img" src="${offer.imageUrl}" alt="example1" />
    <p id="details-title">${offer.title}</p>
    <p id="details-category">
      Category: <span id="categories">${offer.category}</span>
    </p>
    <p id="details-salary">
      Salary: <span id="salary-number">${offer.salary}</span>
    </p>
    <div id="info-wrapper">
      <div id="details-description">
        <h4>Description</h4>
        <span>${offer.description}</span>
      </div>
      <div id="details-requirements">
        <h4>Requirements</h4>
        <span>${offer.requirements}</span>
      </div>
    </div>
    <p>Applications: <strong id="applications">${applications}</strong></p>
    <div id="action-buttons">
      ${isOwner
        ? html`<a href="/edit/${offer._id}" id="edit-btn">Edit</a>
            <a @click="${onDelete}" href="javascript:void(0)" id="delete-btn"
              >Delete</a
            >`
        : nothing}
      ${!isOwner && sessionStorage.length && !hasApplications
        ? html`<a @click="${onApply}" href="" id="apply-btn">Apply</a>`
        : nothing}
    </div>
  </div>
</section>`;

export async function showDetails(ctx) {
  let offerId = ctx.params.id;
  let [offer, applications, hasApplications] = await Promise.all([
    getById(offerId),
    getApplicationsByOfferId(offerId),
    sessionStorage.length
      ? getApplicationsBySpecificUser(
          offerId,
          JSON.parse(sessionStorage.user)._id
        )
      : 0,
  ]);

  let isOwner = false;

  if (sessionStorage.user) {
    isOwner = JSON.parse(sessionStorage.user)._id == offer._ownerId;
  }

  render(
    detailsTemplate(
      isOwner,
      offer,
      onDelete,
      applications,
      hasApplications,
      onApply
    ),
    document.querySelector('main')
  );

  async function onDelete() {
    let choice = confirm('Are you sure you want to delete this offer?');

    if (choice) {
      await deleteById(offerId);
      page.redirect('/dashboard');
    }
  }

  async function onApply() {
    await apply({ offerId });
    page.redirect('/details/' + offerId);
  }
}
