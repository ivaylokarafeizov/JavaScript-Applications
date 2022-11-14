import { cats } from './catSeeder.js';
import { html, render } from '../node_modules/lit-html/lit-html.js';

let catsTemplate = html`<ul>
  ${cats.map(
    (cat) => html`<li>
      <img
        src="./images/${cat.imageLocation}.jpg"
        width="250"
        height="250"
        alt="Card image cap"
      />
      <div class="info">
        <button @click="${onClick}" class="showBtn">Show status code</button>
        <div class="status" style="display: none" id="${cat.id}">
          <h4>Status Code: ${cat.statusCode}</h4>
          <p>${cat.statusMessage}</p>
        </div>
      </div>
    </li>`
  )}
</ul>`;

render(catsTemplate, document.getElementById('allCats'));

function onClick(e) {
  let infoDiv = e.target.parentNode;
  let detailsDiv = infoDiv.querySelector('.status');
  let detailsDivStyle = detailsDiv.style.display;

  if (detailsDivStyle == 'block') {
    detailsDiv.style.display = 'none';
    e.target.textContent = 'Show status code';
  } else {
    detailsDiv.style.display = 'block';
    e.target.textContent = 'Hide status code';
  }
}
