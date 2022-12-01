import { editById, getById } from '../api/data.js';
import { render, html } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';

let editTemplate = (onSubmit, post) => html`<section
  id="edit-page"
  class="auth"
>
  <form id="edit" @submit="${onSubmit}">
    <h1 class="title">Edit Post</h1>
    <article class="input-group">
      <label for="title">Post Title</label>
      <input type="title" name="title" id="title" value="${post.title}" />
    </article>
    <article class="input-group">
      <label for="description">Description of the needs </label>
      <input
        type="text"
        name="description"
        id="description"
        value="${post.description}"
      />
    </article>
    <article class="input-group">
      <label for="imageUrl"> Needed materials image </label>
      <input
        type="text"
        name="imageUrl"
        id="imageUrl"
        value="${post.imageUrl}"
      />
    </article>
    <article class="input-group">
      <label for="address">Address of the orphanage</label>
      <input type="text" name="address" id="address" value="${post.address}" />
    </article>
    <article class="input-group">
      <label for="phone">Phone number of orphanage employee</label>
      <input type="text" name="phone" id="phone" value="${post.phone}" />
    </article>
    <input type="submit" class="btn submit" value="Edit Post" />
  </form>
</section>`;

export let showEdit = async (ctx) => {
  let postId = ctx.params.id;
  let post = await getById(postId);

  render(editTemplate(onSubmit, post), document.querySelector('#main-content'));

  async function onSubmit(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    let { title, description, imageUrl, address, phone } =
      Object.fromEntries(formData);

    try {
      if (
        !title.length ||
        !description.length ||
        !imageUrl.length ||
        !address.length ||
        !phone.length
      ) {
        throw new Error('All fields are required!');
      }

      await editById(postId, { title, description, imageUrl, address, phone });
      page.redirect('/details/' + postId);
    } catch (error) {
      alert(error.message);
    }
  }
};
