import { render, html } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';
import { updateNotification } from '../utils/updateNotification.js';

let createTemplate = (onSubmit) => html`<section id="create-meme">
  <form id="create-form" @submit="${onSubmit}">
    <div class="container">
      <h1>Create Meme</h1>
      <label for="title">Title</label>
      <input id="title" type="text" placeholder="Enter Title" name="title" />
      <label for="description">Description</label>
      <textarea
        id="description"
        placeholder="Enter Description"
        name="description"
      ></textarea>
      <label for="imageUrl">Meme Image</label>
      <input
        id="imageUrl"
        type="text"
        placeholder="Enter meme ImageUrl"
        name="imageUrl"
      />
      <input type="submit" class="registerbtn button" value="Create Meme" />
    </div>
  </form>
</section>`;

export let createView = (ctx) => {
  render(createTemplate(onSubmit), document.querySelector('main'));

  async function onSubmit(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    let { title, description, imageUrl } = Object.fromEntries(formData);

    if (!title || !description || !imageUrl) {
      updateNotification('All fields are required!');
      return;
    }

    try {
      let res = await fetch('http://localhost:3030/data/memes', {
        method: 'POST',
        body: JSON.stringify({ title, description, imageUrl }),
      });

      if (!res.ok) {
        updateNotification(res.message);
        return;
      }

      page.redirect('/memes');
    } catch (err) {
      updateNotification(err.message);
    }
  }
};
