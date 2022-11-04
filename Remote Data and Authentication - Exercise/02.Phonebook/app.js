function attachEvents() {
  let person = document.querySelector('#person');
  let phone = document.querySelector('#phone');
  let phoneBookUl = document.querySelector('#phonebook');
  let url = 'http://localhost:3030/jsonstore/phonebook';

  document.querySelector('#btnLoad').addEventListener('click', loadRecords);
  document.querySelector('#btnCreate').addEventListener('click', createRecord);

  async function loadRecords() {
    phoneBookUl.replaceChildren();

    try {
      let response = await fetch(url);

      if (response.status != 200) {
        throw new Error('Error');
      }

      let data = await response.json();
      Object.values(data).forEach((p) => {
        let li = document.createElement('li');
        li.textContent = `${p.person}: ${p.phone}`;
        let deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.setAttribute('id', p._id);
        deleteBtn.addEventListener('click', () => deleteRecord(p._id));
        li.appendChild(deleteBtn);
        phoneBookUl.appendChild(li);
      });
    } catch (err) {
      alert('Error retrieving data');
    }
  }

  async function createRecord() {
    try {
      let response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          person: person.value.trim(),
          phone: phone.value.trim(),
        }),
      });

      if (response.status != 200) {
        throw new Error('Error');
      }

      loadRecords();
    } catch (err) {
      alert('Error sending data');
    }

    person.value = '';
    phone.value = '';
  }

  async function deleteRecord(id) {
    try {
      let response = await fetch(`${url}/${id}`, {
        method: 'DELETE',
      });

      if (response.status != 200) {
        throw new Error('Error');
      }

      loadRecords();
    } catch (err) {
      alert('Error sending data');
    }
  }
}

attachEvents();
