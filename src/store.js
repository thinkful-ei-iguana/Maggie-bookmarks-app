import api from './api.js';
import displays from './displays.js';

const items = [];
let filter = 0;



const loadBookmarks = function() {
  return api.getBookmarks().then(
    (/* resolve */allBookmarks)=>{
      console.log('allbookmarks', allBookmarks);
      items.length = 0;
      items.push.apply(items, allBookmarks);
      console.log('after push into items, this is items', items);
      return items;
    },
    (/* reject */err)=>{
      console.error(err);
    });
};

const deleteBookmark = function(id) {
  console.log('pre delete store is', items);
  return api.deleteBookmark(id).then(
    (/* resolve */)=>{
      items.splice(id, 1);
      displays.listBookmarks();
      console.log('after delete, the store is now', items);
      return items;
    },
    (/* reject */err)=>{
      console.error(err);
    });
};

const createBookmark = function(bookmark) {
  console.log('createBookmark is running');
  return api.createNewBookmark(bookmark).then(
    (/* resolve */formObj)=>{
      console.log('form object is', formObj);
      items.unshift(formObj);
      console.log('after unshift, items is', items);
      displays.listBookmarks();
      return items;
    },
    (/* reject */err)=>{
      console.error(err);
    });
};

// on click of condensed bookmark, toggle expand value
const toggleExpand = function(id) {
  $(`#expand-button-${id}`).on('submit', e => {
    e.preventDefault();
    console.log('we are toggleExpanding');
    
    // console.log('expand is', expand);
    if (!$(`.bm-detail-${id}`).hasClass('.hidden')) {
      $(`.bm-detail-${id}`).addClass('.hidden').show('.hidden');
      $(`#expandbut-${id}`).text('COLLAPSE');
    } else {
      $(`.bm-detail-${id}`).removeClass('.hidden').hide('.hidden');
      $(`#expandbut-${id}`).text('EXPAND');
    } 
  });
};

let lastAddedBookmarkRating = {
  rating: -1
};

const toggleStars = function(id) {

  // value of the star that is selected

  $(`#star-rating-${id}`).on('click', e => {
    e.preventDefault();
    let starSelected = parseInt(e.target.getAttribute('data-value'));
    console.log('starSelected is', starSelected);
    
    if(id === "_newBookmarkId") {
      lastAddedBookmarkRating.rating = starSelected;
    }

    for(let i = 0; i < 5; i++) {
      // gives array of all star elements
      //turns typeof data-value of a star into a number
      let star = e.currentTarget.children[i];
      let starDataValue = parseInt(star.getAttribute('data-value'));

      if(starDataValue <= starSelected) {
        star.classList.add('checked');
      } else {
        star.classList.remove('checked');
      }
    }
  });
};

const filterByRating = function() {
  
  $('#rating-options').on('change', e => {
    e.preventDefault();
    
    let filterSelection = parseInt($('#rating-options').val());
    console.log('items length', items.length);

    for(let i = 0; i < items.length; i++) {
      let ratingNumber = parseInt(items[i].rating);
      
      if (ratingNumber < filterSelection) {
      
        let id = items[i].id;
        let ratingNumber = parseInt(items[i].rating);
        $(`.individual-bookmark-${id}`).hide('fast', e => {
          ratingNumber < filterSelection;
        });
      }
      else if(filterSelection === 0) {
        displays.listBookmarks();
      }     
    }
  });
};  

export default {
  toggleExpand,
  toggleStars,
  loadBookmarks,
  deleteBookmark,
  createBookmark,
  filterByRating,
  filter,
  items,
  lastAddedBookmarkRating
};