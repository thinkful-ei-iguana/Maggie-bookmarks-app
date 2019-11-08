import store from "./store.js";
import displays from "./displays.js";
import form from "./form.js";

//render and event listeners here

const handleSubmitNewBookmark = function() {
  console.log('handleSubmitNewBookmark working');
  
  $('#submit-new').on('submit', e => {
    e.preventDefault();
    console.log('e is', e);
    // let bookmark = form.serializeJson(document.getElementById('#submit-new'));
    let obj = form.serializeJson(e.target);
    console.log('obj', obj);
    let bookmark = {
      title: obj['name-input'],
      url: obj['url-input'],
      desc: obj['description-input'],
      rating: store.lastAddedBookmarkRating.rating
    };
    $("#submit-new").validate({
      debug: true
    });
    console.log(ErrorEvent.message);
    store.createBookmark(bookmark);
  }); 
};

const handleGoBack = function() {
  console.log('handleGoBack working');
  $('#cancel').on('submit', e => {
    e.preventDefault();
    displays.listBookmarks();
  });
};

const handleDeleteItem = function(id) {
  // listening for click of delete button
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