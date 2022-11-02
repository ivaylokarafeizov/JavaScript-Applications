async function lockedProfile() {
  let mainSection = document.querySelector('#main');

  let response = await fetch(
    'http://localhost:3030/jsonstore/advanced/profiles'
  );
  let data = await response.json();

  let profileDiv = document.querySelector('.profile');

  Object.values(data).forEach((person) => {
    const profile = profileDiv.cloneNode(true);
    mainSection.appendChild(editProfile(profile, person));
  });
  mainSection.children[0].remove();

  function editProfile(profile, data) {
    profile.querySelector('input[name="user1Username"]').value = data.username;
    profile.querySelector('input[name="user1Email"]').value = data.email;
    profile.querySelector('input[name="user1Age"]').value = data.age;
    profile.querySelector('input[name="user1Age"]').type = 'email';

    const div = profile.getElementsByClassName('user1Username')[0];
    div.className = '';
    div.id = 'user1HiddenFields';
    div.style.display = 'none';

    profile.querySelector('button').addEventListener('click', showMore);
    return profile;
  }

  function showMore(e) {
    const profile = e.currentTarget.parentNode;
    const unlock = profile.querySelector('input[value="unlock"]').checked;

    if (unlock) {
      if (e.currentTarget.textContent == 'Show more') {
        profile.querySelector('#user1HiddenFields').style.display = 'block';
        e.currentTarget.textContent = 'Hide it';
      } else {
        profile.querySelector('#user1HiddenFields').style.display = 'none';
        e.currentTarget.textContent = 'Show more';
      }
    }
  }
}

// function lockedProfile() {
//   let mainSection = document.querySelector('#main');

//   fetch('http://localhost:3030/jsonstore/advanced/profiles')
//     .then((response) => response.json())
//     .then((data) => {
//       let profileDiv = document.querySelector('.profile');

//       Object.values(data).forEach((person) => {
//         const profile = profileDiv.cloneNode(true);
//         mainSection.appendChild(editProfile(profile, person));
//       });
//       mainSection.children[0].remove();
//     });

//   function editProfile(profile, data) {
//     profile.querySelector('input[name="user1Username"]').value = data.username;
//     profile.querySelector('input[name="user1Email"]').value = data.email;
//     profile.querySelector('input[name="user1Age"]').value = data.age;
//     profile.querySelector('input[name="user1Age"]').type = 'email';

//     const div = profile.getElementsByClassName('user1Username')[0];
//     div.className = '';
//     div.id = 'user1HiddenFields';
//     div.style.display = 'none';

//     profile.querySelector('button').addEventListener('click', showMore);
//     return profile;
//   }

//   function showMore(e) {
//     const profile = e.currentTarget.parentNode;
//     const unlock = profile.querySelector('input[value="unlock"]').checked;

//     if (unlock) {
//       if (e.currentTarget.textContent == 'Show more') {
//         profile.querySelector('#user1HiddenFields').style.display = 'block';
//         e.currentTarget.textContent = 'Hide it';
//       } else {
//         profile.querySelector('#user1HiddenFields').style.display = 'none';
//         e.currentTarget.textContent = 'Show more';
//       }
//     }
//   }
// }
