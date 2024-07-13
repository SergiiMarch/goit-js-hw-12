import { divEl } from '../main';

function clearDivEl() {
  divEl.innerHTML = '';
}

function randomMarkup(images) {
  clearDivEl();
  let galleryMarkup = '';
  images.forEach(image => {
    const galleryItem = `
      <div class="card">
        <a href="${image.largeImageURL}" class="gallery-item">
          <div class="card-img-top">
            <img src="${image.webformatURL}" alt="${image.tags}">
          </div>
        </a>
        <div class="card-text">
          <p>Likes: ${image.likes}</p>
          <p>Views: ${image.views}</p>
          <p>Comments: ${image.comments}</p>
          <p>Downloads: ${image.downloads}</p>
        </div>
      </div>`;
    galleryMarkup += galleryItem;
  });
  divEl.insertAdjacentHTML('beforeend', galleryMarkup);
}

export { randomMarkup, clearDivEl };
