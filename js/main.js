const DESCRIPTION = [
  'Купил себе новые тапки',
  'Застряли с бегемотами',
  'Концерт был огненным',
  'Встретили красивый закат',
  'Начинаем правильно питаться',
  'Хорошее приспособление для хранения обуви',
  'Нам подали закуску на фольге',
  'Мы любим суши и котиков. Вот что из этого вышло',
  'Побывали в заброшенном здании',
  'Отдыхали на пляже',
  'Лучший охлаждающий напиток летом - это морс!'
];

const NAMES = [
  'Олег',
  'Александра',
  'Валерий',
  'Антон',
  'Евгения',
  'Владислава',
  'Мария',
  'Антонида',
  'Мирослав'
];

const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'В целом всё неплохо.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.',
  'Как можно было поймать такой неудачный момент?!',
  'В конце концов это просто непрофессионально.',
  'В конце концов это просто непрофессионально.Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.'
];

const SIMILAR_POST_COUNT = 25; // всего кол-во постов для генерации

const generatePostId = createIdGenerator(); // для генерации последовательных id для постов
const generateCommentId = createIdGenerator(); // для генерации последовательных id для комментариев


function createIdGenerator () {
  let lastGeneratedId = 0;

  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
}

function getRandomInteger (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

function createRandomIdFromRangeGenerator (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

function createComment(){
  return {
    id: generateCommentId(),
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: MESSAGE[getRandomInteger(0, MESSAGE.length - 1)],
    name: NAMES[getRandomInteger(0, NAMES.length - 1)]
  };
}
const generatePhotoId = createRandomIdFromRangeGenerator(1, 25);

const createPost = () => {
  const generateId = generatePostId();

  return {
    id: generateId,
    url: `photos/${generatePhotoId()}.jpg`,
    description: DESCRIPTION[getRandomInteger(0, DESCRIPTION.length - 1)],
    likes: getRandomInteger(15, 200),
    comments: Array.from({length: getRandomInteger(0, 30)}, createComment),
  };
};


const similarPosts = Array.from({length: SIMILAR_POST_COUNT}, createPost);
