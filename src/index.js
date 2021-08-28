import './sass/main.scss';
import { alert, defaultModules } from '../node_modules/@pnotify/core/dist/PNotify.js';

import ImgApiService from './apiService';
import imgCardTpl from './templates/img-cardTpl.hbs';
import getRefs from './refs';

import * as basicLightbox from '../node_modules/basiclightbox/dist/basicLightbox.min.js';

const refs = getRefs();
const imgApiService = new ImgApiService();

refs.searchform.addEventListener('submit', onSearch);

refs.gallery.addEventListener('click', OnBigImg);

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

function OnBigImg(e) {
  const imgBigUrl = e.target.dataset.big;
  console.log(e.target.dataset);
  basicLightbox
    .create(
      `<div class="modal">
  <img width="1200" src="${imgBigUrl}">
      </div>
`,
    )
    .show();
}

function addImageMarkup(images) {
  refs.gallery.insertAdjacentHTML('beforeend', imgCardTpl(images));
}

function clearImageSearchForm() {
  refs.gallery.innerHTML = '';
}

const onObserberEntry = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && imgApiService.query !== '') {
      imgApiService.fetchImages().then(addImageMarkup);
    }
  });
};
const observer = new IntersectionObserver(onObserberEntry, {
  rootMargin: '50px',
});
observer.observe(refs.target);
