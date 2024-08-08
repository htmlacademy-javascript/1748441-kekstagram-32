import { renderPosts } from './render-posts.js';
import { getData } from './api.js';
import {setPicturesData} from './full-post.js';
import {initFilter} from './filter.js';
import { debounce } from './helpers.js';

function onLoadError(){
  const errorTemplate = document.querySelector('#data-error').content.querySelector('.data-error').cloneNode(true);
  document.querySelector('body').appendChild(errorTemplate);
}

getData()
  .then((data) => {
    renderPosts(data);
    setPicturesData(data);
    const debounceRenderPosts = debounce(renderPosts);
    initFilter(data,debounceRenderPosts);
  }).catch(
    () => {
      onLoadError();
    }
  );
