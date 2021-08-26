import './sass/main.scss';
import { alert, defaultModules } from '../node_modules/@pnotify/core/dist/PNotify.js';

import ImgApiService from './apiService';
import imgCardTpl from './templates/img-cardTpl.hbs';
import * as basicLightbox from '../node_modules/basiclightbox';

const refs = {
  searchform: document.querySelector('.search-form'),
  loadMoreBtn: document.querySelector('.load-more'),
  gallery: document.querySelector('.gallery'),
  photoCard: document.querySelector('.photo-card'),
  target: document.querySelector('.intersection_target'),
};

const imgApiService = new ImgApiService();

refs.searchform.addEventListener('submit', onSearch);
// refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();

  clearImageSearchForm();
  imgApiService.resetPage();
  if (e.currentTarget.elements.query.value === '') {
    return alert('Something goes wrong');
  }

  imgApiService.query = e.currentTarget.elements.query.value;

  imgApiService.fetchImages().then(addImageMarkup).catch(alert('Invalid input. Please try again.'));
}

// function onLoadMore() {
//   imgApiService.fetchImages().then(addImageMarkup);
//     refs.target.scrollIntoView({
//       behavior: 'smooth',
//       block: 'end',
//     });
//   });
// }

function addImageMarkup(images) {
  refs.gallery.insertAdjacentHTML('beforeend', imgCardTpl(images));
}

function clearImageSearchForm() {
  refs.gallery.innerHTML = '';
}

const onEntry = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && imgApiService.query !== '') {
      imgApiService.fetchImages().then(addImageMarkup);
    }
  });
};
const observer = new IntersectionObserver(onEntry, {
  rootMargin: '50px',
});
observer.observe(refs.target);

// const instance = basicLightbox.create();

// refs.photoCard.addEventListener('click', instance.show);
