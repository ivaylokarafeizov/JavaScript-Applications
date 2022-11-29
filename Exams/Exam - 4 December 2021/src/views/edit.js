import { editById, getById } from '../api/data.js';
import { render, html } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';

let editTemplate = (onSubmit, song) => html`<section class="editPage">
  <form @submit="${onSubmit}">
    <fieldset>
      <legend>Edit Album</legend>
      <div class="container">
        <label for="name" class="vhide">Album name</label>
        <input
          id="name"
          name="name"
          class="name"
          type="text"
          value="${song.name}"
        />
        <label for="imgUrl" class="vhide">Image Url</label>
        <input
          id="imgUrl"
          name="imgUrl"
          class="imgUrl"
          type="text"
          value="${song.imgUrl}"
        />
        <label for="price" class="vhide">Price</label>
        <input
          id="price"
          name="price"
          class="price"
          type="text"
          value="${song.price}"
        />
        <label for="releaseDate" class="vhide">Release date</label>
        <input
          id="releaseDate"
          name="releaseDate"
          class="releaseDate"
          type="text"
          value="${song.releaseDate}"
        />
        <label for="artist" class="vhide">Artist</label>
        <input
          id="artist"
          name="artist"
          class="artist"
          type="text"
          value="${song.artist}"
        />
        <label for="genre" class="vhide">Genre</label>
        <input
          id="genre"
          name="genre"
          class="genre"
          type="text"
          value="${song.genre}"
        />
        <label for="description" class="vhide">Description</label>
        <textarea name="description" class="description" rows="10" cols="10">
${song.description}</textarea
        >
        <button class="edit-album" type="submit">Edit Album</button>
      </div>
    </fieldset>
  </form>
</section>`;

export let showEdit = async (ctx) => {
  let id = ctx.params.id;
  let song = await getById(id);

  render(editTemplate(onSubmit, song), document.querySelector('#main-content'));

  async function onSubmit(e) {
    e.preventDefault();
    let formData = new FormData(e.currentTarget);
    let { name, imgUrl, price, releaseDate, artist, genre, description } =
      Object.fromEntries(formData);

    try {
      if (
        !name.length ||
        !imgUrl.length ||
        !price.length ||
        !releaseDate.length ||
        !artist.length ||
        !genre.length ||
        !description.length
      ) {
        throw new Error('All fields are required!');
      }

      await editById(id, {
        name,
        imgUrl,
        price,
        releaseDate,
        artist,
        genre,
        description,
      });
      page.redirect('/details/' + id);
    } catch (error) {
      alert(error.message);
    }
  }
};
