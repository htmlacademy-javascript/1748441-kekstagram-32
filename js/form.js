import {isEscapeKey} from './helpers.js';
import {resizeLoadImage} from './change-size-image.js';
import {changeEffect} from './image-effet.js';
import {pristine} from './validation-form.js';
import {sendData} from './api.js';

const imageLoadButton = document.querySelector('#upload-file');
const imageLoadModal = document.querySelector('.img-upload__overlay');
const loadForm = document.querySelector('#upload-select-image');
const imageLoadPreview = loadForm.querySelector('.img-upload__preview img');
const effectsImage = loadForm.querySelectorAll('.effects__item .effects__preview');
const closeLoadModalButton = imageLoadModal.querySelector('.img-upload__cancel');

const minusSizeButton = loadForm.querySelector('.scale__control--smaller');
const plusSizeButton = loadForm.querySelector('.scale__control--bigger');

const imageEffectsList = loadForm.querySelector('.effects__list');

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const onModalEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    if(!loadForm.querySelector('.text__description:focus') && !loadForm.querySelector('.text__hashtags:focus') && !document.querySelector('section.error')){
      evt.preventDefault();
      closeLoadModal();
    }
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
  imageLoadModal.classList.add('hidden');
  loadForm.reset();
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onModalEscKeydown);
  closeLoadModalButton.removeEventListener('click', closeLoadModal);
  pristine.reset();
  // события на кнопки изменения размера
  minusSizeButton.removeEventListener('click', resizeLoadImage);
  plusSizeButton.removeEventListener('click', resizeLoadImage);

}

function onPreviewImageLoadModal (evt) {
  evt.preventDefault();

  const file = imageLoadButton.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const imageUrl = URL.createObjectURL(file); // превью загруженой фотографии
    imageLoadPreview.src = imageUrl;
    effectsImage.forEach((itemEffect) => {
      itemEffect.style.backgroundImage = `url(${imageUrl})`;
    });
    openLoadModal();
  }
}

function onSubmitSuccess(){
  const successTemplate = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
  document.querySelector('body').appendChild(successTemplate);

  successTemplate.querySelector('.success__button').addEventListener('click', () => {
    successTemplate.remove();
  });

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      successTemplate.remove();
    }
  });

  successTemplate.addEventListener('click', (evt) => {
    if (!evt.target.closest('.success__inner')) {
      successTemplate.remove();
    }
  });

  setTimeout(() => successTemplate.remove(),5000);
}

function onSubmitError(){
  const errorTemplate = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
  document.querySelector('body').appendChild(errorTemplate);

  errorTemplate.querySelector('.error__button').addEventListener('click', () => {
    errorTemplate.remove();
  });

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      errorTemplate.remove();
    }
  });

  errorTemplate.addEventListener('click', (evt) => {
    if (!evt.target.closest('.error__inner')) {
      errorTemplate.remove();
    }
  });

  setTimeout(() => errorTemplate.remove(),5000);
}


loadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();

  if (isValid) {
    evt.preventDefault();
    pristine.reset();
    loadForm.querySelector('.img-upload__submit').disabled = true;
    sendData(new FormData(evt.target))
      .then(
        () => {
          onSubmitSuccess();
          closeLoadModal();
        }
      )
      .catch(
        () => {
          onSubmitError();
        }
      )
      .finally(() => {
        loadForm.querySelector('.img-upload__submit').disabled = false;
      });
  }
});

imageLoadButton.addEventListener('change', onPreviewImageLoadModal);
