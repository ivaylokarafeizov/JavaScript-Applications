import { render, html, nothing } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';

async function getMeme(id) {
  try {
    let res = await fetch('http://localhost:3030/data/memes/' + id, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    let data = await res.json();
    return data;
  } catch (err) {
    alert(err.message);
  }
}

let detailsTemplate = (meme, isOwner, onDelete) => html`<section
  id="meme-details"
>
  <h1>Meme Title: ${meme.title}</h1>
  <div class="meme-details">
    <div class="meme-img">
      <img alt="meme-alt" src="${meme.imageUrl}" />
    </div>
    <div class="meme-description">
      <h2>Meme Description</h2>
      <p>${meme.description}</p>
      ${isOwner
        ? html`<a class="button warning" href="/edit/${meme._id}">Edit</a>
            <button @click=${onDelete} class="button danger">Delete</button>`
        : nothing}
    </div>
  </div>
</section>`;

export async function detailsView(ctx) {
  let meme = await getMeme(ctx.params.id);
  let isOwner = localStorage.userId == meme._ownerId;
  render(
    detailsTemplate(meme, isOwner, onDelete),
    document.querySelector('main')
  );

  async function onDelete() {
    const confirmed = confirm('Are you sure you want to delete this item?');
    if (confirmed) {
      try {
        let res = await fetch(
          'http://localhost:3030/data/memes/' + ctx.params.id,
          {
            method: 'DELETE',
            headers: { 'X-Authorization': localStorage.accessToken },
          }
        );

        if (!res.ok) {
          alert(res.message);
        }

        page.redirect('/memes');
      } catch (err) {
        alert(err.message);
      }
    }
  }
}
