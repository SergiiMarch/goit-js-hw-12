import { fetchImages } from './js/pixabay-api';
import { randomMarcup } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const buttonEl = document.querySelector('.button-js');
const divEl = document.querySelector('.js-div');
const inputEl = document.querySelector('.search-js');
let lightbox;

buttonEl.addEventListener('click', onClick);

function onClick(e) {
  e.preventDefault();
  const query = inputEl.value.trim();

  if (query === '') {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search term',
    });
    return;
  }

  showLoader();

  fetchImages(query)
    .then(images => {
      hideLoader();
      randomMarcup(images, divEl);

      if (!lightbox) {
        lightbox = new SimpleLightbox('.gallery-item', {
          captionsData: 'alt',
          captionDelay: 250,
        });
      } else {
        lightbox.refresh();
      }
    })
    .catch(error => {
      hideLoader();
      console.log(error);
    });
}

function showLoader() {
  divEl.innerHTML = '<div class="loader"></div>';
}

function hideLoader() {
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.remove();
  }
}

export { divEl };
