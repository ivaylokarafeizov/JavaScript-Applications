import { editById, getById } from '../api/data.js';
import { render, html } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';

let editTemplate = (onSubmit, album) => html`<section id="edit">
  <div class="form">
    <h2>Edit Album</h2>
    <form class="edit-form" @submit="${onSubmit}">
      <input
        type="text"
        name="singer"
        id="album-singer"
        placeholder="Singer/Band"
        value="${album.singer}"
      />
      <input
        type="text"
        name="album"
        id="album-album"
        placeholder="Album"
        value="${album.album}"
      />
      <input
        type="text"
        name="imageUrl"
        id="album-img"
        placeholder="Image url"
        value="${album.imageUrl}"
      />
      <input
        type="text"
        name="release"
        id="album-release"
        placeholder="Release date"
        value="${album.release}"
      />
      <input
        type="text"
        name="label"
        id="album-label"
        placeholder="Label"
        value="${album.label}"
      />
      <input
        type="text"
        name="sales"
        id="album-sales"
        placeholder="Sales"
        value="${album.sales}"
      />

      <button type="submit">post</button>
    </form>
  </div>
</section>`;

export let showEdit = async (ctx) => {
  let id = ctx.params.id;
  let album = await getById(id);

  render(editTemplate(onSubmit, album), document.querySelector('main'));

  async function onSubmit(e) {
    e.preventDefault();
    let formData = new FormData(e.currentTarget);
    let { singer, album, imageUrl, release, label, sales } =
      Object.fromEntries(formData);

    try {
      if (
        !singer.length ||
        !imageUrl.length ||
        !album.length ||
        !release.length ||
        !label.length ||
        !sales.length
      ) {
        throw new Error('All fields are required!');
      }

      await editById(id, { singer, album, imageUrl, release, label, sales });
      page.redirect('/details/' + id);
    } catch (error) {
      alert(error.message);
    }
  }
};
