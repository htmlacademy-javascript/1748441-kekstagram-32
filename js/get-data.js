import { renderPosts } from './render-posts.js';
import { getData } from './api.js';

let dataPost = [];

function onLoadError(){
  const errorTemplate = document.querySelector('#data-error').content.querySelector('.data-error').cloneNode(true);
  document.querySelector('body').appendChild(errorTemplate);
}

getData()
  .then((data) => {
    dataPost = data;
    renderPosts(data);
  }).catch(
    () => {
      onLoadError();
    }
  );


// fetch('https://32.javascript.htmlacademy.pro/kekstagram/data')
//   .then((response) => response.json())
//   .then((data) => {
//     dataPost = data;
//     renderPosts(data);
//   });

export {dataPost};
