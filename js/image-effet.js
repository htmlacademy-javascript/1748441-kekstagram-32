const EFFECTS = {
  'effect-chrome': {
    options: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1
    },
    filter: 'grayscale',
    unit: ''
  },
  'effect-sepia': {
    options: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1
    },
    filter: 'sepia',
    unit: ''
  },
  'effect-marvin': {
    options: {
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1
    },
    filter: 'invert',
    unit: '%'
  },
  'effect-phobos': {
    options: {
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1
    },
    filter: 'blur',
    unit: 'px'
  },
  'effect-heat': {
    options: {
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1
    },
    filter: 'brightness',
    unit: ''
  }
};

const userForm = document.querySelector('#upload-select-image');
const effectSliderBlock = userForm.querySelector('.img-upload__effect-level');
const effectSliderElement = userForm.querySelector('.effect-level__slider');
const imageLoadPreview = userForm.querySelector('.img-upload__preview img');
const inputEffectImage = userForm.querySelector('.effect-level__value');

// инициализируем слайдер, затем просто обновляем ему опции
const effectSlider = noUiSlider.create(effectSliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    }
  }
});

effectSlider.on('update', changeEffectSlider);

function changeEffect(target){
  if(target.getAttribute('id') !== 'effect-none'){
    effectSlider.updateOptions(EFFECTS[target.getAttribute('id')].options);
    effectSliderBlock.classList.remove('hidden');
  }else{
    imageLoadPreview.style.removeProperty('filter');
    effectSliderBlock.classList.add('hidden');
  }

}

function changeEffectSlider(){

  const currentSliderValue = effectSlider.get();
  inputEffectImage.value = currentSliderValue;

  const selectedEffect = userForm.querySelector('input[name="effect"]:checked').getAttribute('id');

  if (selectedEffect !== 'effect-none') {
    imageLoadPreview.style.filter = `${EFFECTS[selectedEffect].filter}(${currentSliderValue}${EFFECTS[selectedEffect].unit})`;
  }
}

export {changeEffect};
