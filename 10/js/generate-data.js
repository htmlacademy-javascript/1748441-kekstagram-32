import {createIdGenerator, getRandomInteger, createRandomIdFromRangeGenerator} from './helpers.js';

const DESCRIPTIONS = [
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

const MESSAGES = [
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
const generatePhotoId = createRandomIdFromRangeGenerator(1, 25);

function createComment(){
  return {
    id: generateCommentId(),
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: MESSAGES[getRandomInteger(0, MESSAGES.length - 1)],
    name: NAMES[getRandomInteger(0, NAMES.length - 1)]
  };
}

const createPost = () => {
  const generateId = generatePostId();

  return {
    id: generateId,
    url: `photos/${generatePhotoId()}.jpg`,
    description: DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)],
    likes: getRandomInteger(15, 200),
    comments: Array.from({length: getRandomInteger(0, 30)}, createComment),
  };
};


const similarPosts = Array.from({length: SIMILAR_POST_COUNT}, createPost);
export {similarPosts};
