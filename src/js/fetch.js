import { galleryMarkup } from './markup';
import { refs } from './refs';
const BASE_URL = 'https://pixabay.com/api/';
const KEY = '39756459-c2ffb5d5cd8be2a96a5bc05b0';

export class serviceAPI {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchRequest() {
    return fetch(
      `${BASE_URL}?key=${KEY}&q=${this.searchQuery}&image_type=photo&page=${this.page}&per_page=3`
    )
      .then(response => {
        // if (!response.ok) {
        //   throw new Error(response.status);
        // }
        return response.json();
      })
      .then(result => {
        this.incrementPage();

        return result.hits;
      })
      .catch(err => {
        console.war(
          'Sorry, there are no images matching your search query. Please try again.',
          err
        );
      });
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
