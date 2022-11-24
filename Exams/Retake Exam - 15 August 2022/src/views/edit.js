import { editById, getById } from '../api/data.js';
import { render, html } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';

let editTemplate = (onSubmit, shoes) => html`<section id="edit">
  <div class="form">
    <h2>Edit item</h2>
    <form class="edit-form" @submit="${onSubmit}">
      <input
        type="text"
        name="brand"
        id="shoe-brand"
        placeholder="Brand"
        value="${shoes.brand}"
      />
      <input
        type="text"
        name="model"
        id="shoe-model"
        placeholder="Model"
        value="${shoes.model}"
      />
      <input
        type="text"
        name="imageUrl"
        id="shoe-img"
        placeholder="Image url"
        value="${shoes.imageUrl}"
      />
      <input
        type="text"
        name="release"
        id="shoe-release"
        placeholder="Release date"
        value="${shoes.release}"
      />
      <input
        type="text"
        name="designer"
        id="shoe-designer"
        placeholder="Designer"
        value="${shoes.designer}"
      />
      <input
        type="text"
        name="value"
        id="shoe-value"
        placeholder="Value"
        value="${shoes.value}"
      />
      <button type="submit">post</button>
    </form>
  </div>
</section>`;

export let showEdit = async (ctx) => {
  let id = ctx.params.id;
  let shoes = await getById(id);

  render(editTemplate(onSubmit, shoes), document.querySelector('main'));

  async function onSubmit(e) {
    e.preventDefault();
    let formData = new FormData(e.currentTarget);
    let { brand, model, imageUrl, release, designer, value } =
      Object.fromEntries(formData);

    try {
      if (
        !brand.length ||
        !model.length ||
        !imageUrl.length ||
        !release.length ||
        !designer.length ||
        !value.length
      ) {
        throw new Error('All fields are required!');
      }

      await editById(id, { brand, model, imageUrl, release, designer, value });
      page.redirect('/details/' + id);
    } catch (error) {
      alert(error.message);
    }
  }
};
