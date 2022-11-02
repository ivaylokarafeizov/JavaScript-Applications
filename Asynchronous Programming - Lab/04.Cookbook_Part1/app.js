async function getRecipes() {
  const response = await fetch(
    'http://localhost:3030/jsonstore/cookbook/recipes'
  );
  const recipes = await response.json();
  return Object.values(recipes);
}

async function getRecipeById(id) {
  const response = await fetch(
    'http://localhost:3030/jsonstore/cookbook/details/' + id
  );
  const recipe = await response.json();
  return recipe;
}

function createRecipePreview(recipe) {
  let article = document.createElement('article');
  article.classList.add('preview');

  let divTitle = document.createElement('div');
  divTitle.classList.add('title');

  let h2 = document.createElement('h2');
  h2.textContent = recipe.name;

  let divImage = document.createElement('div');
  divImage.classList.add('small');

  let img = document.createElement('img');
  img.src = recipe.img;

  divImage.appendChild(img);
  divTitle.appendChild(h2);
  article.appendChild(divTitle);
  article.appendChild(divImage);

  article.addEventListener('click', toggleCard);

  return article;

  async function toggleCard() {
    const fullRecipe = await getRecipeById(recipe._id);

    article.replaceWith(createRecipeCard(fullRecipe));
  }
}

window.addEventListener('load', async () => {
  const main = document.querySelector('main');

  const recipes = await getRecipes();
  const cards = recipes.map(createRecipePreview);

  main.innerHTML = '';
  cards.forEach((card) => main.appendChild(card));
});

function createRecipeCard(recipe) {
  let article = document.createElement('article');

  let h2 = document.createElement('h2');
  h2.textContent = recipe.name;
  let divBand = document.createElement('div');
  divBand.classList.add('band');

  let divThumb = document.createElement('div');
  divThumb.classList.add('thumb');
  let divThumbImg = document.createElement('img');
  divThumbImg.src = recipe.img;

  let divIngredients = document.createElement('div');
  divIngredients.classList.add('ingredients');
  let h3 = document.createElement('h3');
  h3.textContent = 'Ingredients:';
  let ingredientsUl = document.createElement('ul');
  recipe.ingredients.map((ingredient) => {
    let li = document.createElement('li');
    li.textContent = ingredient;
    ingredientsUl.appendChild(li);
  });

  let divDescription = document.createElement('div');
  divDescription.classList.add('description');
  let h3Description = document.createElement('h3');
  h3Description.textContent = 'Preparation:';
  divDescription.appendChild(h3Description);
  recipe.steps.map((step) => {
    let p = document.createElement('p');
    p.textContent = step;
    divDescription.appendChild(p);
  });

  divThumb.appendChild(divThumbImg);
  divIngredients.appendChild(h3);
  divIngredients.appendChild(ingredientsUl);
  divBand.appendChild(divThumb);
  divBand.appendChild(divIngredients);
  article.appendChild(h2);
  article.appendChild(divBand);
  article.appendChild(divDescription);

  return article;
}
