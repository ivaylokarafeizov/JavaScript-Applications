import { render, html } from '../../node_modules/lit-html/lit-html.js';
import { getAllBooks } from '../api/data.js';

let dashboardTemplate = (books) => html`<section
  id="dashboard-page"
  class="dashboard"
>
  <h1>Dashboard</h1>
  ${books.length
    ? html`<ul class="other-books-list">
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

export let showDashboard = async (ctx) => {
  let books = await getAllBooks();
  render(dashboardTemplate(books), document.querySelector('#site-content'));
};
