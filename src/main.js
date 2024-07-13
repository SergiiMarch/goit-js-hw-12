import { fetchImages } from './js/pixabay-api';
import { randomMarkup, clearDivEl } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const buttonEl = document.querySelector('.button-js');
const divEl = document.querySelector('.js-div');
const inputEl = document.querySelector('.search-js');
const loadMoreBtn = document.querySelector('.load-more');

let lightbox;
let currentPage = 1;
let currentQuery = '';
let totalHits = 0;

buttonEl.addEventListener('click', onClick);

async function onClick(e) {
  e.preventDefault();
  const query = inputEl.value.trim();
  currentPage = 1;

  if (query === '') {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search term',
    });
    return;
  }

  currentQuery = query;

  try {
    const data = await fetchImages(currentQuery, currentPage);
    totalHits = data.totalHits;
    clearDivEl();
    randomMarkup(data.hits);
    if (data.hits.length < 15 || currentPage * 15 >= totalHits) {
      loadMoreBtn.style.display = 'none';
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
      });
    } else {
      loadMoreBtn.style.display = 'block';
    }

    lightbox = new SimpleLightbox('.gallery-item', {
      captionsData: 'alt',
      captionDelay: 250,
    });
  } catch (error) {
    console.error('Error fetching and rendering images:', error);
  }
}

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;

  try {
    const data = await fetchImages(currentQuery, currentPage);
    randomMarkup(data.hits);
    if (currentPage * 15 >= totalHits) {
      loadMoreBtn.style.display = 'none';
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }

    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    lightbox.refresh();
  } catch (error) {
    console.error('Error fetching and rendering images:', error);
  }
});

export { divEl };
