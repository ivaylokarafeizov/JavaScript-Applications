solution();

function solution() {
  fetch('http://localhost:3030/jsonstore/advanced/articles/list')
    .then((response) => response.json())
    .then((data) => {
      data.forEach((article) => {
        const main = document.getElementById('main');
        const accordion = createElement('div', main, '', 'accordion');

        const head = createElement('div', accordion, '', 'head');
        createElement('span', head, article.title, '');
        const button = createElement('button', head, 'More', 'button');
        button.id = article._id;
        button.addEventListener('click', toggle);

        const extra = createElement('div', accordion, '', 'extra');
        extra.style.display = 'none';
        createElement('p', extra);
      });
    })
    .catch((error) => console.log(error.message));
}

function toggle(event) {
  const baseUrl = 'http://localhost:3030/jsonstore/advanced/articles/details/';
  const button = event.currentTarget;
  const extra = button.parentNode.nextSibling;
  const p = extra.querySelector('p');

  fetch(`${baseUrl}${button.id}`)
    .then((response) => response.json())
    .then((data) => {
      p.textContent = data.content;

      if (button.textContent === 'More') {
        button.textContent = 'Less';
        extra.style.display = 'block';
      } else {
        button.textContent = 'More';
        extra.style.display = 'none';
      }
    })
    .catch((error) => console.log(error.message));
}

function createElement(tag, parent, content, className) {
  const element = document.createElement(tag);
  if (content) {
    element.textContent = content;
  }
  if (className) {
    element.className = className;
  }
  parent.appendChild(element);
  return element;
}
