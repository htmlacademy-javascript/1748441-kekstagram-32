import {isEscapeKey} from './helpers.js';
import {similarPosts} from './render-posts.js';

//const itemPost = document.querySelector('.picture');
const fullPostModal = document.querySelector('.big-picture');
const closeModalPostModal = fullPostModal.querySelector('#picture-cancel');
const listPost = document.querySelector('.pictures');
const listComment = fullPostModal.querySelector('.social__comments');

//для отрисовки комментариев
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const commentFragment = document.createDocumentFragment();

const onModalEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullPostModal();
  }
};

const renderCommentsPost = (comments) => {
  comments.forEach((itemComment) => {
    const commentElement = commentTemplate.cloneNode(true);

    commentElement.querySelector('.social__picture').src = itemComment.avatar;
    commentElement.querySelector('.social__picture').alt = itemComment.name;
    commentElement.querySelector('.social__text').textContent = itemComment.message;
    commentFragment.appendChild(commentElement);
  });
  listComment.appendChild(commentFragment);
};

const renderFullPostInModal = (post) => {

  fullPostModal.querySelector('.big-picture__image').src = post.url;
  fullPostModal.querySelector('.social__caption').textContent = post.description;
  fullPostModal.querySelector('.likes-count').textContent = post.likes;
  fullPostModal.querySelector('.social__comment-shown-count').textContent = post.comments.length; // пока показываем сразу все комментариии
  fullPostModal.querySelector('.social__comment-total-count').textContent = post.comments.length;
  renderCommentsPost(post.comments);

  openFullPostModal();
};

// делегированием вешаем обработчик клика по посту
listPost.addEventListener('click', (evt) => {
  if (evt.target.closest('.picture')) {

    const idPost = parseInt(evt.target.closest('.picture').getAttribute('data-id'), 10);
    const result = similarPosts.find((post) => post.id === idPost);

    if (result) {
      evt.preventDefault();
      renderFullPostInModal(result);
    }

  }
});

function openFullPostModal(){
  document.body.classList.add('modal-open');
  fullPostModal.classList.remove('hidden');
  document.addEventListener('keydown', onModalEscKeydown);
  closeModalPostModal.addEventListener('click', closeFullPostModal);
}

function closeFullPostModal(){
  document.body.classList.remove('modal-open');
  fullPostModal.classList.add('hidden');
  document.removeEventListener('keydown', onModalEscKeydown);
  closeModalPostModal.removeEventListener('click', closeFullPostModal);
}
