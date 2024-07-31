import {isEscapeKey} from './helpers.js';
import {resizeLoadImage} from './change-size-image.js';
import {changeEffect} from './image-effet.js';

const imageLoadButton = document.querySelector('#upload-file');
const imageLoadModal = document.querySelector('.img-upload__overlay');
const loadForm = document.querySelector('#upload-select-image');
const imageLoadPreview = loadForm.querySelector('.img-upload__preview img');
const effectsImage = loadForm.querySelectorAll('.effects__item .effects__preview');
const closeLoadModalButton = imageLoadModal.querySelector('.img-upload__cancel');

const minusSizeButton = loadForm.querySelector('.scale__control--smaller');
const plusSizeButton = loadForm.querySelector('.scale__control--bigger');

const imageEffectsList = loadForm.querySelector('.effects__list');

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

  // события на кнопки изменения размера
  minusSizeButton.addEventListener('click', (evt) => {
    resizeLoadImage(evt);
  });
  plusSizeButton.addEventListener('click', (evt) => {
    resizeLoadImage(evt);
  });

  //выбор эффекта для загруженой фотографии
  imageEffectsList.addEventListener('click', (evt) => {
    const target = evt.target.closest('.effects__radio');
    if (target) {
      changeEffect(target);
    }
  });
}

function closeLoadModal(){
  loadForm.reset();
  document.body.classList.remove('modal-open');
  imageLoadModal.classList.add('hidden');
  document.removeEventListener('keydown', onModalEscKeydown);
  closeLoadModalButton.removeEventListener('click', closeLoadModal);

  // события на кнопки изменения размера
  minusSizeButton.removeEventListener('click', resizeLoadImage);
  plusSizeButton.removeEventListener('click', resizeLoadImage);

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
