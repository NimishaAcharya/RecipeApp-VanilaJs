const searchForm = document.querySelector("#form");
const searchResultDiv = document.querySelector(".search-result");
const container = document.querySelector(".container");
const clearText = document.querySelector("#clear");
const searchIcon = document.querySelector("#search-icon");
let searchQuery = "";

const APP_ID = "f3408042";
const APP_KEY = "3452d560e05b08a5072aaf4640190a09";

//clear the text and set focus
clearText.addEventListener("click", () => {
  document.querySelector("input").value = "";
  document.querySelector("input").focus();
});

//add eventlistener for search icon
searchIcon.addEventListener("click", () => {
  searchQuery = document.querySelector("input").value;
  if (searchQuery.trim() === "") return;

  fetchApi();
});

//add eventlistner for form submit - when user press enter
searchForm.addEventListener("submit", e => {
  e.preventDefault();
  searchQuery = e.target.querySelector("input").value;
  if (searchQuery.trim() === "") return;
  fetchApi();
});

//send request to get data from api using fetch()
async function fetchApi() {
  const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}&to=20`;
  const response = await fetch(baseURL);
  const data = await response.json();
  generateHTML(data.hits);
}

//Generating html to display items got from api response
function generateHTML(results) {
  container.classList.remove("initial");
  generatedHTML = "";
  results.map(result => {
    generatedHTML += `
          <div class="item">
            <img src="${result.recipe.image}" alt="" />
            <div class="flex-container">
              <h1 class="title">${result.recipe.label}</h1>
              <a href="${result.recipe.url}" class="view-button" target="_blank" >View Receipe</a>
            </div>
            <p class="item-data"><u>Calories</u>: ${result.recipe.calories.toFixed(2)}</p>
            <p class="item-data"><u>Health Labels</u>: ${result.recipe.healthLabels}</p>
            </div>
        `;
  });
  searchResultDiv.innerHTML = generatedHTML;
}
