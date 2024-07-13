const API_KEY = '44791015-436dd02a5fc0b5187e9b97af9';
const urlApi = 'https://pixabay.com/api/';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export function fetchImages(query) {
  const url = `${urlApi}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`;

  return fetch(url)
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then(data => {
      if (data.hits.length === 0) {
        throw new Error('No images found');
      }
      return data.hits;
    })
    .catch(error => {
      console.log(error);
      iziToast.error({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    });
}
