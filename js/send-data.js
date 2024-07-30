const createLoader = (onSuccess, onError) => () => fetch(
  'https://32.javascript.htmlacademy.pro/kekstagram',
  {
    method: 'POST',
    credentials: 'same-origin',
    body: new FormData(),
    //multipart/form-data
  }
)
  .then((response) => {
    //console.log(response.status);
    if(response.ok){
      return response.json();
    }

    throw new Error(`${response.status} ${response.statusText}`);
  })
  .then((data) => {
    onSuccess(data);
  })
  .catch((err) => {
    onError(err);
  });


export {createLoader};


