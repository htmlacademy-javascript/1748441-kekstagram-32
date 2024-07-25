import {isEscapeKey} from './helpers.js';
//import {pristine} from './validation-form.js';

const imageLoadButton = document.querySelector('#upload-file');
const imageLoadModal = document.querySelector('.img-upload__overlay');
const loadForm = document.querySelector('#upload-select-image');
const imageLoadPreview = loadForm.querySelector('.img-upload__preview img');
const effectsImage = loadForm.querySelectorAll('.effects__item .effects__preview');
const closeLoadModalButton = imageLoadModal.querySelector('.img-upload__cancel');

const onModalEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeLoadModal();
  }
};

function openLoadModal(){
  document.body.classList.add('modal-open');
  imageLoadModal.classList.remove('hidden');
  closeLoadModalButton.addEventListener('click', closeLoadModal);
  document.addEventListener('keydown', onModalEscKeydown);
}

function closeLoadModal(){
  imageLoadButton.value = ''; // input проверяет если изображение было загружено тоже то change не произойдет (поэтому обнулим)
  loadForm.querySelector('.text__hashtags').value = '';
  loadForm.querySelector('.text__description').value = '';
  document.body.classList.remove('modal-open');
  imageLoadModal.classList.add('hidden');
  document.removeEventListener('keydown', onModalEscKeydown);
  closeLoadModalButton.removeEventListener('click', closeLoadModal);
}

function onPreviewImageLoadModal (evt) {
  evt.preventDefault();

  const imageUrl = URL.createObjectURL(imageLoadButton.files[0]);
  imageLoadPreview.src = imageUrl;
  effectsImage.forEach((itemEffect) => {
    itemEffect.style.backgroundImage = `url(${imageUrl})`;
  });

  openLoadModal();
}

imageLoadButton.addEventListener('change', onPreviewImageLoadModal);

export {loadForm};
