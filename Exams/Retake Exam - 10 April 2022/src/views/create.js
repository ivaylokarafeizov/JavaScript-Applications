import { createPost } from '../api/data.js';
import { render, html } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';

let createTemplate = (onSubmit) => html`<section id="create-page" class="auth">
  <form id="create" @submit="${onSubmit}">
    <h1 class="title">Create Post</h1>
    <article class="input-group">
      <label for="title">Post Title</label>
      <input type="title" name="title" id="title" />
    </article>
    <article class="input-group">
      <label for="description">Description of the needs </label>
      <input type="text" name="description" id="description" />
    </article>
    <article class="input-group">
      <label for="imageUrl"> Needed materials image </label>
      <input type="text" name="imageUrl" id="imageUrl" />
    </article>
    <article class="input-group">
      <label for="address">Address of the orphanage</label>
      <input type="text" name="address" id="address" />
    </article>
    <article class="input-group">
      <label for="phone">Phone number of orphanage employee</label>
      <input type="text" name="phone" id="phone" />
    </article>
    <input type="submit" class="btn submit" value="Create Post" />
  </form>
</section>`;

export let showCreate = (ctx) => {
  render(createTemplate(onSubmit), document.querySelector('#main-content'));

  async function onSubmit(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    let { title, description, imageUrl, address, phone } =
      Object.fromEntries(formData);

    try {
      if (
        !title.length ||
        !description.length ||
        !imageUrl.length ||
        !address.length ||
        !phone.length
      ) {
        throw new Error('All fields are required!');
      }

      await createPost({ title, description, imageUrl, address, phone });
      page.redirect('/dashboard');
    } catch (error) {
      alert(error.message);
    }
  }
};
