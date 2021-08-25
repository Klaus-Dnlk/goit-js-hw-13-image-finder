import './sass/main.scss';
import { alert, defaultModules } from '../node_modules/@pnotify/core/dist/PNotify.js';

import ImgApiService from './apiService';
import imgCardTpl from './templates/img-cardTpl.hbs';

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

  if (e.currentTarget.elements.query.value === '') {
    return alert('Something goes wrong');
  }
  clearImageSearchForm();
  imgApiService.query = e.currentTarget.elements.query.value;
  imgApiService.resetPage();
  imgApiService.fetchImages().then(addImageMarkup);
}

// function onLoadMore() {
//   imgApiService.fetchImages().then(images => {
//     addImageMarkup(images);
//     refs.gallery.lastElementChild.scrollIntoView({
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
  rootMargin: '100px',
  // threshold: 0.5,
});
observer.observe(refs.target);
// observer.observe(refs.gallery.lastElementChild);
