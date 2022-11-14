import { html, render } from '../node_modules/lit-html/lit-html.js';

document.getElementById('btnLoadTowns').addEventListener('click', onClick);

function onClick(e) {
  e.preventDefault();
  let input = document.getElementById('towns').value;
  let towns = input.split(', ');

  let townsTemplate = html`<ul>
    ${towns.map((town) => html`<li>${town}</li>`)}
  </ul>`;

  render(townsTemplate, document.getElementById('root'));
}
