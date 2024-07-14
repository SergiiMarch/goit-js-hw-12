import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const API_KEY = '44791015-436dd02a5fc0b5187e9b97af9';
const urlApi = 'https://pixabay.com/api/';

export async function fetchImages(query, page) {
  const url = `${urlApi}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=15`;
  try {
    const response = await axios.get(url);
    const data = response.data;

    if (data.hits.length === 0) {
      throw new Error('No images found');
    }

    return data;
  } catch (error) {
    console.error('Error fetching images:', error);

    iziToast.error({
      title: 'Error',
      message: 'Sorry, there was an error fetching images. Please try again!',
    });

    throw error;
  }
}
