export default function getRefs() {
  return {
    searchform: document.querySelector('.search-form'),
    loadMoreBtn: document.querySelector('.load-more'),
    gallery: document.querySelector('.gallery'),
    photoCard: document.querySelector('.photo-card'),
    bigImageLink: document.querySelector('.photo_card_link'),
    target: document.querySelector('.intersection_target'),
  };
}
