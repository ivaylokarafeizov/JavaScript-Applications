export function updateNav() {
  if (sessionStorage.length == 0) {
    [...document.querySelectorAll('.user')].forEach(
      (e) => (e.style.display = 'none')
    );
    [...document.querySelectorAll('.guest')].forEach(
      (e) => (e.style.display = 'inline')
    );
  } else {
    [...document.querySelectorAll('.user')].forEach(
      (e) => (e.style.display = 'inline')
    );
    [...document.querySelectorAll('.guest')].forEach(
      (e) => (e.style.display = 'none')
    );
  }
}
