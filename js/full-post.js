import {isEscapeKey} from './helpers.js';
import {similarPosts} from './render-posts.js';

//const itemPost = document.querySelector('.picture');
const fullPostModal = document.querySelector('.big-picture');
const closeModalPostModal = fullPostModal.querySelector('#picture-cancel');
const listPost = document.querySelector('.pictures');
const listComments = fullPostModal.querySelector('.social__comments');

const loadMoreComments = fullPostModal.querySelector('.social__comments-loader');

//для отрисовки комментариев
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const commentFragment = document.createDocumentFragment();
const SHOW_COMMENTS_COUNT = 5;

const onModalEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullPostModal();
  }
};

const renderCommentsPost = (comments) => {

  comments.forEach((itemComment, index) => {
    const commentElement = commentTemplate.cloneNode(true);

    commentElement.querySelector('.social__picture').src = itemComment.avatar;
    commentElement.querySelector('.social__picture').alt = itemComment.name;
    commentElement.querySelector('.social__text').textContent = itemComment.message;

    if (index > SHOW_COMMENTS_COUNT - 1) {
      // скрываем комментарии после SHOW_COMMENTS_COUNT-го
      commentElement.classList.add('hidden');
    }

    commentFragment.appendChild(commentElement);
  });
  listComments.appendChild(commentFragment);
};

const renderFullPostInModal = (post) => {

  fullPostModal.querySelector('.big-picture__image').src = post.url;
  fullPostModal.querySelector('.social__caption').textContent = post.description;
  fullPostModal.querySelector('.likes-count').textContent = post.likes;
  if(SHOW_COMMENTS_COUNT > post.comments.length){
    fullPostModal.querySelector('.social__comment-shown-count').textContent = post.comments.length;
  }else{
    fullPostModal.querySelector('.social__comment-shown-count').textContent = SHOW_COMMENTS_COUNT;
  }
  fullPostModal.querySelector('.social__comment-total-count').textContent = post.comments.length;
  renderCommentsPost(post.comments);

  if(post.comments.length > SHOW_COMMENTS_COUNT) {
    // показываем кнопку "Загрузить еще комментарии"
    loadMoreComments.classList.remove('hidden');
    loadMoreComments.addEventListener('click', showMoreComments);
  }

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
  listComments.textContent = '';
  document.removeEventListener('keydown', onModalEscKeydown);
  closeModalPostModal.removeEventListener('click', closeFullPostModal);
  loadMoreComments.removeEventListener('click', showMoreComments);
}

function showMoreComments(){
  const list = listComments.querySelectorAll('.social__comment');
  let countShowed = 0;
  list.forEach((itemComment) => {
    if (itemComment.classList.contains('hidden') && countShowed < SHOW_COMMENTS_COUNT) {
      itemComment.classList.remove('hidden');
      countShowed++;
    }
  });
  const currentShowed = parseInt(fullPostModal.querySelector('.social__comment-shown-count').textContent,10);
  const allComments = list.length;

  fullPostModal.querySelector('.social__comment-shown-count').textContent = currentShowed + countShowed;

  if(currentShowed + countShowed === allComments){
    loadMoreComments.classList.add('hidden');
  }
}
