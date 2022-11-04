let url = 'http://localhost:3030/jsonstore/collections/students';
let table = document.querySelector('#results tbody');
let form = document.querySelector('form');

window.addEventListener('load', loadStudents);
form.addEventListener('submit', addStudent);

async function loadStudents() {
  try {
    let response = await fetch(url);

    if (response.status != 200) {
      throw new Error('Error');
    }

    let data = await response.json();
    Object.values(data).forEach((r) => {
      let student = createElement(
        'tr',
        createElement('td', r.firstName),
        createElement('td', r.lastName),
        createElement('td', r.facultyNumber),
        createElement('td', r.grade)
      );
      table.appendChild(student);
    });
  } catch (err) {
    alert('Error fetching data');
  }
}

async function addStudent(e) {
  e.preventDefault();

  let dataForm = new FormData(form);
  let infoArr = [...dataForm.values()];
  table.replaceChildren();

  try {
    let response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: infoArr[0],
        lastName: infoArr[1],
        facultyNumber: infoArr[2],
        grade: infoArr[3],
      }),
    });

    if (response.status != 200) {
      throw new Error('Error');
    }

    loadStudents();
  } catch (err) {
    alert('Error fetching data');
  }
}

function createElement(type, ...content) {
  let element = document.createElement(type);

  content.forEach((c) => {
    if (typeof c === 'number' || typeof c == 'string') {
      c = document.createTextNode(c);
    }
    element.appendChild(c);
  });

  return element;
}
