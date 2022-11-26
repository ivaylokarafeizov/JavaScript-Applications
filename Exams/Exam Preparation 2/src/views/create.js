import { createCar } from '../api/data.js';
import { render, html } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';

let createTemplate = (onSubmit) => html`<section id="create-listing">
  <div class="container">
    <form id="create-form" @submit="${onSubmit}">
      <h1>Create Car Listing</h1>
      <p>Please fill in this form to create an listing.</p>
      <hr />
      <p>Car Brand</p>
      <input type="text" placeholder="Enter Car Brand" name="brand" />
      <p>Car Model</p>
      <input type="text" placeholder="Enter Car Model" name="model" />
      <p>Description</p>
      <input type="text" placeholder="Enter Description" name="description" />
      <p>Car Year</p>
      <input type="number" placeholder="Enter Car Year" name="year" />
      <p>Car Image</p>
      <input type="text" placeholder="Enter Car Image" name="imageUrl" />
      <p>Car Price</p>
      <input type="number" placeholder="Enter Car Price" name="price" />
      <hr />
      <input type="submit" class="registerbtn" value="Create Listing" />
    </form>
  </div>
</section>`;

export let showCreate = (ctx) => {
  render(createTemplate(onSubmit), document.querySelector('#site-content'));

  async function onSubmit(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    let brand = formData.get('brand').trim();
    let model = formData.get('model').trim();
    let imageUrl = formData.get('imageUrl').trim();
    let year = Number(formData.get('year').trim());
    let price = Number(formData.get('price').trim());
    let description = formData.get('description').trim();

    try {
      if (
        !brand.length ||
        !model.length ||
        !description.length ||
        !imageUrl.length
      ) {
        throw new Error('All fields are required!');
      }

      if (year < 1 || price < 1) {
        throw new Error('Year/price must be positive number');
      }

      await createCar({ brand, model, description, year, imageUrl, price });
      page.redirect('/all-listings');
    } catch (error) {
      alert(error.message);
    }
  }
};
