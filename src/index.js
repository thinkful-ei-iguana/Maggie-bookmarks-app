import displays from './displays.js';



/** 
* view bookmarks from first default display, no action/event
* add new bookmark, listen on submit of add button
* filter bookmarks by rating via drop-down selection
* expand each bookmark for more information by clicking on bookmark
*
*/



const main = function(){
  displays.renderAddView();
  displays.listBookmarks();
};

$(main);

