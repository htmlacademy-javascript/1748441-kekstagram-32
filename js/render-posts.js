import {similarPosts} from './generate-data.js';

//console.log(similarPosts);

const listPost = document.querySelector('.pictures');
const postTemplate = document.querySelector('#picture').content.querySelector('.picture');
const postFragment = document.createDocumentFragment();

similarPosts.forEach((itemPost) => {
  const postElement = postTemplate.cloneNode(true);

  postElement.querySelector('.picture__img').src = itemPost.url;
  postElement.querySelector('.picture__img').alt = itemPost.description;
  postElement.querySelector('.picture__comments').textContent = itemPost.comments.length;
  postElement.querySelector('.picture__likes').textContent = itemPost.likes;

  postFragment.appendChild(postElement);
});

listPost.appendChild(postFragment);
