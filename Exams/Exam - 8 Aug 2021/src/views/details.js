import {
  deleteById,
  getById,
  getLikesByBookId,
  getLikesFromSpecificUser,
  likeBook,
} from '../api/data.js';
import { render, html, nothing } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';

let detailsTemplate = (
  isOwner,
  book,
  onDelete,
  onLike,
  likes,
  hasLikes
) => html`<section id="details-page" class="details">
  <div class="book-information">
    <h3>${book.title}</h3>
    <p class="type">${book.type}</p>
    <p class="img"><img src="${book.imageUrl}" /></p>
    <div class="actions">
      ${isOwner
        ? html`<a class="button" href="/edit/${book._id}">Edit</a>
            <a class="button" @click="${onDelete}" href="javascript:void(0)"
              >Delete</a
            >`
        : nothing}
      ${!hasLikes && sessionStorage.length
        ? html`<a class="button" @click="${onLike}" href="javascript:void(0)"
            >Like</a
          >`
        : nothing}
      <div class="likes">
        <img class="hearts" src="/images/heart.png" />
        <span id="total-likes">Likes: ${likes}</span>
      </div>
    </div>
  </div>
  <div class="book-description">
    <h3>Description:</h3>
    <p>${book.description}</p>
  </div>
</section>`;

export async function showDetails(ctx) {
  let bookId = ctx.params.id;
  let [book, likes, hasLikes] = await Promise.all([
    getById(bookId),
    getLikesByBookId(bookId),
    sessionStorage.length
      ? getLikesFromSpecificUser(bookId, JSON.parse(sessionStorage.user)._id)
      : 0,
  ]);

  let isOwner = false;

  if (sessionStorage.user) {
    isOwner = JSON.parse(sessionStorage.user)._id == book._ownerId;
  }

  render(
    detailsTemplate(isOwner, book, onDelete, onLike, likes, hasLikes),
    document.querySelector('#site-content')
  );

  async function onDelete() {
    let choice = confirm('Are you sure you want to delete this book?');

    if (choice) {
      await deleteById(bookId);
      page.redirect('/dashboard');
    }
  }

  async function onLike() {
    await likeBook({ bookId });
    page.redirect('/details/' + bookId);
  }
}
