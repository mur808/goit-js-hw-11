import './sass/main.scss';
import './sass/main.scss';
import "simplelightbox/dist/simple-lightbox.min.css";
import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import getPictures from './getPictures';
import pictureCard from './pictureCard.hbs';

const MESSAGE_ER = 'Sorry, there are no images matching your search query. Please try again.';
const MESSAGE_INFO = "We're sorry, but you've reached the end of search results.";

const form = document.querySelector('.search-form');
const input = document.querySelector('input');
const gallery = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');
let inputValue = '';
let page;

form.addEventListener('submit', onSearch);
async function onSearch(e) {
    e.preventDefault();
    page = 1;
    gallery.innerHTML = '';
    btnLoadMore.style.display = 'none';
    inputValue = input.value.trim();
    if (inputValue === '') return;
 
    const data = await getPictures(inputValue, page);
      createMarkup(data.hits);
        let lightbox = new SimpleLightbox('.gallery a', { captionDelay: '250ms' }); 
        lightbox.close();
        btnLoadMore.style.display = 'block';
    console.log(data.hits);
    
    if (data.totalHits !== 0) {
        Notify.success(`Hooray! We found ${data.totalHits} images.`);
    }
    if (!data.hits.length) {
        Notify.failure(MESSAGE_ER);
        btnLoadMore.style.display = 'none';
        input.innerHTML = '';
        return;
    }
}

btnLoadMore.addEventListener('click', loadMorePictures);
async function loadMorePictures(e) {
    e.preventDefault();
    page += 1;
    console.log(page);
    const data = await getPictures(inputValue, page);
        createMarkup(data.hits);
        lazyScroll();
        let lightbox = new SimpleLightbox('.gallery a', { captionDelay: '250ms' }); 
        lightbox.close();
        lightbox.refresh();

        if (data.hits.length < 40) {
        Notify.failure(MESSAGE_INFO);
        btnLoadMore.style.display = 'none';
        return;
    }
}

function createMarkup(array) {
    const markup = pictureCard(array);
    gallery.insertAdjacentHTML('beforeend', markup);
}

function lazyScroll() {
        const { height: cardHeight } = document.querySelector(".gallery").firstElementChild.getBoundingClientRect();
        window.scrollBy({
            top: cardHeight * 2,
            behavior: "smooth",
        });
    console.log(cardHeight);
}
