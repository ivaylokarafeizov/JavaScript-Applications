import { html, render } from '../node_modules/lit-html/lit-html.js';

let url = 'http://localhost:3030/jsonstore/advanced/dropdown';

getData();

document.querySelector('input[value="Add"]').addEventListener('click', (e) => {
  e.preventDefault();
  let input = document.querySelector('#itemText');

  if (!input.value) {
    return;
  }

  postData(input.value);
  getData();
});

async function getData() {
  try {
    let response = await fetch(url);

    if (!response.ok) {
      throw new Error('Cannot fetch data!');
    }

    let data = await response.json();

    let optionsTemplate = html`${Object.values(data).map(
      (c) => html`<option value="${c._id}">${c.text}</option>`
    )}`;

    render(optionsTemplate, document.getElementById('menu'));
  } catch (err) {
    alert(err.message);
  }
}

async function postData(input) {
  try {
    let response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: input }),
    });

    if (!response.ok) {
      throw new Error('Cannot send data!');
    }
  } catch (err) {
    alert(err.message);
  }
}
