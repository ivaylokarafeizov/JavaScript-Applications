import { getMyBooks } from '../api/data.js';
import { render, html } from '../../node_modules/lit-html/lit-html.js';

let myBookTemplate = (books) => html`<section
  id="my-books-page"
  class="my-books"
>
  <h1>My Books</h1>
  ${books.length
    ? html`<ul class="my-books-list">
        ${books.map(
          (b) => html` <li class="otherBooks">
            <h3>${b.title}</h3>
            <p>Type: ${b.type}</p>
            <p class="img"><img src="${b.imageUrl}" /></p>
            <a class="button" href="/details/${b._id}">Details</a>
          </li>`
        )}
      </ul>`
    : html`<p class="no-books">No books in database!</p>`}
</section> `;

export let showMyBooks = async (ctx) => {
  let userId = JSON.parse(sessionStorage.user)._id;
  let books = await getMyBooks(userId);
  render(myBookTemplate(books), document.querySelector('#site-content'));
};
