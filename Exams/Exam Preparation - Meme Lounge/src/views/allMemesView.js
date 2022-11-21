import { render, html } from '../../node_modules/lit-html/lit-html.js';
import { updateNotification } from '../utils/updateNotification.js';

async function getMemes() {
  try {
    let res = await fetch(
      'http://localhost:3030/data/memes?sortBy=_createdOn%20desc',
      { method: 'GET', headers: { 'Content-Type': 'application/json' } }
    );

    if (!res.ok) {
      updateNotification(res.message);
      return;
    }

    let data = await res.json();
    return data;
  } catch (err) {
    updateNotification(err.message);
  }
}

let memesTemplate = (memes) => html`<section id="meme-feed">
  ${memes.length
    ? html`<h1>All Memes</h1>
        <div id="memes">
          ${memes.map(
            (m) =>
              html` <div class="meme">
                <div class="card">
                  <div class="info">
                    <p class="meme-title">${m.title}</p>
                    <img
                      class="meme-image"
                      alt="meme-img"
                      src="${m.imageUrl}"
                    />
                  </div>
                  <div id="data-buttons">
                    <a class="button" href="/memes/${m._id}">Details</a>
                  </div>
                </div>
              </div>`
          )}
        </div>`
    : html`<p class="no-memes">No memes in database.</p>`}
</section> `;

export let allMemesView = async (ctx) => {
  let memes = await getMemes();
  render(memesTemplate(memes), document.querySelector('main'));
};
