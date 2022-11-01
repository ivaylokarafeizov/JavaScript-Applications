function solve() {
  let infoText = document.querySelector('.info');
  let departBtn = document.querySelector('#depart');
  let arriveBtn = document.querySelector('#arrive');

  let busStop = {
    next: 'depot',
  };

  function depart() {
    departBtn.disabled = true;
    arriveBtn.disabled = false;

    fetch(`//localhost:3030/jsonstore/bus/schedule/${busStop.next}`)
      .then((response) => response.json())
      .then((data) => {
        busStop = Object.assign(data);
        infoText.textContent = `Next stop ${busStop.name}`;
      })
      .catch(() => {
        infoText.textContent = 'Error!';
      });
  }

  // async function depart() {
  //   departBtn.disabled = true;
  //   arriveBtn.disabled = false;

  //   try {
  //     let response = await fetch(
  //       `//localhost:3030/jsonstore/bus/schedule/${busStop.next}`
  //     );
  //     let data = await response.json();

  //     busStop = Object.assign(data);
  //     infoText.textContent = `Next stop ${busStop.name}`;
  //   } catch (error) {
  //     infoText.textContent = 'Error!';
  //   }
  // }

  function arrive() {
    arriveBtn.disabled = true;
    departBtn.disabled = false;

    infoText.textContent = `Arriving at ${busStop.name}`;
  }

  return {
    depart,
    arrive,
  };
}

let result = solve();
