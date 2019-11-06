import store from "./store.js";

//render and event listeners here

const render = function() {
  console.log('render working');
};

const handleAddBookmark = function() {
  console.log('handleAddBookmark working');
  // $('.').on('submit')
};

const handleToggleStarSelection = function() {
  $('#star-rating span.fa').on('click', (e) => {
    e.preventDefault();
    store.toggleStars();
  });
};

const handleFilterBookmarks = function() {
  console.log('handleFilterBookmarks working');
};

const handleSubmitNewBookmark = function() {
  console.log('handleSubmitNewBookmark working');
};

const handleGoBack = function() {
  console.log('handleGoBack working');
};

const handleExpandBookmark = function() {
  console.log('handleExpandBookmark working');
};

const handleDeleteBookmark = function() {
  console.log('handleDeleteBookmark working');
};

const allEventListeners = function() {
  handleAddBookmark();
  handleFilterBookmarks();
  handleSubmitNewBookmark();
  handleGoBack();
  handleExpandBookmark();
  handleDeleteBookmark();
  handleToggleStarSelection();
};

export default {
  allEventListeners,
  render
};