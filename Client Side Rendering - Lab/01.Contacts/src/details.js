export function toggleDetails(e) {
  let infoDiv = e.target.parentNode;
  let detailsDiv = infoDiv.querySelector('div.details');

  detailsDiv.style.display =
    detailsDiv.style.display == 'block' ? 'none' : 'block';
}
