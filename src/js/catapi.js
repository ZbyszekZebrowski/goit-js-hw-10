import axios from "axios";
axios.defaults.headers.common["x-api-key"] = 'live_QoZuWq0Sgx4cFny5HAi2czkbN7Jr8T1suNAfuhuizYhOvfcJbm7UQ2cgPylIEJvY';
 
const BASE_URL = "https://api.thecatapi.com/v1"

export function fetchBreeds() {
    const url = `${BASE_URL}/breeds`;

    return axios.get(url).then(response => response.data);
}

export function fetchCatByBreed(breedId) {
    const baseUrl = `${BASE_URL}/images/search`;
    const PARAMS = new URLSearchParams({ breed_ids: breedId });
    const url = `${baseUrl}?${PARAMS}`;

    return axios.get(url).then(response => response.data);
}
