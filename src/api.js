
const BASE_URL = 'https://thinkful-list-api.herokuapp.com/maggie';

const listApiFetch = function(...args) {
  let error;
  
  return fetch(...args)

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

    .then(data => {
      if (error) {
        error.message = data.message;
        return Promise.reject(error);
      }
      return data;
    });
};

function getBookmarks() {
  return listApiFetch(`${BASE_URL}/bookmarks`);
}

function createNewBookmark(bookmark) {
  const newItem = JSON.stringify(bookmark);
  return listApiFetch(`${BASE_URL}/bookmarks`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: newItem
  });
}

function updateBookmark(id, updateData) {
  const newData = JSON.stringify(updateData);
  return listApiFetch(`${BASE_URL}/bookmarks/${id}`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: newData
  });
}

function deleteBookmark(id) {
  return listApiFetch(`${BASE_URL}/bookmarks/${id}`, {
    method: 'DELETE'
  });
}

export default {
  getBookmarks,
  createNewBookmark,
  updateBookmark,
  deleteBookmark
};


