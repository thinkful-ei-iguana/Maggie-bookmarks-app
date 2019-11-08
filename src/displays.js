import store from './store.js';
import handle from './handle.js';


let newBookmarkId = "_newBookmarkId";
const addDisplayHtml = 
  `<h2>Add a Bookmark Below</h2>
  <form id="submit-new">   
    <label for="add-url-field"></label>
    <br>
    <input type="text" name="url-input" id="add-url-field" required placeholder="http://">
    <br>
    <label for="add-name"></label>
    <input type="text" name="name-input" id="add-name" required placeholder="My new favorite site!">
    
    <div id="star-rating-${newBookmarkId}" class="star-rating hovers">
        <span class="fa fa-star" data-value="5"></span>
        <span class="fa fa-star" data-value="4"></span>
        <span class="fa fa-star" data-value="3"></span>
        <span class="fa fa-star" data-value="2"></span>
        <span class="fa fa-star" data-value="1"></span>
    </div>
    <label for="add-description"></label>
    <input type="text" name="description-input" id="add-description" required placeholder="Optional - jot down a description">
    <div class="add-view-buttons">
      <form id="submit-bookmark">
        <button type="submit" id="submit-add">Add</button> 
      </form>
      <form id="cancel">
        <button id="cancel-add">Go Back</button>
      </form>
    </div>
  </form>`;


const renderAddView = function() {

  $('#add-bookmark').on('click', (e) => {
    e.preventDefault();

    if(store.filter === 0) {
      $('#item-display').empty();
      $('#add-display').prepend(addDisplayHtml);
      store.toggleStars(newBookmarkId);
      handle.handleSubmitNewBookmark();
      handle.handleGoBack();
    
      console.log('store.filter is', store.filter)
    }
  });
};


const listBookmarks = function() {
  store.loadBookmarks().then((allBookmarks) => {
    console.log('displays:', allBookmarks);

    $('#add-display').empty();
    $('#item-display').empty();

    for(let i = 0; i < allBookmarks.length; i++) {

      let bmTitle = allBookmarks[i].title;
      let rating = allBookmarks[i].rating || 5;
      let description = allBookmarks[i].desc || 'FAKE DESCRIPTION DATA';
      let url = allBookmarks[i].url || 'FAKE URL DATA';
      let id = allBookmarks[i].id;

      let starSpans = '';

      for(let j = 5; j > 0; j--) {
      
        if(j <= rating){
          starSpans += `<span class="fa fa-star checked" data-value="${j}"></span>`;
        } else {
          starSpans += `<span class="fa fa-star" data-value="${j}"></span>`;
        }
    
      }
      $('#item-display').append(
        `<ul id="individual-bookmark" class="individual-bookmark-${id}">
          <form id="expand-button-${id}">
              <button type="submit" id="expandbut-${id}" class="expandbut">EXPAND</button>
          </form>
          <li class="bm-detail col">${bmTitle}</li>
          <li class="bm-detail col">
            <div id="star-rating-${id}" class="star-rating">
              ${starSpans}
            </div>
          </li>
          <div id="details-to-hide">
            <li class="bm-detail-${id} col hidden">${description}</li>
            <li class="bm-detail-${id} col hidden">
              <form id="url-button" action="${url}">
                <button type="submit" id="visitbut">VISIT LINK</button>
              </form>
              <form id="delete-button-${id}">
                <button type="submit" id="deletebut">DELETE</button>
              </form>
            </li>
          </div>
        </ul>`
      );
      
      store.toggleExpand(id);
      
      handle.handleDeleteItem(id);
      
      store.toggleStars(id);

      store.filterByRating();
    }
  });
};



export default {
  renderAddView,
  listBookmarks
};