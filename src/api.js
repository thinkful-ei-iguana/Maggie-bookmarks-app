
const BASE_URL = 'https://thinkful-list-api.herokuapp.com/maggie';

const listApiFetch = function(...args) {
  let error;
  
  return fetch(...args)
    // first .then
    .then(res => {
      if(!res.ok) {
        error = {code: res.status};

        if(!res.headers.get('content-type').includes('json')) {
          error.message = res.statusText;
          return Promise.reject(error);
        }
      }
      return res.json();
    })
    // second .then
    .then(data => {
      if (error) {
        error.message = data.message;
        return Promise.reject(error);
      }
      return data;
    });
};

function getBookmarks() {
  return listApiFetch(`${BASE_URL}/items`);
}

function createNewBookmark(name) {
  const newItem = JSON.stringify({name});
  return listApiFetch(`${BASE_URL}/items`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: newItem
  });
}

function updateBookmark(id, updateData) {
  const newData = JSON.stringify(updateData);
  return listApiFetch(`${BASE_URL}/items/${id}`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: newData
  });
}

function deleteBookmark(id) {
  // shopping list example: return listApiFetch(BASE_URL + '/items/' + id
  return listApiFetch(`${BASE_URL}/items/${id}`, {
    method: 'DELETE'
  });
}

export default {
  getBookmarks,
  createNewBookmark,
  updateBookmark,
  deleteBookmark
};


