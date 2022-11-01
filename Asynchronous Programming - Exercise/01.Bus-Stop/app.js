async function getInfo() {
  const stopId = document.querySelector('input[id="stopId"]').value;
  const stopName = document.querySelector('#stopName');
  const busesUl = document.querySelector('#buses');

  try {
    const response = await fetch(
      `http://localhost:3030/jsonstore/bus/businfo/${stopId}`
    );

    const data = await response.json();
    stopName.textContent = data.name;

    busesUl.innerHTML = '';
    Object.entries(data.buses).forEach(([busId, time]) => {
      let li = document.createElement('li');
      li.textContent = `Bus ${busId} arrives in ${time} minutes`;
      busesUl.appendChild(li);
    });
  } catch (error) {
    stopName.textContent = 'Error';
    busesUl.innerHTML = '';
  }

  /**
   * fetch(`http://localhost:3030/jsonstore/bus/businfo/${stopId}`)
   * .then((response) => response.json())
   * .then((data) => {
   *   stopName.textContent = data.name;
   *
   *   busesUl.innerHTML = '';
   *   Object.entries(data.buses).forEach(([busId, time]) => {
   *     let li = document.createElement('li');
   *     li.textContent = `Bus ${busId} arrives in ${time} minutes`;
   *     busesUl.appendChild(li);
   *   });
   * })
   * .catch(() => {
   *   stopName.textContent = 'Error';
   *   busesUl.innerHTML = '';
   * });
   */
}
