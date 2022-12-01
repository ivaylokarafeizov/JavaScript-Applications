import { editById, getById } from '../api/data.js';
import { render, html } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';

let editTemplate = (onSubmit, offer) => html`<section id="edit">
  <div class="form">
    <h2>Edit Offer</h2>
    <form class="edit-form" @submit="${onSubmit}">
      <input
        type="text"
        name="title"
        id="job-title"
        placeholder="Title"
        value="${offer.title}"
      />
      <input
        type="text"
        name="imageUrl"
        id="job-logo"
        placeholder="Company logo url"
        value="${offer.imageUrl}"
      />
      <input
        type="text"
        name="category"
        id="job-category"
        placeholder="Category"
        value="${offer.category}"
      />
      <textarea
        id="job-description"
        name="description"
        placeholder="Description"
        rows="4"
        cols="50"
      >
${offer.description}</textarea
      >
      <textarea
        id="job-requirements"
        name="requirements"
        placeholder="Requirements"
        rows="4"
        cols="50"
      >
${offer.requirements}</textarea
      >
      <input
        type="text"
        name="salary"
        id="job-salary"
        placeholder="Salary"
        value="${offer.salary}"
      />
      <button type="submit">post</button>
    </form>
  </div>
</section> `;

export let showEdit = async (ctx) => {
  let offerId = ctx.params.id;
  let offer = await getById(offerId);

  render(editTemplate(onSubmit, offer), document.querySelector('main'));

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

      await editById(offerId, {
        title,
        imageUrl,
        category,
        description,
        requirements,
        salary,
      });
      page.redirect('/details/' + offerId);
    } catch (error) {
      alert(error.message);
    }
  }
};
