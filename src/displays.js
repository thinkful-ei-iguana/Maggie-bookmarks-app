//displays and html rendering

import store from './store.js';
import api from './api.js';

const addDisplayHtml = 
  `<h2>Add a Bookmark Below</h2>
  <form id="add-display">   
    <label for="add-url-field"></label>
    <br>
    <input type="text" name="url-input" id="add-url-field" value="http://">
    <br>
    <label for="add-name"></label>
    <input type="text" name="name-input" id="add-name" placeholder="My new favorite site!">
    
    <div id="star-rating">
        <span class="fa fa-star" data-value="5"></span>
        <span class="fa fa-star" data-value="4"></span>
        <span class="fa fa-star" data-value="3"></span>
        <span class="fa fa-star" data-value="2"></span>
        <span class="fa fa-star" data-value="1"></span>
    </div>
    <label for="add-description"></label>
    <input type="text" name="description-input" id="add-description" placeholder="Optional - leave a description of your new bookmark">
    <div class="add-view-buttons">
        <button type="submit" id="submit-add">Add</button>
        <button type="submit" id="cancel-add">Go Back</button>
    </div>
  </form>`;




const renderAddView = function() {
  $('#add-bookmark').on('click', (e) => {
    e.preventDefault();
      
    $('#add-display').html(addDisplayHtml);
    
  });
};


// const newBookmarkItem = function() {

//   $('.add-view-buttons').on('submit', (e) => {
//     e.preventDefault();

    

//     console.log('title is ', bmTitle);
//     console.log('star is ', rating);

//     $('#item-display').html(
//       `<ul id="main-item-display">
//         <li class="bm-detail">${bmTitle}</li>
//         <li class="bm-detail">
//           <div id="star-rating">
//             <span class="fa fa-star" data-value="5"></span>
//             <span class="fa fa-star" data-value="4"></span>
//             <span class="fa fa-star" data-value="3"></span>
//             <span class="fa fa-star" data-value="2"></span>
//             <span class="fa fa-star" data-value="1"></span>
//           </div>
//         </li>
//         <li class="bm-detail ">${description}</li>
//         <li class="bm-detail ">${url}</li>
//       </ul>`
//     );
//   });
// };




const listBookmarks = function() {
  store.loadBookmarks().then((allBookmarks) => {
    console.log('displays:', allBookmarks);

    for(let i = 0; i < allBookmarks.length; i++) {

      let bmTitle = allBookmarks[i].name;
      let rating = allBookmarks[i].rating || 5;
      let description = allBookmarks[i].description || 'FAKE DESCRIPTION DATA';
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
        `<ul id="main-item-display">
          <li class="bm-detail">${bmTitle}</li>
          <li class="bm-detail">
            <div id="star-rating">
              ${starSpans}
            </div>
          </li>
          <li class="bm-detail">${description}</li>
          <li class="bm-detail">
            <form id="url-button" action="${url}">
              <button type="submit" id="visitbut">VISIT LINK</button>
            </form>
            <form id="delete-button-${id}">
              <button type="submit" id="deletebut">DELETE</button>
            </form>
          </li>
        </ul>`
      );
        // listening for click of delete button
      $(`#delete-button-${id}`).on('submit', e => {
        e.preventDefault();
        console.log('we are deleting', id, e);
        store.deleteBookmark(id);
        
      });

    }
  } );
};



// $('#star-rating span.fa').on('click', (e) => {
      
//   e.preventDefault();
//   // // debugger;
//   // toggleStars(e);
// });
// });



export default {
  renderAddView,
  listBookmarks,
  deleteBookmark
};