import { refs } from './refs';
import Notiflix from 'notiflix';

export function onEmptyLineTest() {
  Notiflix.Notify.failure('Enter the text of the query');
}

export function onEmptyArrTest() {
  refs.galleryDivEl.innerHTML = '';
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
  refs.loadMoreBtnEl.classList.add('visually-hidden');
}

export function onTotalHitsTest() {
  Notiflix.Notify.info(
    `We're sorry, but you've reached the end of search results.`
  );
  refs.loadMoreBtnEl.classList.add('visually-hidden');
}
