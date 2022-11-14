import { html, render } from '../node_modules/lit-html/lit-html.js';

fetch('http://localhost:3030/jsonstore/advanced/table')
  .then((res) => res.json())
  .then((data) => {
    let studentsTemplate = html`${Object.values(data).map(
      (s) =>
        html`<tr>
          <td>${s.firstName} ${s.lastName}</td>
          <td>${s.email}</td>
          <td>${s.course}</td>
        </tr>`
    )}`;

    render(studentsTemplate, document.querySelector('tbody'));
  });

document.querySelector('#searchBtn').addEventListener('click', () => {
  let searchField = document.getElementById('searchField');
  let rows = document.querySelectorAll('tbody tr');
  let searchTerm = searchField.value.toLowerCase();

  for (const row of rows) {
    row.classList.remove('select');

    if (row.innerHTML.toLowerCase().includes(searchTerm) && searchTerm) {
      row.classList.add('select');
    }
  }

  searchField.value = '';
});
