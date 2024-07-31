import { renderPosts } from './render-posts.js';
import { getData } from './api.js';
import {setPicturesData} from './full-post.js';

function onLoadError(){
  const errorTemplate = document.querySelector('#data-error').content.querySelector('.data-error').cloneNode(true);
  document.querySelector('body').appendChild(errorTemplate);
}


getData()
  .then((data) => {
    renderPosts(data);
    //console.log('ttt',dataPost);
    setPicturesData(data);
  }).catch(
    () => {
      onLoadError();
    }
  );

//console.log('data in get-data',picturesData);

//export {dataPost};
