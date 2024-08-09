import './form.js';

const HASHTAG_REG = /^#[a-zа-яё0-9]{1,19}$/i;
const userForm = document.querySelector('#upload-select-image');

const pristine = new Pristine(userForm,{
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper'
});


function checkValidateHashtag(value){

  if (value === ''){
    return true;
  }

  const arrayHashtags = value.trim().toLowerCase().split(' ').filter(Boolean);

  for (let i = 0; i < arrayHashtags.length; i++) {
    if (!HASHTAG_REG.test(arrayHashtags[i])) {
      return false;
    }
  }

  return true;
}

function checkCountHashtag(value){
  // максимум 5 хэштегов
  // нормализуем строку и преобразуем в массив по разделителю пробел
  const arrayHashtags = value.trim().toLowerCase().split(' ').filter(Boolean);
  return arrayHashtags.length < 6;
}

function checkUniqueHashtag(value){
  // нормализуем строку и преобразуем в массив по разделителю пробел
  const arrayHashtags = value.trim().toLowerCase().split(' ').filter(Boolean);
  const set = new Set(arrayHashtags);

  return set.size === arrayHashtags.length;

}

function checkLengthComment(value){
  return value.length < 140;
}

pristine.addValidator(userForm.querySelector('.text__hashtags'), checkValidateHashtag, 'введён невалидный хэштег');
pristine.addValidator(userForm.querySelector('.text__hashtags'), checkCountHashtag, 'превышено количество хэштегов');
pristine.addValidator(userForm.querySelector('.text__hashtags'), checkUniqueHashtag, 'хэштеги повторяются');

pristine.addValidator(userForm.querySelector('.text__description'), checkLengthComment, 'длина комментария больше 140 символов');

export {pristine};
