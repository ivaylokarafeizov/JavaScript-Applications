import { render, html } from '../../node_modules/lit-html/lit-html.js';
import { getEventsByUserId } from '../api/data.js';

let profileTemplate = (myEvents, email) => html`<section id="profilePage">
  <div class="userInfo">
    <div class="avatar">
      <img src="./images/profilePic.png" />
    </div>
    <h2>${email}</h2>
  </div>
  <div class="board">
    ${myEvents.length
      ? myEvents.map(
          (e) => html`<div class="eventBoard">
            <div class="event-info">
              <img src="${e.imageUrl}" />
              <h2>${e.title}</h2>
              <h6>${e.date}</h6>
              <a href="/details/${e._id}" class="details-button">Details</a>
            </div>
          </div>`
        )
      : html`<div class="no-events">
          <p>This user has no events yet!</p>
        </div>`}
  </div>
</section>`;

export let showProfile = async (ctx) => {
  let userId = JSON.parse(sessionStorage.user)._id;
  let email = JSON.parse(sessionStorage.user).email;
  let myEvents = await getEventsByUserId(userId);
  render(profileTemplate(myEvents, email), document.querySelector('#content'));
};
