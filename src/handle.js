import store from './store.js';
import displays from './displays.js';
import form from './form.js';


const handleSubmitNewBookmark = function() {
  
  $('#submit-new').on('submit', e => {
    e.preventDefault();
    let obj = form.serializeJson(e.target);
    
    let bookmark = {
      title: obj['name-input'],
      url: obj['url-input'],
      desc: obj['description-input'],
      rating: store.lastAddedBookmarkRating.rating
    };
   
    store.createBookmark(bookmark);
  }); 
};

const handleGoBack = function() {
  $('#cancel').on('submit', e => {
    e.preventDefault();
    displays.listBookmarks();
  });
};

const handleDeleteItem = function(id) {
  $(`#delete-button-${id}`).on('submit', e => {
    e.preventDefault();
    $(e.currentTarget).remove('#individual-item-display');
    store.deleteBookmark(id);
  });
};


export default {
  handleSubmitNewBookmark,
  handleGoBack,
  handleDeleteItem,
};