import { createEvent } from '../api/data.js';
import { render, html } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';

let createTemplate = (onSubmit) => html`<section id="createPage">
  <form class="create-form" @submit="${onSubmit}">
    <h1>Create Theater</h1>
    <div>
      <label for="title">Title:</label>
      <input
        id="title"
        name="title"
        type="text"
        placeholder="Theater name"
        value=""
      />
    </div>
    <div>
      <label for="date">Date:</label>
      <input id="date" name="date" type="text" placeholder="Month Day, Year" />
    </div>
    <div>
      <label for="author">Author:</label>
      <input id="author" name="author" type="text" placeholder="Author" />
    </div>
    <div>
      <label for="description">Description:</label>
      <textarea
        id="description"
        name="description"
        placeholder="Description"
      ></textarea>
    </div>
    <div>
      <label for="imageUrl">Image url:</label>
      <input
        id="imageUrl"
        name="imageUrl"
        type="text"
        placeholder="Image Url"
        value=""
      />
    </div>
    <button class="btn" type="submit">Submit</button>
  </form>
</section>`;

export let showCreate = (ctx) => {
  render(createTemplate(onSubmit), document.querySelector('#content'));

  async function onSubmit(e) {
    e.preventDefault();
    let formData = new FormData(e.currentTarget);
    let { title, date, author, description, imageUrl } =
      Object.fromEntries(formData);

    try {
      if (
        !title.length ||
        !date.length ||
        !author.length ||
        !description.length ||
        !imageUrl.length
      ) {
        throw new Error('All fields are required!');
      }

      await createEvent({ title, date, author, description, imageUrl });
      page.redirect('/');
    } catch (error) {
      alert(error.message);
    }
  }
};
