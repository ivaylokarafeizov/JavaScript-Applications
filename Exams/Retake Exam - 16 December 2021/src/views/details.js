import {
  deleteById,
  getById,
  getLikesByTheaterId,
  getLikesFromSpecificUser,
  like,
} from '../api/data.js';
import { render, html, nothing } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';

let detailsTemplate = (
  isOwner,
  event,
  onDelete,
  likes,
  hasLikes,
  onLike
) => html`<section id="detailsPage">
  <div id="detailsBox">
    <div class="detailsInfo">
      <h1>Title: ${event.title}</h1>
      <div>
        <img src="${event.imageUrl}" />
      </div>
    </div>
    <div class="details">
      <h3>Theater Description</h3>
      <p>${event.description}</p>
      <h4>Date: ${event.date}</h4>
      <h4>Author: ${event.author}</h4>
      <div class="buttons">
        ${isOwner
          ? html`<a
                class="btn-delete"
                @click="${onDelete}"
                href="javascript:void(0)"
                >Delete</a
              >
              <a class="btn-edit" href="/edit/${event._id}">Edit</a>`
          : nothing}
        ${!isOwner && !hasLikes && sessionStorage.length
          ? html`<a class="btn-like" @click="${onLike}" href="#">Like</a>`
          : nothing}
      </div>
      <p class="likes">Likes: ${likes}</p>
    </div>
  </div>
</section>`;

export async function showDetails(ctx) {
  let theaterId = ctx.params.id;
  let [event, likes, hasLikes] = await Promise.all([
    getById(theaterId),
    getLikesByTheaterId(theaterId),
    sessionStorage.length
      ? getLikesFromSpecificUser(theaterId, JSON.parse(sessionStorage.user)._id)
      : 0,
  ]);

  let isOwner = false;

  if (sessionStorage.user) {
    isOwner = JSON.parse(sessionStorage.user)._id == event._ownerId;
  }

  render(
    detailsTemplate(isOwner, event, onDelete, likes, hasLikes, onLike),
    document.querySelector('#content')
  );

  async function onDelete() {
    let choice = confirm('Are you sure you want to delete this event?');

    if (choice) {
      await deleteById(theaterId);
      page.redirect('/profile');
    }
  }

  async function onLike() {
    await like(theaterId);
    page.redirect('/details/' + theaterId);
  }
}
