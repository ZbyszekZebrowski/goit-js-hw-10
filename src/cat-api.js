import axios from "axios";

const breedSelect = document.querySelector(".breed-select");
const loader = document.querySelector(".loader");
const error = document.querySelector(".error");
const catInfoDiv = document.querySelector(".cat-info");

const apiKey = "ваш_ключ_сюди";

axios.defaults.headers.common["x-api-key"] = apiKey;

async function fetchBreeds() {
  try {
    const response = await axios.get("https://api.thecatapi.com/v1/breeds");
    return response.data;
  } catch (err) {
    console.error(err);
    showError("Помилка завантаження порід котів.");
    throw err;
  }
}

async function fetchCatByBreed(breedId) {
  try {
    const response = await axios.get(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
    );
    return response.data;
  } catch (err) {
    console.error(err);
    showError("Помилка завантаження інформації про кота.");
    throw err;
  }
}

function showError(message) {
  error.textContent = message;
  error.style.display = "block";
}


function clearCatInfo() {
  catInfoDiv.innerHTML = "";
  catInfoDiv.style.display = "none";
}


function displayCatInfo(cat) {
  const catImage = document.createElement("img");
  catImage.src = cat.url;

  const catName = document.createElement("p");
  catName.textContent = `Назва породи: ${cat.breeds[0].name}`;

  const catDescription = document.createElement("p");
  catDescription.textContent = `Опис: ${cat.breeds[0].description}`;

  const catTemperament = document.createElement("p");
  catTemperament.textContent = `Темперамент: ${cat.breeds[0].temperament}`;

  catInfoDiv.appendChild(catImage);
  catInfoDiv.appendChild(catName);
  catInfoDiv.appendChild(catDescription);
  catInfoDiv.appendChild(catTemperament);
  catInfoDiv.style.display = "block";
}


window.addEventListener("load", async () => {
  try {
    loader.style.display = "block";
    const breeds = await fetchBreeds();
    breeds.forEach((breed) => {
      const option = document.createElement("option");
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });
  } catch (err) {
  
  } finally {
    loader.style.display = "none";
  }
});


breedSelect.addEventListener("change", async (event) => {
  const selectedBreedId = event.target.value;
  if (selectedBreedId) {
    clearCatInfo();
    loader.style.display = "block";
    try {
      const [cat] = await fetchCatByBreed(selectedBreedId);
      displayCatInfo(cat);
    } catch (err) {
      
    } finally {
      loader.style.display = "none";
    }
  } else {
    clearCatInfo();
  }
});
