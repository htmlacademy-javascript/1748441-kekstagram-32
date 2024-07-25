import {loadForm} from './form.js';

const pristine = new Pristine(loadForm,{
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper'
});


loadForm.addEventListener('submit', (evt) => {
  //evt.preventDefault();
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  }
});

function checkValidateHashtag(value){

  if (value === ''){
    return true;
  }

  const hashtagReg = /^#[a-zа-яё0-9]{1,19}$/i;
  const array = value.trim().toLowerCase().split(' ');

  for (let i = 0; i < array.length; i++) {
    if (!hashtagReg.test(array[i])) {
      return false;
    }
  }

  // через forEach почему то не работает
  // array.forEach((item) => {
  //   if (!hashtagReg.test(item)) {
  //     console.log('невалидный');
  //     return false;
  //   }
  // });

  return true;
}

function checkCountHashtag(value){
  // максимум 5 хэштегов
  // нормализуем строку и преобразуем в массив по разделителю пробел
  const array = value.trim().toLowerCase().split(' ');

  return array.length < 6;
}

function checkUniqueHashtag(value){
  // нормализуем строку и преобразуем в массив по разделителю пробел
  const array = value.trim().toLowerCase().split(' ');
  const set = new Set(array);

  return set.size === array.length;

}

function lengthComment(value){
  return value.length < 140;
}

pristine.addValidator(loadForm.querySelector('.text__hashtags'), checkValidateHashtag, 'введён невалидный хэштег');
pristine.addValidator(loadForm.querySelector('.text__hashtags'), checkCountHashtag, 'превышено количество хэштегов');
pristine.addValidator(loadForm.querySelector('.text__hashtags'), checkUniqueHashtag, 'хэштеги повторяются');

pristine.addValidator(loadForm.querySelector('.text__description'), lengthComment, 'длина комментария больше 140 символов');

export {pristine};
