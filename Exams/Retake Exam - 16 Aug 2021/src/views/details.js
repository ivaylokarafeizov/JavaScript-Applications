import { deleteById, getById, postComment, getComments } from '../api/data.js';
import { render, html, nothing } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';

let detailsTemplate = (isOwner, game, comments, onDelete, onSubmit) => html`
<section id="game-details">
    <h1>Game Details</h1>
    <div class="info-section">

        <div class="game-header">
            <img class="game-img" src=${game.imageUrl} />
            <h1>${game.title}</h1>
            <span class="levels">MaxLevel: ${game.maxLevel}</span>
            <p class="type">${game.category}</p>
        </div>

        <p class="text">
            ${game.summary}
        </p>
        <div class="details-comments">
            <h2>Comments:</h2>
            <ul>
            ${
              comments.length > 0
                ? html`${comments.map((comment) => {
                    return html` <li class="comment">
                      <p>Content: ${comment.comment}</p>
                    </li>`;
                  })}`
                : html`<p class="no-comment">No comments.</p>`
            }
        </div>
        ${
          isOwner
            ? html`<div class="buttons">
                <a href="/edit/${game._id}" class="button">Edit</a>
                <a @click=${onDelete} href="javascript:void(0)" class="button"
                  >Delete</a
                >
              </div>`
            : nothing
        }
        </div>
        
        ${
          sessionStorage.user && !isOwner
            ? html` <article class="create-comment">
                <label>Add new comment:</label>
                <form id=${game._id} class="form" @submit=${onSubmit}>
                  <textarea
                    name="comment"
                    placeholder="Comment......"
                  ></textarea>
                  <input class="btn submit" type="submit" value="Add Comment" />
                </form>
              </article>`
            : nothing
        }
</section>`;

export async function showDetails(ctx) {
  let id = ctx.params.id;
  let [game, comments] = await Promise.all([getById(id), getComments(id)]);

  let isOwner = false;

  if (sessionStorage.user) {
    isOwner = JSON.parse(sessionStorage.user)._id == game._ownerId;
  }

  render(
    detailsTemplate(isOwner, game, comments, onDelete, onSubmit),
    document.querySelector('#main-content')
  );

  async function onDelete() {
    let choice = confirm('Are you sure ypu want to delete this idea?');

    if (choice) {
      await deleteById(id);
      page.redirect('/catalog');
    }
  }

  async function onSubmit(e) {
    e.preventDefault();
    let form = e.currentTarget;
    let formData = new FormData(form);
    let comment = formData.get('comment');

    try {
      if (!comment.length) {
        throw new Error('Comment field is required!');
      }

      await postComment({ gameId: id, comment });
      form.reset();
      page.redirect(`/details/${id}`);
    } catch (error) {
      alert(error.message);
    }
  }
}
