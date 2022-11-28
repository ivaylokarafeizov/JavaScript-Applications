import { editById, getById } from '../api/data.js';
import { render, html } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';

let editTemplate = (onSubmit, pet) => html`<section id="editPage">
  <form class="editForm" @submit="${onSubmit}">
    <img src="${pet.image}" />
    <div>
      <h2>Edit PetPal</h2>
      <div class="name">
        <label for="name">Name:</label>
        <input name="name" id="name" type="text" value="${pet.name}" />
      </div>
      <div class="breed">
        <label for="breed">Breed:</label>
        <input name="breed" id="breed" type="text" value="${pet.breed}" />
      </div>
      <div class="Age">
        <label for="age">Age:</label>
        <input name="age" id="age" type="text" value="${pet.age}" />
      </div>
      <div class="weight">
        <label for="weight">Weight:</label>
        <input name="weight" id="weight" type="text" value="${pet.weight}" />
      </div>
      <div class="image">
        <label for="image">Image:</label>
        <input name="image" id="image" type="text" value="${pet.image}" />
      </div>
      <button class="btn" type="submit">Edit Pet</button>
    </div>
  </form>
</section>`;

export let showEdit = async (ctx) => {
  let petId = ctx.params.id;
  let pet = await getById(petId);

  render(editTemplate(onSubmit, pet), document.querySelector('#content'));

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

      await editById(petId, { name, breed, age, weight, image });
      page.redirect('/details/' + petId);
    } catch (error) {
      alert(error.message);
    }
  }
};
