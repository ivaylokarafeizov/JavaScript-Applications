import { createOffer } from '../api/data.js';
import { render, html } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';

let createTemplate = (onSubmit) => html`<section id="create">
  <div class="form">
    <h2>Create Offer</h2>
    <form class="create-form" @submit="${onSubmit}">
      <input type="text" name="title" id="job-title" placeholder="Title" />
      <input
        type="text"
        name="imageUrl"
        id="job-logo"
        placeholder="Company logo url"
      />
      <input
        type="text"
        name="category"
        id="job-category"
        placeholder="Category"
      />
      <textarea
        id="job-description"
        name="description"
        placeholder="Description"
        rows="4"
        cols="50"
      ></textarea>
      <textarea
        id="job-requirements"
        name="requirements"
        placeholder="Requirements"
        rows="4"
        cols="50"
      ></textarea>
      <input type="text" name="salary" id="job-salary" placeholder="Salary" />
      <button type="submit">post</button>
    </form>
  </div>
</section>`;

export let showCreate = (ctx) => {
  render(createTemplate(onSubmit), document.querySelector('main'));

  async function onSubmit(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    let { title, imageUrl, category, description, requirements, salary } =
      Object.fromEntries(formData);

    try {
      if (
        !title.length ||
        !imageUrl.length ||
        !category.length ||
        !description.length ||
        !requirements.length ||
        !salary.length
      ) {
        throw new Error('All fields are required!');
      }

      await createOffer({
        title,
        imageUrl,
        category,
        description,
        requirements,
        salary,
      });
      page.redirect('/dashboard');
    } catch (error) {
      alert(error.message);
    }
  }
};
