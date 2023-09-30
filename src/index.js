import axios from 'axios';
import { serviceAPI } from './js/fetch';
import { refs } from './js/refs';
import { galleryMarkup } from './js/markup';

const newServiceAPI = new serviceAPI();

refs.form.addEventListener('submit', selectSubmit);
refs.loadMoreBtnEl.addEventListener('click', onLoadMore);

function selectSubmit(evt) {
  evt.preventDefault();

  newServiceAPI.query = evt.currentTarget.searchQuery.value;
  newServiceAPI.resetPage();
  newServiceAPI.fetchRequest().then(galleryMarkup);
}

function onLoadMore() {
  newServiceAPI.fetchRequest().then(galleryMarkup);
}
