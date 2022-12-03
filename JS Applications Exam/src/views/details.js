import {
  deleteById,
  getById,
  like,
  getLikesByAlbumId,
  getLikesFromSpecificUser,
} from '../api/data.js';
import { render, html, nothing } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';

let detailsTemplate = (
  isOwner,
  album,
  onDelete,
  likes,
  hasLikes,
  onLike
) => html`<section id="details">
  <div id="details-wrapper">
    <p id="details-title">Album Details</p>
    <div id="img-wrapper">
      <img src="${album.imageUrl}" alt="example1" />
    </div>
    <div id="info-wrapper">
      <p>
        <strong>Band:</strong><span id="details-singer">${album.singer}</span>
      </p>
      <p>
        <strong>Album name:</strong
        ><span id="details-album">${album.album}</span>
      </p>
      <p>
        <strong>Release date:</strong
        ><span id="details-release">${album.release}</span>
      </p>
      <p>
        <strong>Label:</strong><span id="details-label">${album.label}</span>
      </p>
      <p>
        <strong>Sales:</strong><span id="details-sales">${album.sales}</span>
      </p>
    </div>
    <div id="likes">Likes: <span id="likes-count">${likes}</span></div>
    <div id="action-buttons">
      ${!isOwner && !hasLikes && sessionStorage.length
        ? html`<a href="" @click="${onLike}" id="like-btn">Like</a>`
        : nothing}
      ${isOwner
        ? html`<a href="/edit/${album._id}" id="edit-btn">Edit</a>
            <a href="javascript:void(0)" @click="${onDelete}" id="delete-btn"
              >Delete</a
            >`
        : nothing}
    </div>
  </div>
</section>`;

export async function showDetails(ctx) {
  let albumId = ctx.params.id;
  let [album, likes, hasLikes] = await Promise.all([
    getById(albumId),
    getLikesByAlbumId(albumId),
    sessionStorage.length
      ? getLikesFromSpecificUser(albumId, JSON.parse(sessionStorage.user)._id)
      : 0,
  ]);

  let isOwner = false;

  if (sessionStorage.user) {
    isOwner = JSON.parse(sessionStorage.user)._id == album._ownerId;
  }

  render(
    detailsTemplate(isOwner, album, onDelete, likes, hasLikes, onLike),
    document.querySelector('main')
  );

  async function onDelete() {
    let choice = confirm('Are you sure you want to delete this album?');

    if (choice) {
      await deleteById(albumId);
      page.redirect('/dashboard');
    }
  }

  async function onLike() {
    await like(albumId);
    page.redirect('/details/' + albumId);
  }
}
