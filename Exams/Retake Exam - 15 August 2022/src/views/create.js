import { createShoes } from '../api/data.js';
import { render, html } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';

let createTemplate = (onSubmit) => html`<section id="create">
  <div class="form">
    <h2>Add item</h2>
    <form class="create-form" @submit="${onSubmit}">
      <input type="text" name="brand" id="shoe-brand" placeholder="Brand" />
      <input type="text" name="model" id="shoe-model" placeholder="Model" />
      <input
        type="text"
        name="imageUrl"
        id="shoe-img"
        placeholder="Image url"
      />
      <input
        type="text"
        name="release"
        id="shoe-release"
        placeholder="Release date"
      />
      <input
        type="text"
        name="designer"
        id="shoe-designer"
        placeholder="Designer"
      />
      <input type="text" name="value" id="shoe-value" placeholder="Value" />

      <button type="submit">post</button>
    </form>
  </div>
</section>`;

export let showCreate = (ctx) => {
  render(createTemplate(onSubmit), document.querySelector('main'));

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

      await createShoes({ brand, model, imageUrl, release, designer, value });
      page.redirect('/dashboard');
    } catch (error) {
      alert(error.message);
    }
  }
};
