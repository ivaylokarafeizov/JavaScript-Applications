import { render, html } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';
import { updateNotification } from '../utils/updateNotification.js';

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

let editTemplate = (meme, onSubmit) => html`<section id="edit-meme">
  <form id="edit-form" @submit="${onSubmit}">
    <h1>Edit Meme</h1>
    <div class="container">
      <label for="title">Title</label>
      <input
        id="title"
        type="text"
        placeholder="Enter Title"
        name="title"
        value="${meme.title}"
      />
      <label for="description">Description</label>
      <textarea
        id="description"
        placeholder="Enter Description"
        name="description"
      >
${meme.description}</textarea
      >
      <label for="imageUrl">Image Url</label>
      <input
        id="imageUrl"
        type="text"
        placeholder="Enter Meme ImageUrl"
        name="imageUrl"
        value="${meme.imageUrl}"
      />
      <input type="submit" class="registerbtn button" value="Edit Meme" />
    </div>
  </form>
</section>`;

export async function editView(ctx) {
  let meme = await getMeme(ctx.params.id);
  render(editTemplate(meme, onSubmit), document.querySelector('main'));

  async function onSubmit(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    let { title, description, imageUrl } = Object.fromEntries(formData);

    if (!title || !description || !imageUrl) {
      updateNotification('All fields are required!');
      return;
    }

    try {
      let res = await fetch(
        'http://localhost:3030/data/memes/' + ctx.params.id,
        {
          method: 'PUT',
          headers: { 'X-Authorization': localStorage.accessToken },
          body: JSON.stringify({ title, description, imageUrl }),
        }
      );

      if (!res.ok) {
        updateNotification(res.message);
        return;
      }

      page.redirect('/memes/' + ctx.params.id);
    } catch (err) {
      updateNotification(err.message);
    }
  }
}
