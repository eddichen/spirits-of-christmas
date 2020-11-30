import VanillaModal from 'vanilla-modal';
import Snowflakes from 'magic-snowflakes';

const modal = new VanillaModal();
const snowflakes = new Snowflakes({
  color: '#fff',
  maxSize: 50
});

const app = document.querySelector('.app');
const cocktailContainer = document.querySelector('.modal-content');

// List of cocktails by id
const cocktailList = [
  '12188',
  '12988',
  '12224',
  '12944',
  '178321',
  '17211',
  '11004',
  '178322',
  '11001',
  '178325',
  '178337',
  '17233',
  '12442',
  '17210',
  '11008',
  '17194',
  '17196',
  '12214',
  '12097',
  '11025',
  '178333',
  '17177',
  '15941',
  '11113'
];

const glassList = {
  "collins glass": "icon-noun_Zombie-Glass_206095",
  "irish coffee cup": "icon-noun_irish-coffee-glass_206077",
  "highball glass": "icon-noun_Highball-glass_206075",
  "cocktail glass": "icon-noun_Martini-Glass_206072",
  "old-fashioned glass": "icon-noun_Old-Fashion-Tumbler_206080",
  "wine glass": "icon-noun_white-wine-glass_206096",
  "cordial glass": "icon-noun_cordial-glass_206068",
  "hurricane glass": "icon-noun_hurricane-glass_206076"
};

// Render the initial state of the calendar
const renderCalendar = () => {
  let calendarGrid = '';

  for (let i=1; i <= cocktailList.length; i++) {
    calendarGrid += `<a href="#modal-1" class="grid-item" data-modal-open data-item="${i}">${i}</a>`;
  }
  app.innerHTML = calendarGrid;
};

const getIngredients = (cocktail) => {
  let ingredients = '';
  for (let i=1; i<=15; i++) {
    const ingredient = 'strIngredient' + i;
    const measure = 'strMeasure' + i;
    if (cocktail[ingredient] === null || cocktail[measure] === null) {
      return ingredients;
    }
    
    ingredients += `<li class="content__list-item"><strong>${cocktail[ingredient]}</strong> ${cocktail[measure]}</li>`;
  }
}

const getMethod = (instructions) => {
  let listItems = '';
  const instructionsArray = instructions.split('.');
  
  for (let i=0; i < instructionsArray.length - 1; i+=1) {
    listItems += `<li class="content__list-item">${instructionsArray[i]}</li>`;
  }
  
  return listItems;
};

const getGlass = (glass) => {
  const glassFormatted = glass.toLowerCase();
  if (glassFormatted in glassList) {
    return glassList[glassFormatted];
  }
};

const renderCocktail = (cocktail) => {
  const recipe = `
    <div class="img-container">
      <img src="${cocktail.strDrinkThumb}" alt="${cocktail.strDrink}" class="img" />
    </div>
    <div class="content">
      <h2 class="content__heading">${cocktail.strDrink}</h2>
      <div class="content__2col-layout">
        <div class="col-1 ingredients">
          <h3 class="content__subheading">Ingredients</h3>
          <ul class="content__list content__list--none">${getIngredients(cocktail)}</ul>
        </div>
        <div class="col-2 glass">
          <h3 class="content__subheading">Glass</h3>
          <i class="glass__icon ${getGlass(cocktail.strGlass)}" title="${cocktail.strGlass}"></i>
        </div>
      </div>
      <h3 class="content__subheading">Method</h3>
      <ol class="content__list">${getMethod(cocktail.strInstructions)}</ol>
    </div>
  `;
  cocktailContainer.innerHTML = recipe;
}

// Handle when a user clicks on a calendar date
const handleClick = (e) => {
  const calendarDate = e.target.dataset.item;
  if (calendarDate) {
    getCocktail(cocktailList[calendarDate - 1]);
  };
};

const getCocktail = cocktail => {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktail}`)
     .then(response => {
     if (response.ok) {
       return response.json();
     }
     else {
       return Promise.reject(response);
     }
  })
    .then(data => {
    renderCocktail(data.drinks[0]);
  })
    .catch(error => {
    console.error('There was an error fetching cocktails', error);
  })
};

renderCalendar();

document.addEventListener('click', e => handleClick(e));
