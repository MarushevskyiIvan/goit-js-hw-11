import { refs } from './refs';

export function galleryMarkup(evt) {
  const gallery = evt
    .map(({ webformatURL, tags, likes, views, comments, downloads }) => {
      return `<div class="photo-card">
    <img src="${webformatURL}" alt="${tags}" width="250" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>${likes}</b>
      </p>
      <p class="info-item">
        <b>${views}</b>
      </p>
      <p class="info-item">
        <b>${comments}</b>
      </p>
      <p class="info-item">
        <b>${downloads}</b>
      </p>
    </div>
  </div>`;
    })
    .join('');

  refs.galleryDivEl.insertAdjacentHTML('beforeend', gallery);
}
