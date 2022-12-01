import { render, html } from '../../node_modules/lit-html/lit-html.js';
import { getAllPosts } from '../api/data.js';

let dashboardTemplate = (posts) => html`<section id="dashboard-page">
  <h1 class="title">All Posts</h1>
  ${posts.length
    ? html`<div class="all-posts">
        ${posts.map(
          (p) => html`<div class="post">
            <h2 class="post-title">${p.title}</h2>
            <img class="post-image" src="${p.imageUrl}" alt="Material Image" />
            <div class="btn-wrapper">
              <a href="/details/${p._id}" class="details-btn btn">Details</a>
            </div>
          </div>`
        )}
      </div>`
    : html`<h1 class="title no-posts-title">No posts yet!</h1>`}
</section>`;

export let showDashboard = async (ctx) => {
  let posts = await getAllPosts();
  render(dashboardTemplate(posts), document.querySelector('#main-content'));
};
