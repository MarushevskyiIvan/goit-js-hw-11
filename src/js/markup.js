import { refs } from './refs';

export function galleryMarkup(evt) {
  const gallery = evt
    .map(
      ({
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
        largeImageURL,
      }) => {
        return `<a href="${largeImageURL}">
        <div class="photo-card">
    <img src="${webformatURL}" alt="${tags}" width="420" height="300" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>Likes<span>${likes}</span></b>
      </p>
      <p class="info-item">
        <b>Views<span>${views}</span></b>
      </p>
      <p class="info-item">
        <b>Comments<span>${comments}</span></b>
      </p>
      <p class="info-item">
        <b>Downloads<span>${downloads}</span></b>
      </p>
    </div>
  </div></a>`;
      }
    )
    .join('');

  refs.galleryDivEl.insertAdjacentHTML('beforeend', gallery);
}
