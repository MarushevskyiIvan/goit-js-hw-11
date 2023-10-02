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

refs.form.addEventListener('submit', selectSubmit);
refs.loadMoreBtnEl.addEventListener('click', newFetchRequest);

function selectSubmit(evt) {
  evt.preventDefault();
  newServiceAPI.query = evt.currentTarget.searchQuery.value;

  if (newServiceAPI.query === '') {
    return onEmptyLineTest();
  }

  newServiceAPI.resetPage();
  newFetchRequest().then(({ data }) => {
    if (data.hits.length === 0) {
      return onEmptyArrTest();
    }

    Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
  });
}

function newFetchRequest() {
  refs.loadMoreBtnEl.classList.add('visually-hidden');

  return newServiceAPI
    .fetchRequest()
    .then(response => {
      const result = response.data.hits;
      galleryMarkup(result);

      lightbox = new SimpleLightbox('.gallery a').refresh();

      refs.loadMoreBtnEl.classList.remove('visually-hidden');

      if (Math.ceil(response.data.totalHits / 40) === newServiceAPI.page) {
        onTotalHitsTest();
      }

      newServiceAPI.incrementPage();

      return response;
    })
    .catch(err => {
      Notiflix.Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      ),
        err;
    });
}
