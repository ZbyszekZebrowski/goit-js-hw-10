import { fetchBreeds, fetchCatByBreed } from "./thecatapi";
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const refs = {
    catBreedsEl: document.querySelector('.breed-select'),
    catInfoWrapper: document.querySelector('.cat-info'),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error'),
    catSlimSelectWrapper: document.querySelector('.ss-main.breed-select'),
}


function getCatBreed(cat) {
    return `<option value="${cat.id}">${cat.name}</option>`;
}

function renderCatsBreedsList(cats) {
    let catsList;
    for (let i = 0; i < cats.length; i++) {
       catsList += getCatBreed(cats[i]);        
    }
    return catsList;
}

function addCats() {
    fetchBreeds().then(cats => {
 
        refs.catBreedsEl.innerHTML = renderCatsBreedsList(cats);
        new SlimSelect({
            select: '#ace'
        });
        refs.catSlimSelectWrapper = document.querySelector('.ss-main.breed-select');
    }).catch(() => {
        refs.catBreedsEl.classList.add('js-hidden');
        refs.catSlimSelectWrapper.classList.add('js-hidden');
        refs.loader.classList.add('js-hidden');
        refs.error = document.querySelector('.js-hidden');
        Notiflix.Notify.failure(refs.error.classList.remove('js-hidden'));  
    });
}
addCats();


function getCatCard(breed, url) {
    return `<img class="cat" id=${breed.id}
        src=${url}
        alt=${breed.alt_names}
        height=300
      />
      <h1 class="cat-name">${breed.name}</h1>
      <p class="cat-description">
  ${breed.description}
      </p>
      <p class="cat-temp">
        <span class="temperament">Temperament: </span>${breed.temperament}
      </p>`;
}

refs.catBreedsEl.addEventListener('change', onCatBreedsElChange);

function onCatBreedsElChange(event) {
    const breedId = event.target.value;
    refs.catBreedsEl.classList.add('js-hidden');
    refs.catSlimSelectWrapper.classList.add('js-hidden');
    refs.loader.classList.remove('js-hidden');
    
    fetchCatByBreed(breedId).then(catData => {
        refs.catInfoWrapper.innerHTML = getCatCard(catData[0].breeds[0], catData[0].url);
        refs.loader.classList.add('js-hidden');
        refs.catBreedsEl.classList.remove('js-hidden');
        refs.catSlimSelectWrapper.classList.remove('js-hidden');
    }).catch(() => {
        refs.catBreedsEl.classList.add('js-hidden');
        refs.catSlimSelectWrapper.classList.add('js-hidden');
        refs.loader.classList.add('js-hidden');
        Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!'); 
    
    });
};