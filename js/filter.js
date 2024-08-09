const POST_COUNT = 10;
const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const filterElement = document.querySelector('.img-filters');
let currentFilter = Filter.DEFAULT;
let posts = [];

const sortRandomly = () => Math.random() - 0.5;

const sortByComments = (postA, postB) =>
  postB.comments.length - postA.comments.length;

const getFilteredPictures = () => {
  switch (currentFilter) {
    case Filter.RANDOM:
      return [...posts].sort(sortRandomly).slice(0, POST_COUNT);
    case Filter.DISCUSSED:
      return [...posts].sort(sortByComments);
    default:
      return [...posts];
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
  posts = [...loadedPictures];
  setOnFilterClick(callback);
};

export{initFilter, getFilteredPictures};
