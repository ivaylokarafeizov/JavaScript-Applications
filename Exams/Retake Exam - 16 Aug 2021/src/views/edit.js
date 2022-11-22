import { editById, getById } from '../api/data.js';
import { render, html } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';

let editTemplate = (onSubmit, game) => html`<section
  id="edit-page"
  class="auth"
>
  <form id="edit" @submit="${onSubmit}">
    <div class="container">
      <h1>Edit Game</h1>
      <label for="leg-title">Legendary title:</label>
      <input type="text" id="title" name="title" value="${game.title}" />

      <label for="category">Category:</label>
      <input
        type="text"
        id="category"
        name="category"
        value="${game.category}"
      />

      <label for="levels">MaxLevel:</label>
      <input
        type="number"
        id="maxLevel"
        name="maxLevel"
        min="1"
        value="${game.maxLevel}"
      />

      <label for="game-img">Image:</label>
      <input
        type="text"
        id="imageUrl"
        name="imageUrl"
        value="${game.imageUrl}"
      />

      <label for="summary">Summary:</label>
      <textarea name="summary" id="summary">${game.summary}</textarea>
      <input class="btn submit" type="submit" value="Edit Game" />
    </div>
  </form>
</section>`;

export let showEdit = async (ctx) => {
  let id = ctx.params.id;
  let game = await getById(id);

  render(editTemplate(onSubmit, game), document.querySelector('#main-content'));

  async function onSubmit(e) {
    e.preventDefault();
    let formData = new FormData(e.currentTarget);
    let { title, category, maxLevel, imageUrl, summary } =
      Object.fromEntries(formData);

    try {
      if (
        !title.length ||
        !category.length ||
        !imageUrl.length ||
        !summary.length ||
        !maxLevel.length
      ) {
        throw new Error('All fields are required!');
      }

      await editById(id, { title, category, maxLevel, imageUrl, summary });
      page.redirect('/details/' + id);
    } catch (error) {
      alert(error.message);
    }
  }
};
