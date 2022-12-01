export function updateNav() {
  if (sessionStorage.length == 0) {
    [...document.querySelectorAll('.user')].forEach(
      (e) => (e.style.display = 'none')
    );
    [...document.querySelectorAll('.guest')].forEach(
      (e) => (e.style.display = 'block')
    );
  } else {
    [...document.querySelectorAll('.user')].forEach(
      (e) => (e.style.display = 'block')
    );
    [...document.querySelectorAll('.guest')].forEach(
      (e) => (e.style.display = 'none')
    );
  }
}
