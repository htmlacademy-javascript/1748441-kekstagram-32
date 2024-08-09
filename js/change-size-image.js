const MIN_SIZE = 25;
const MAX_SIZE = 100;
const STEP_SIZE = 25; // шаг для изменения масштаба изображения

const userForm = document.querySelector('#upload-select-image');
const inputSizeImage = userForm.querySelector('.scale__control--value');
const imageLoadPreview = userForm.querySelector('.img-upload__preview img');

function resizeLoadImage(element){

  let type = 'plus';
  if(element.target.closest('.scale__control--smaller')){
    type = 'minus';
  }

  const cureSize = parseInt(inputSizeImage.value, 10);
  let setSize;

  if (type === 'minus') {
    if (cureSize > MIN_SIZE && cureSize <= MAX_SIZE) {
      setSize = cureSize - STEP_SIZE;
    }
  } else {
    if (cureSize >= 0 && cureSize < MAX_SIZE) {
      setSize = cureSize + STEP_SIZE;
    }
  }
  if(setSize){
    inputSizeImage.value = `${setSize}%`;
    imageLoadPreview.style.transform = `scale(${setSize / 100})`;
  }

}

export {resizeLoadImage};
