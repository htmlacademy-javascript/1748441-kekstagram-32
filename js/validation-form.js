import './form.js';

const loadForm = document.querySelector('#upload-select-image');

const pristine = new Pristine(loadForm,{
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper'
});


function checkValidateHashtag(value){

  if (value === ''){
    return true;
  }

  const hashtagReg = /^#[a-zа-яё0-9]{1,19}$/i;
  const array = value.trim().toLowerCase().split(' ').filter(Boolean);

  for (let i = 0; i < array.length; i++) {
    if (!hashtagReg.test(array[i])) {
      return false;
    }
  }

  return true;
}

function checkCountHashtag(value){
  // максимум 5 хэштегов
  // нормализуем строку и преобразуем в массив по разделителю пробел
  const array = value.trim().toLowerCase().split(' ').filter(Boolean);
  return array.length < 6;
}

function checkUniqueHashtag(value){
  // нормализуем строку и преобразуем в массив по разделителю пробел
  const array = value.trim().toLowerCase().split(' ').filter(Boolean);
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
