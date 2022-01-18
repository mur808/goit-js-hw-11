import axios from 'axios';
export default async function getPictures(query, page) {
  try {
    const KEY = '22610819-610095abdb962b7788008b666';
    const BASE_URL = 'https://pixabay.com/';
    const response = await axios.get(
      `${BASE_URL}api/?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`,
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}