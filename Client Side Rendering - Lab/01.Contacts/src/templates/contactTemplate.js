import { html } from '../../node_modules/lit-html/lit-html.js';
import { toggleDetails } from '../details.js';

export let contactTemplate = (data) =>
  html`<div class="contact card">
    <div>
      <i class="far fa-user-circle gravatar"></i>
    </div>
    <div class="info">
      <h2>Name: ${data.name}</h2>
      <button @click="${toggleDetails}" class="detailsBtn">Details</button>
      <div class="details" id="${data.id}">
        <p>Phone number: ${data.phoneNumber}</p>
        <p>Email: ${data.email}</p>
      </div>
    </div>
  </div>`;
