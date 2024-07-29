import {isEscapeKey} from './helpers.js';
//import {similarPosts} from './render-posts.js';
//import {dataPost} from './get-data.js';

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
let countShowedComments = SHOW_COMMENTS_COUNT; // кол-во показанных комментариев

let picturesData = [];
const setPicturesData = (data) => {
  //console.log('setPicturesData');
  picturesData = data;
};

const onModalEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullPostModal();
  }
};

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
  fullPostModal.querySelector('.social__comment-shown-count').textContent = Math.min(SHOW_COMMENTS_COUNT, post.comments.length);
  fullPostModal.querySelector('.social__comment-total-count').textContent = post.comments.length;

  renderCommentsPost(post.comments);

  if(post.comments.length > SHOW_COMMENTS_COUNT) {
    // показываем кнопку "Загрузить еще комментарии"
    loadMoreComments.classList.remove('hidden');
    loadMoreComments.addEventListener('click', showMoreComments);
  }else{
    loadMoreComments.classList.add('hidden');
  }
  countShowedComments = SHOW_COMMENTS_COUNT; // обновляем счетчик показанных комментариев для нового поста
  openFullPostModal();
};

// делегированием вешаем обработчик клика по посту
listPost.addEventListener('click', (evt) => {
  if (evt.target.closest('.picture')) {

    //console.log(picturesData);
    const idPost = parseInt(evt.target.closest('.picture').getAttribute('data-id'), 10);
    const result = picturesData.find((post) => post.id === idPost);

    if (result) {
      evt.preventDefault();
      renderFullPostInModal(result);
    }

  }
});

function showMoreComments(){
  const list = listComments.querySelectorAll('.social__comment');
  let needAdd = 0;

  // если остатка скрытых комментариев хватает на отображение еще 5
  if(list.length - countShowedComments >= SHOW_COMMENTS_COUNT){
    needAdd = countShowedComments + SHOW_COMMENTS_COUNT;
  }else{
    needAdd = list.length;
  }

  for (let i = countShowedComments; i < needAdd; i++) {
    list[i].classList.remove('hidden');
    countShowedComments++;
  }

  fullPostModal.querySelector('.social__comment-shown-count').textContent = countShowedComments;

  if(countShowedComments === list.length){
    loadMoreComments.classList.add('hidden');
  }
}

export {setPicturesData};
