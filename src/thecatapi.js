import axios from "axios";

axios.defaults.headers.common["x-api-key"] =
  "live_QoZuWq0Sgx4cFny5HAi2czkbN7Jr8T1suNAfuhuizYhOvfcJbm7UQ2cgPylIEJvY";

const API_BASE_URL = "https://api.thecatapi.com/v1";

export function fetchBreeds() {
  const url = `${API_BASE_URL}/breeds`;

  return axios
    .get(url)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching breeds:", error);
      return [];
    });
}

export function fetchCatByBreed(breedId) {
  const url = `${API_BASE_URL}/images/search?breed_ids=${breedId}`;

  return axios
    .get(url)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching cat by breed:", error);
      throw error; // Передаємо помилку далі для обробки в UI
    });
}

document.addEventListener("DOMContentLoaded", function () {
  const selectElement = document.querySelector(".breed-select");
  selectElement.addEventListener("change", onCatBreedsElChange);

  fetchBreeds()
    .then((breeds) => {
      populateBreedsSelect(breeds);
    })
    .catch((error) => {
      console.error("Error fetching breeds:", error);
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

  fetchCatByBreed(selectedBreedId)
    .then((cats) => {
      displayCatInfo(cats[0]); 
    })
    .catch((error) => {
      console.error("Error fetching cat by breed:", error);
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