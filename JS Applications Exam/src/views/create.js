import { createAlbum } from '../api/data.js';
import { render, html } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';

let createTemplate = (onSubmit) => html`<section id="create">
  <div class="form">
    <h2>Add Album</h2>
    <form class="create-form" @submit="${onSubmit}">
      <input
        type="text"
        name="singer"
        id="album-singer"
        placeholder="Singer/Band"
      />
      <input type="text" name="album" id="album-album" placeholder="Album" />
      <input
        type="text"
        name="imageUrl"
        id="album-img"
        placeholder="Image url"
      />
      <input
        type="text"
        name="release"
        id="album-release"
        placeholder="Release date"
      />
      <input type="text" name="label" id="album-label" placeholder="Label" />
      <input type="text" name="sales" id="album-sales" placeholder="Sales" />

      <button type="submit">post</button>
    </form>
  </div>
</section>`;

export let showCreate = (ctx) => {
  render(createTemplate(onSubmit), document.querySelector('main'));

  async function onSubmit(e) {
    e.preventDefault();
    let formData = new FormData(e.currentTarget);
    let { singer, album, imageUrl, release, label, sales } =
      Object.fromEntries(formData);

    try {
      if (
        !singer.length ||
        !album.length ||
        !imageUrl.length ||
        !release.length ||
        !label.length ||
        !sales.length
      ) {
        throw new Error('All fields are required!');
      }

      await createAlbum({ singer, album, imageUrl, release, label, sales });
      page.redirect('/dashboard');
    } catch (error) {
      alert(error.message);
    }
  }
};
