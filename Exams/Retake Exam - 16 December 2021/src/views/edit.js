import { editById, getById } from '../api/data.js';
import { render, html } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';

let editTemplate = (onSubmit, event) => html`<section id="editPage">
  <form class="theater-form" @submit="${onSubmit}">
    <h1>Edit Theater</h1>
    <div>
      <label for="title">Title:</label>
      <input
        id="title"
        name="title"
        type="text"
        placeholder="Theater name"
        value="${event.title}"
      />
    </div>
    <div>
      <label for="date">Date:</label>
      <input
        id="date"
        name="date"
        type="text"
        placeholder="Month Day, Year"
        value="${event.date}"
      />
    </div>
    <div>
      <label for="author">Author:</label>
      <input
        id="author"
        name="author"
        type="text"
        placeholder="Author"
        value="${event.author}"
      />
    </div>
    <div>
      <label for="description">Theater Description:</label>
      <textarea id="description" name="description" placeholder="Description">
${event.description}</textarea
      >
    </div>
    <div>
      <label for="imageUrl">Image url:</label>
      <input
        id="imageUrl"
        name="imageUrl"
        type="text"
        placeholder="Image Url"
        value="${event.imageUrl}"
      />
    </div>
    <button class="btn" type="submit">Submit</button>
  </form>
</section>`;

export let showEdit = async (ctx) => {
  let id = ctx.params.id;
  let event = await getById(id);

  render(editTemplate(onSubmit, event), document.querySelector('#content'));

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

      await editById(id, { title, date, author, description, imageUrl });
      page.redirect('/details/' + id);
    } catch (error) {
      alert(error.message);
    }
  }
};
