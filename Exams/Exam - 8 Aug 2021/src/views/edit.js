import { editById, getById } from '../api/data.js';
import { render, html } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';

let editTemplate = (onSubmit, book) => html`<section
  id="edit-page"
  class="edit"
>
  <form id="edit-form" @submit="${onSubmit}">
    <fieldset>
      <legend>Edit my Book</legend>
      <p class="field">
        <label for="title">Title</label>
        <span class="input">
          <input type="text" name="title" id="title" value="${book.title}" />
        </span>
      </p>
      <p class="field">
        <label for="description">Description</label>
        <span class="input">
          <textarea name="description" id="description">
${book.description}</textarea
          >
        </span>
      </p>
      <p class="field">
        <label for="image">Image</label>
        <span class="input">
          <input
            type="text"
            name="imageUrl"
            id="image"
            value="${book.imageUrl}"
          />
        </span>
      </p>
      <p class="field">
        <label for="type">Type</label>
        <span class="input">
          <select id="type" name="type" value="${book.type}">
            <option value="Fiction" selected>Fiction</option>
            <option value="Romance">Romance</option>
            <option value="Mistery">Mistery</option>
            <option value="Classic">Clasic</option>
            <option value="Other">Other</option>
          </select>
        </span>
      </p>
      <input class="button submit" type="submit" value="Save" />
    </fieldset>
  </form>
</section>`;

export let showEdit = async (ctx) => {
  let id = ctx.params.id;
  let book = await getById(id);

  render(editTemplate(onSubmit, book), document.querySelector('#site-content'));

  async function onSubmit(e) {
    e.preventDefault();
    let formData = new FormData(e.currentTarget);
    let { title, description, imageUrl, type } = Object.fromEntries(formData);

    try {
      if (
        !title.length ||
        !description.length ||
        !imageUrl.length ||
        !type.length
      ) {
        throw new Error('All fields are required!');
      }

      await editById(id, { title, description, imageUrl, type });
      page.redirect('/details/' + id);
    } catch (error) {
      alert(error.message);
    }
  }
};
