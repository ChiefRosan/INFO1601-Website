var modal = document.getElementById('id01');
const searchForm = document.querySelector("form");
const searchResultDiv = document.querySelector(".search-result");
const container = document.querySelector(".container");
let searchQuery = "";
const APP_ID = "d13d4a46";
const APP_key = "4c281c24d25528e1ad78626d77f31c33";
console.log(container)

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector("input").value;
  fetchAPI(); 
});

window.onclick = function(event){
  if(event.target == modal){
    modal.style.display = "none";
  }
}
var counter = 1;
    setInterval(function(){
      document.getElementById('radio' + counter).checked = true;
      counter++;
      if(counter > 4){
        counter = 1;
      }
    }, 5000);

async function fetchAPI() {
  const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=20`;
  const response = await fetch(baseURL);
  const data = await response.json();
  generateHTML(data.hits);
  console.log(data);
}

function generateHTML(results) {
  container.classList.remove("initial");
  let generatedHTML = "";
  results.map((result) => {
    generatedHTML += `
      <div class="item">
        <img src="${result.recipe.image}" alt="img">
        <div class="flex-container">
          <h1>${result.recipe.label}</h1>
        </div>
        <p class="item-data">Cuisine Type: ${result.recipe.cuisineType}</p>
       <p class="item-data">Average Time to Make: ${result.recipe.totalTime} mins</p>
        <p class="item-data">Servings: ${result.recipe.yield}</p>
        <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
       <a class="view-btn" target="_blank" href="${result.recipe.url}">View Recipe</a> 
    </div>
    `;
  });
  searchResultDiv.innerHTML = generatedHTML;
}
