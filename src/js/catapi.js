import axios from "axios";
axios.defaults.headers.common["x-api-key"] = 'live_QoZuWq0Sgx4cFny5HAi2czkbN7Jr8T1suNAfuhuizYhOvfcJbm7UQ2cgPylIEJvY';

export function fetchBreeds() {
    const url = 'https://api.thecatapi.com/v1/breeds';

    return axios.get(url).then(response => response.data);
}

export function fetchCatByBreed(breedId) {
    const baseUrl = 'https://api.thecatapi.com/v1/images/search';
    const PARAMS = new URLSearchParams({ breed_ids: breedId });
    const url = `${baseUrl}?${PARAMS}`;

    return axios.get(url).then(response => response.data);
}
