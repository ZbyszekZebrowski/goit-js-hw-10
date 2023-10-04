import { fetchBreeds, fetchCatByBreed } from './catapi.js';

document.addEventListener("DOMContentLoaded", function () {
  const selectElement = document.querySelector(".breed-select");
  selectElement.addEventListener("change", onCatBreedsElChange);
  const loaderElement = document.querySelector(".loader");
  const errorElement = document.querySelector(".error");

 
  loaderElement.style.display = "block";
  errorElement.style.display = "none";

  fetchBreeds()
    .then((breeds) => {
      populateBreedsSelect(breeds);
     
      loaderElement.style.display = "none";
    })
    .catch((error) => {
      showError(error);
    
      loaderElement.style.display = "none";
      errorElement.style.display = "block";
    });
});

function populateBreedsSelect(breeds) {
  const selectElement = document.querySelector(".breed-select");

  breeds.forEach((breed) => {
    const option = document.createElement("option");
    option.value = breed.id;
    option.textContent = breed.name;
    selectElement.appendChild(option);
  });
}

function onCatBreedsElChange() {
  const selectElement = document.querySelector(".breed-select");
  const selectedBreedId = selectElement.value;
  const loaderElement = document.querySelector(".loader");
  const errorElement = document.querySelector(".error");

  
  loaderElement.style.display = "block";
  errorElement.style.display = "none";

  fetchCatByBreed(selectedBreedId)
    .then((cats) => {
      displayCatInfo(cats[0]);
     
      loaderElement.style.display = "none";
    })
    .catch((error) => {
      showError(error);
     
      loaderElement.style.display = "none";
      errorElement.style.display = "block";
    });
}

function displayCatInfo(cat) {
  const catInfoContainer = document.querySelector(".cat-info");
  catInfoContainer.innerHTML = "";

  const catImage = document.createElement("img");
  catImage.src = cat.url;
  catInfoContainer.appendChild(catImage);

  const catName = document.createElement("h2");
  catName.textContent = `Breed: ${cat.breeds[0].name}`;
  catInfoContainer.appendChild(catName);

  const catDescription = document.createElement("p");
  catDescription.textContent = `Description: ${cat.breeds[0].description}`;
  catInfoContainer.appendChild(catDescription);

  const catTemperament = document.createElement("p");
  catTemperament.textContent = `Temperament: ${cat.breeds[0].temperament}`;
  catInfoContainer.appendChild(catTemperament);
}

function showError(error) {
  const errorElement = document.querySelector(".error");
  errorElement.textContent = "Oops! Something went wrong! Try reloading the page!";
  console.error("Error:", error);
}
