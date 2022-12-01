import { render, html } from '../../node_modules/lit-html/lit-html.js';
import { getMyPosts } from '../api/data.js';

let profileTemplate = (posts) => html`<section id="my-posts-page">
  <h1 class="title">My Posts</h1>
  ${posts.length
    ? html`<div class="my-posts">
        ${posts.map(
          (p) => html`<div class="post">
            <h2 class="post-title">${p.title}</h2>
            <img class="post-image" src="${p.imageUrl}" alt="Material Image" />
            <div class="btn-wrapper">
              <a href="/details/${p._id}" class="details-btn btn">Details</a>
            </div>
          </div> `
        )}
      </div>`
    : html`<h1 class="title no-posts-title">You have no posts yet!</h1>`}
</section>`;

export let showMyProfile = async (ctx) => {
  let userId = JSON.parse(sessionStorage.getItem('user'))._id;
  let posts = await getMyPosts(userId);
  render(profileTemplate(posts), document.querySelector('#main-content'));
};
