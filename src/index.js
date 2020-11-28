//user click on a square
//if the date is the the current date or in the past
//true: allow the cocktail to display false: don't allow the cocktail to display
//open a modal window, display the cocktail, ingredients and recipe
import VanillaModal from 'vanilla-modal';

const modal = new VanillaModal();

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
  '15941'
];

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
  console.log('cocktail', cocktail);
  for (let i=1; i<=15; i++) {
    const ingredient = 'strIngredient' + i;
    const measure = 'strMeasure' + i;
    if (cocktail[ingredient] === null || cocktail[measure] === null) {
      return ingredients;
    }
    
    ingredients += `<li><strong>${cocktail[ingredient]}</strong> ${cocktail[measure]}</li>`;
  }
}

const getMethod = (instructions) => {
  console.log(instructions.split('.'));
  let listItems = '';
  const instructionsArray = instructions.split('.');
  
  for (let i=0; i < instructionsArray.length - 1; i+=1) {
    listItems += `<li>${instructionsArray[i]}</li>`;
  }
  
  return listItems;
};

const renderCocktail = (cocktail) => {
  console.log(cocktail);
  const recipe = `
    <img src="${cocktail.strDrinkThumb}" alt="${cocktail.strDrink}" />
    <h2>${cocktail.strDrink}</h2>
    <h3>Ingredients</h3>
    <ul>${getIngredients(cocktail)}</ul>
    <h3>Glass</h3>
    <p>${cocktail.strGlass}</p>
    <h3>Method</h3>
    <ol>${getMethod(cocktail.strInstructions)}</ol>
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
    console.log('data', data);
    renderCocktail(data.drinks[0]);
  })
    .catch(error => {
    console.error('There was an error fetching cocktails', error);
  })
};

renderCalendar();

document.addEventListener('click', e => handleClick(e));
