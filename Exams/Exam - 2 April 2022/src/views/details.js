import {
  deleteById,
  getById,
  donate,
  getDonationsByPetId,
  getDonationsFromSpecificUser,
} from '../api/data.js';
import { render, html, nothing } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';

let detailsTemplate = (
  isOwner,
  pet,
  onDelete,
  onDonate,
  donations,
  hasDonations
) => html`<section id="detailsPage">
  <div class="details">
    <div class="animalPic">
      <img src="${pet.image}" />
    </div>
    <div>
      <div class="animalInfo">
        <h1>Name: ${pet.name}</h1>
        <h3>Breed: ${pet.breed}</h3>
        <h4>Age: ${pet.age}</h4>
        <h4>Weight: ${pet.weight}</h4>
        <h4 class="donation">Donation: ${donations * 100}$</h4>
      </div>
      ${sessionStorage.length
        ? html`<div class="actionBtn">
            ${isOwner
              ? html`<a href="/edit/${pet._id}" class="edit">Edit</a>
                  <a
                    @click="${onDelete}"
                    href="javascript:void(0)"
                    class="remove"
                    >Delete</a
                  >`
              : nothing}
            ${!isOwner && !hasDonations && sessionStorage.length
              ? html`<a @click="${onDonate}" href="#" class="donate">Donate</a>`
              : nothing}
          </div>`
        : nothing}
    </div>
  </div>
</section> `;

export async function showDetails(ctx) {
  let petId = ctx.params.id;
  let [pet, donations, hasDonations] = await Promise.all([
    getById(petId),
    getDonationsByPetId(petId),
    sessionStorage.length
      ? getDonationsFromSpecificUser(petId, JSON.parse(sessionStorage.user)._id)
      : 0,
  ]);

  let isOwner = false;

  if (sessionStorage.user) {
    isOwner = JSON.parse(sessionStorage.user)._id == pet._ownerId;
  }

  render(
    detailsTemplate(isOwner, pet, onDelete, onDonate, donations, hasDonations),
    document.querySelector('#content')
  );

  async function onDelete() {
    let choice = confirm('Are you sure you want to delete this pet?');

    if (choice) {
      await deleteById(petId);
      page.redirect('/');
    }
  }

  async function onDonate() {
    await donate({ petId });
    page.redirect('/details/' + petId);
  }
}
