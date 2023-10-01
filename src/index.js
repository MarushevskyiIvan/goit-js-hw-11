import { serviceAPI } from './js/fetch';
import { refs } from './js/refs';
import { galleryMarkup } from './js/markup';

const newServiceAPI = new serviceAPI();

refs.form.addEventListener('submit', selectSubmit);
refs.loadMoreBtnEl.addEventListener('click', newFetchRequest);

function selectSubmit(evt) {
  evt.preventDefault();
  newServiceAPI.query = evt.currentTarget.searchQuery.value;

  if (newServiceAPI.query === '') {
    return alert('Enter the text of the query');
  }

  newServiceAPI.resetPage();
  newFetchRequest();
}

function newFetchRequest() {
  refs.loadMoreBtnEl.classList.add('visually-hidden');

  newServiceAPI
    .fetchRequest()
    .then(response => {
      newServiceAPI.incrementPage();

      const result = response.data.hits;
      galleryMarkup(result);

      if (result.length === 0) {
        throw new Error(result.statusText);
      }

      refs.loadMoreBtnEl.classList.remove('visually-hidden');

      // if (response.data.hits.length * page === response.data.totalHits) {
      //   refs.loadMoreBtnEl.classList.add('visually-hidden');
      //   console.log(
      //     "We're sorry, but you've reached the end of search results."
      //   );
      // }
    })
    .catch(err => {
      console.warn(
        'Sorry, there are no images matching your search query. Please try again.',
        err
      );
    });
}
