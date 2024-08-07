const POST_COUNT = 10;
const filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const filterElement = document.querySelector('.img-filters');
//const postContainer = document.querySelector('.pictures');
let currentFilter = filter.DEFAULT;
let post = [];

const sortRandomly = () => Math.random() - 0.5;

const sortByComments = (postA, postB) =>
  postB.comments.length - postA.comments.length;

const getFilteredPictures = () => {
  switch (currentFilter) {
    case filter.RANDOM:
      return [...post].sort(sortRandomly).slice(0, POST_COUNT);
    case filter.DISCUSSED:
      return [...post].sort(sortByComments);
    default:
      return [...post];
  }
};

const setOnFilterClick = (callback) => {
  filterElement.addEventListener('click', (evt) => {

    if(evt.target.closest('.img-filters__button')){
      const clickedButton = evt.target;
      filterElement.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
      clickedButton.classList.add('img-filters__button--active');

      if(clickedButton.id === currentFilter && currentFilter !== 'filter-random'){
        return;
      }

      currentFilter = clickedButton.id;
      callback(getFilteredPictures());

    }
  });
};

const initFilter = (loadedPictures, callback) => {
  filterElement.classList.remove('img-filters--inactive');
  post = [...loadedPictures];
  setOnFilterClick(callback);
};

export{initFilter, getFilteredPictures};
