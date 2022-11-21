export function updateNotification(err) {
  let notification = document.querySelector('.notification');
  let span = notification.querySelector('span');
  span.innerHTML = err;
  notification.style.display = 'block';

  setTimeout(() => {
    notification.style.display = 'none';
  }, 3000);
}
