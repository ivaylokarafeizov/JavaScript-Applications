import { createPet } from '../api/data.js';
import { render, html } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';

let createTemplate = (onSubmit) => html`<section id="createPage">
  <form class="createForm" @submit="${onSubmit}">
    <img src="./images/cat-create.jpg" />
    <div>
      <h2>Create PetPal</h2>
      <div class="name">
        <label for="name">Name:</label>
        <input name="name" id="name" type="text" placeholder="Max" />
      </div>
      <div class="breed">
        <label for="breed">Breed:</label>
        <input name="breed" id="breed" type="text" placeholder="Shiba Inu" />
      </div>
      <div class="Age">
        <label for="age">Age:</label>
        <input name="age" id="age" type="text" placeholder="2 years" />
      </div>
      <div class="weight">
        <label for="weight">Weight:</label>
        <input name="weight" id="weight" type="text" placeholder="5kg" />
      </div>
      <div class="image">
        <label for="image">Image:</label>
        <input
          name="image"
          id="image"
          type="text"
          placeholder="./image/dog.jpeg"
        />
      </div>
      <button class="btn" type="submit">Create Pet</button>
    </div>
  </form>
</section>`;

export let showCreate = (ctx) => {
  render(createTemplate(onSubmit), document.querySelector('#content'));

  async function onSubmit(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    let name = formData.get('name').trim();
    let breed = formData.get('breed').trim();
    let age = formData.get('age').trim();
    let weight = formData.get('weight').trim();
    let image = formData.get('image').trim();

    try {
      if (
        !name.length ||
        !breed.length ||
        !age.length ||
        !weight.length ||
        !image.length
      ) {
        throw new Error('All fields are required!');
      }

      await createPet({ name, breed, age, weight, image });
      page.redirect('/');
    } catch (error) {
      alert(error.message);
    }
  }
};
