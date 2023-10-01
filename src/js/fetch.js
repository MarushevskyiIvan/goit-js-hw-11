import axios from 'axios';
import { galleryMarkup } from './markup';
import { refs } from './refs';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '39756459-c2ffb5d5cd8be2a96a5bc05b0';

export class serviceAPI {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.per_page = 40;
    this.safesearch = true;
    this.orientation = 'horizontal';
    this.image_type = 'photo';
  }

  async fetchRequest() {
    return await axios.get(
      `${BASE_URL}?key=${KEY}&q=${this.searchQuery}&image_type=${this.image_type}&orientation=${this.orientation}&safesearch=${this.safesearch}&page=${this.page}&per_page=${this.per_page}`
    );
  }

  resetPage() {
    this.page = 1;
    refs.form.reset();
    refs.galleryDivEl.innerHTML = '';
  }

  incrementPage() {
    this.page += 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
