function attachEvents() {
  let select = document.querySelector('#posts');
  let btnLoadPosts = document.querySelector('#btnLoadPosts');
  let btnViewPost = document.querySelector('#btnViewPost');
  let title = document.getElementById('post-title');
  let body = document.getElementById('post-body');
  let postComments = document.getElementById('post-comments');

  btnLoadPosts.addEventListener('click', loadPosts);

  function loadPosts() {
    fetch('http://localhost:3030/jsonstore/blog/posts')
      .then((response) => response.json())
      .then((data) => {
        select.innerHTML = '';
        Object.values(data).forEach((post) => {
          let option = document.createElement('option');
          option.value = post.id;
          option.textContent = post.title;

          select.appendChild(option);
        });
        btnViewPost.addEventListener('click', () => viewPosts(data));
      })
      .catch((error) => console.log(error.message));
  }

  function viewPosts(dataSelect) {
    fetch('http://localhost:3030/jsonstore/blog/comments')
      .then((response) => response.json())
      .then((data) => {
        let comments = Object.values(data).filter(
          (obj) => select.value == obj.postId
        );

        let selectedOption = [...select.options].find(
          (o) => o.value == select.value
        );

        title.textContent = selectedOption.textContent;
        body.textContent = dataSelect[select.value].body;

        postComments.innerHTML = '';
        comments.forEach((comment) => {
          let li = document.createElement('li');
          li.id = comment.id;
          li.textContent = comment.text;

          postComments.appendChild(li);
        });
      })
      .catch((error) => console.log(error.message));
  }
}

attachEvents();
