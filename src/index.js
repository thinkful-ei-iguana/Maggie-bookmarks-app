import $ from 'jquery';
import cuid from 'cuid';
import './main.css';

import store from './store';
import api from './api';


/** 
* view bookmarks from first default display, no action/event
* add new bookmark, listen on submit of add button
* filter bookmarks by rating via drop-down selection
* expand each bookmark for more information by clicking on bookmark
*
*/



// to expand: store.bookmarks[i].expanded (true/false)
// to add: store.adding (true/false)
// to filter: store.filter (number)


const newBookmarkValues = function() {

  $('#item-display').on('submit', (e) => {
    e.preventDefault();

    let title = $('#add-name').val();
    let rating = $('#star-rating').on('click').val();
    let description = $('#add-description').val();
    let url = $('#add-url-field').val();

    console.log('title is ', title);
    console.log('star is ', rating);

    $('#item-display').empty();
    $('.hidden-nav').show();
    $('#item-display').append(
      `<ul id="main-item-display">
        <li class="bm-detail">${title}</li>
        <li class="bm-detail">${rating}</li>
        <li class="bm-detail hidden">${description}</li>
        <li class="bm-detail hidden">${url}</li>
      </ul>`
    );
  });
  
  // renderBookmarksCondensed();
};

const filterBookmarks = function() {

};

// const renderBookmarksCondensed = function(title, rating, description, url) {
//   $('#item-display').html(
//     `<ul>
//           <li>${title}</li>
//           <li>${rating}</li>
//           <li class="hidden">${description}</li>
//           <li class="hidden">${url}</li>
//      </ul>`
//   );
// };


const renderAddView = function() {
  //hide or toggleClass(hidden-nav)
  $('.control-selections').on('click', (e) => {
    e.preventDefault();
    console.log('hi');
    $('.control-selections').empty();
    $('.hidden-nav').hide();
    
    $('#item-display').html(
      `<form id="add-display">
            <h2>Add a Bookmark Below</h2>
            <label for="add-url-field"></label>
            <br>
            <input type="text" id="add-url-field" value="http://">
            <br>
            <label for="add-name"></label>
            <input type="text" id="add-name" placeholder="My new favorite site!">
            
            <div id="star-rating">
                <span class="fa fa-star" data-value="5"></span>
                <span class="fa fa-star" data-value="4"></span>
                <span class="fa fa-star" data-value="3"></span>
                <span class="fa fa-star" data-value="2"></span>
                <span class="fa fa-star" data-value="1"></span>
            </div>
            <label for="add-description"></label>
            <input type="text" id="add-description" placeholder="Optional - leave a description of your new bookmark">
            <div class="add-view-buttons">
              <button type="submit" id="submit-add">Add</button>
              <button type="submit" id="cancel-add">Go Back</button>
            </div>
        </form>`
    );
    $('#star-rating span.fa').on('click', (e) => {
    
      e.preventDefault();
      // debugger;
      toggleStars(e);
    });
  });

};

const toggleStars = function(e) {

  // value of the star that is selected
  let starValueClicked = parseInt(e.currentTarget.getAttribute('data-value'))
  
  for(let i = 0; i < 5; i++) {
    
    // gives array of all star values
    let star = document.getElementsByClassName('fa-star');
    console.log('star is', star);
    //turns typeof data-value of a star into a number
    let starNumValue = parseInt(star.getAttribute('data-value'));
    if(starValueClicked >= starNumValue){
      star.addClass('checked');
    }
    
  }
    
};

const expandBookmark = function() {
  $('.control-selections').on('click', (e) => {
    e.preventDefault();
    $('li').removeClass('hidden')
  })
};

newBookmarkValues();
renderAddView();
// renderBookmarksCondensed();