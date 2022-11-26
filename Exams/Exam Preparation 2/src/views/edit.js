import { editById, getById } from '../api/data.js';
import { render, html } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';

let editTemplate = (onSubmit, car) => html`<section id="edit-listing">
  <div class="container">
    <form id="edit-form" @submit="${onSubmit}">
      <h1>Edit Car Listing</h1>
      <p>Please fill in this form to edit an listing.</p>
      <hr />
      <p>Car Brand</p>
      <input
        type="text"
        placeholder="Enter Car Brand"
        name="brand"
        value="${car.brand}"
      />
      <p>Car Model</p>
      <input
        type="text"
        placeholder="Enter Car Model"
        name="model"
        value="${car.model}"
      />
      <p>Description</p>
      <input
        type="text"
        placeholder="Enter Description"
        name="description"
        value="${car.description}"
      />
      <p>Car Year</p>
      <input
        type="number"
        placeholder="Enter Car Year"
        name="year"
        value="${car.year}"
      />
      <p>Car Image</p>
      <input
        type="text"
        placeholder="Enter Car Image"
        name="imageUrl"
        value="${car.imageUrl}"
      />
      <p>Car Price</p>
      <input
        type="number"
        placeholder="Enter Car Price"
        name="price"
        value="${car.price}"
      />
      <hr />
      <input type="submit" class="registerbtn" value="Edit Listing" />
    </form>
  </div>
</section>`;

export let showEdit = async (ctx) => {
  let carId = ctx.params.id;
  let car = await getById(carId);

  render(editTemplate(onSubmit, car), document.querySelector('#site-content'));

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

      await editById(carId, {
        brand,
        model,
        description,
        year,
        imageUrl,
        price,
      });
      page.redirect('/details/' + carId);
    } catch (error) {
      alert(error.message);
    }
  }
};
