export function search() {
  document.querySelector('button').addEventListener('click', onClick);

  function onClick() {
    let input = document.getElementById('searchText');
    let result = document.getElementById('result');
    let towns = document.getElementById('towns');
    let liElements = Array.from(towns.querySelectorAll('li'));
    let matches = 0;

    if (!input.value) {
      return;
    } else {
      for (const liElement of liElements) {
        liElement.removeAttribute('class', 'active');

        if (liElement.textContent.includes(input.value)) {
          liElement.setAttribute('class', 'active');

          matches++;
        }
      }

      result.textContent = `${matches} matches found`;
      input.value = '';
    }
  }
}
