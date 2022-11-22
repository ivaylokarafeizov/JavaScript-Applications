import { createGame } from '../api/data.js';
import { render, html } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';

let createTemplate = (onSubmit) => html`<section id="create-page" class="auth">
  <form id="create" @submit="${onSubmit}">
    <div class="container">
      <h1>Create Game</h1>
      <label for="leg-title">Legendary title:</label>
      <input
        type="text"
        id="title"
        name="title"
        placeholder="Enter game title..."
      />

      <label for="category">Category:</label>
      <input
        type="text"
        id="category"
        name="category"
        placeholder="Enter game category..."
      />

      <label for="levels">MaxLevel:</label>
      <input
        type="number"
        id="maxLevel"
        name="maxLevel"
        min="1"
        placeholder="1"
      />

      <label for="game-img">Image:</label>
      <input
        type="text"
        id="imageUrl"
        name="imageUrl"
        placeholder="Upload a photo..."
      />

      <label for="summary">Summary:</label>
      <textarea name="summary" id="summary"></textarea>
      <input class="btn submit" type="submit" value="Create Game" />
    </div>
  </form>
</section>`;

export let showCreate = (ctx) => {
  render(createTemplate(onSubmit), document.querySelector('#main-content'));

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

      await createGame({ title, category, maxLevel, imageUrl, summary });
      page.redirect('/catalog');
    } catch (error) {
      alert(error.message);
    }
  }
};
