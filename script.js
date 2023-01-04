const search = document.getElementById('search');
const submit = document.getElementById('submit');
const random = document.getElementById('random');
const resultHeading = document.getElementById('result-heading');
const meals = document.getElementById('meals');
const singleMealEl = document.getElementById('single-meal');


submit.addEventListener('click', (e) => {
  e.preventDefault();
  
  singleMealEl.innerHTML = '';

  // Get search term
  const term = search.value;

  // Check for empty
  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);

        resultHeading.innerHTML = `<h2>Search results for ${term}:</h2>`;

        if (data.meals === null) {
          resultHeading.innerHTML = '<p>No meal found</p>'
        } else {
          meals.innerHTML = data.meals
          .map(
            meal => `
          <div class="meal">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
            <div data-mealID="${meal.idMeal}">
              <h3>${meal.strMeal}</h3>
            </div>
          </div>
        `
          )
          .join('');
        }
      });
  }
});