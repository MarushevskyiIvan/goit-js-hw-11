import { serviceAPI } from './js/fetchAPI';
import { refs } from './js/refs';
import { galleryMarkup } from './js/markup';
import { onEmptyLineTest } from './js/testsFn';
import { onEmptyArrTest } from './js/testsFn';
import { onTotalHitsTest } from './js/testsFn';

import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const newServiceAPI = new serviceAPI();

refs.form.addEventListener('submit', onSelectSubmit);
refs.loadMoreBtnEl.addEventListener('click', newFetchRequest);

async function onSelectSubmit(evt) {
  try {
    evt.preventDefault();
    newServiceAPI.query = evt.currentTarget.searchQuery.value;

    if (newServiceAPI.query === '') {
      return onEmptyLineTest();
    }

    newServiceAPI.resetPage();

    const result = await newFetchRequest();
    const { hits, totalHits } = result;

    if (hits.length === 0) {
      return onEmptyArrTest();
    }

    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
  } catch {
    Notiflix.Notify.warning(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
}

async function newFetchRequest() {
  try {
    refs.loadMoreBtnEl.classList.add('visually-hidden');

    const response = await newServiceAPI.fetchRequest();
    const result = response.data;
    const resultMarkup = response.data.hits;

    galleryMarkup(resultMarkup);

    lightbox = new SimpleLightbox('.gallery a').refresh();

    refs.loadMoreBtnEl.classList.remove('visually-hidden');

    if (Math.ceil(response.data.totalHits / 40) === newServiceAPI.page) {
      onTotalHitsTest();
    }
    newServiceAPI.incrementPage();

    return result;
  } catch {
    Notiflix.Notify.warning(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
}
