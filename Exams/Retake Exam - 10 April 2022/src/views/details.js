import {
  deleteById,
  getById,
  getDonationsByPostId,
  getDonationsBySpecificUser,
  donate,
} from '../api/data.js';
import { render, html, nothing } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';

let detailsTemplate = (
  isOwner,
  post,
  donations,
  hasDonations,
  onDelete,
  onDonate
) => html`<section id="details-page">
  <h1 class="title">Post Details</h1>
  <div id="container">
    <div id="details">
      <div class="image-wrapper">
        <img src="${post.imageUrl}" alt="Material Image" class="post-image" />
      </div>
      <div class="info">
        <h2 class="title post-title">${post.title}</h2>
        <p class="post-description">Description: ${post.description}</p>
        <p class="post-address">Address: ${post.address}</p>
        <p class="post-number">Phone number: ${post.phone}</p>
        <p class="donate-Item">Donate Materials: ${donations}</p>
        <div class="btns">
          ${isOwner
            ? html`<a href="/edit/${post._id}" class="edit-btn btn">Edit</a>
                <a
                  @click="${onDelete}"
                  href="javascript:void(0)"
                  class="delete-btn btn"
                  >Delete</a
                >`
            : nothing}
          ${!isOwner && !hasDonations && sessionStorage.length
            ? html`<a @click="${onDonate}" href="#" class="donate-btn btn"
                >Donate</a
              >`
            : nothing}
        </div>
      </div>
    </div>
  </div>
</section>`;

export async function showDetails(ctx) {
  let postId = ctx.params.id;
  let [post, donations, hasDonations] = await Promise.all([
    getById(postId),
    getDonationsByPostId(postId),
    sessionStorage.length
      ? getDonationsBySpecificUser(postId, JSON.parse(sessionStorage.user)._id)
      : 0,
  ]);

  let isOwner = false;

  if (sessionStorage.user) {
    isOwner = JSON.parse(sessionStorage.user)._id == post._ownerId;
  }

  render(
    detailsTemplate(isOwner, post, donations, hasDonations, onDelete, onDonate),
    document.querySelector('#main-content')
  );

  async function onDelete() {
    let choice = confirm('Are you sure you want to delete this post?');

    if (choice) {
      await deleteById(postId);
      page.redirect('/');
    }
  }

  async function onDonate() {
    await donate({ postId });
    page.redirect('/details/' + postId);
  }
}
