import { render } from '../../node_modules/lit-html/lit-html.js';

let homeTemplate = '';

export function showHome(ctx) {
  render(homeTemplate, document.querySelector('#main-content'));
}
