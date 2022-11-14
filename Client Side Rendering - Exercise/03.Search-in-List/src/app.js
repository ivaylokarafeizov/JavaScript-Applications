import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { towns } from './towns.js';
import { search } from './search.js';

let townsTemplate = html`<ul>
  ${towns.map((town) => html`<li>${town}</li>`)}
</ul>`;

render(townsTemplate, document.querySelector('#towns'));
search();
