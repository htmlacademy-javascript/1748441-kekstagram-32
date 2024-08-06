const loadForm = document.querySelector('#upload-select-image');

const inputSizeImage = loadForm.querySelector('.scale__control--value');
const imageLoadPreview = loadForm.querySelector('.img-upload__preview img');

function resizeLoadImage(element){

  let type = 'plus';
  if(element.target.closest('.scale__control--smaller')){
    type = 'minus';
  }

  const cureSize = parseInt(inputSizeImage.value, 10);
  let setSize;

  if (type === 'minus') {
    if (cureSize > 25 && cureSize <= 100) {
      setSize = cureSize - 25;
    }
  } else {
    if (cureSize >= 0 && cureSize < 100) {
      setSize = cureSize + 25;
    }
  }
  if(setSize){
    inputSizeImage.value = `${setSize}%`;
    imageLoadPreview.style.transform = `scale(${setSize / 100})`;
  }

}

export {resizeLoadImage};
