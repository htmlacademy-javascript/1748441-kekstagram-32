const renderPosts = (arrayPosts) => {
  const listPost = document.querySelector('.pictures');
  const postTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const postFragment = document.createDocumentFragment();

  while (document.querySelector('.picture')) {
    listPost.removeChild(document.querySelector('.picture'));
  }

  arrayPosts.forEach((itemPost) => {
    const postElement = postTemplate.cloneNode(true);

    postElement.setAttribute('data-id', itemPost.id);
    postElement.querySelector('.picture__img').src = itemPost.url;
    postElement.querySelector('.picture__img').alt = itemPost.description;
    postElement.querySelector('.picture__comments').textContent = itemPost.comments.length;
    postElement.querySelector('.picture__likes').textContent = itemPost.likes;

    postFragment.appendChild(postElement);
  });

  listPost.appendChild(postFragment);
};

export {renderPosts};
