
import store from './store.js';
import api from './api.js';
import bookmarks from './bookmarks-main.js';
import displays from './displays.js';



/** 
* view bookmarks from first default display, no action/event
* add new bookmark, listen on submit of add button
* filter bookmarks by rating via drop-down selection
* expand each bookmark for more information by clicking on bookmark
*
*/

// bookmarks.render;
// bookmarks.allEventListeners;

// console.log(bookmarks.render, bookmarks.allEventListeners);

// to expand: store.bookmarks[i].expanded (true/false)
// to add: store.adding (true/false)
// to filter: store.filter (number)


// const main = function(){
//   api.getBookmarks()
//     .then(bookmarks => {
//       console.log(bookmarks);
//     });
//   handleFeatures.bindEventListeners();
// };

// $(main);




// const expandBookmark = function() {
//   $('.control-selections').on('click', (e) => {
//     e.preventDefault();
//     $('li').removeClass('hidden')
//   })
// };

// displays.renderAddView();
// displays.newBookmarkItem();

displays.listBookmarks();
displays.deleteBookmark();
// api.createNewBookmark('Great Site');



// bookmarks.render();
// store.toggleStars();
// renderBookmarksCondensed();