import api from './api.js';
import displays from './displays.js';

const items = [];
let filter = 0;



const loadBookmarks = function() {
  return api.getBookmarks().then(
    (/* resolve */allBookmarks)=>{
      items.length = 0;
      items.push.apply(items, allBookmarks);
      return items;
    },
    (/* reject */err)=>{
      console.error(err);
    });
};

const deleteBookmark = function(id) {
  return api.deleteBookmark(id).then(
    (/* resolve */)=>{
      items.splice(id, 1);
      displays.listBookmarks();
      return items;
    },
    (/* reject */err)=>{
      console.error(err);
    });
};

const createBookmark = function(bookmark) {
  return api.createNewBookmark(bookmark).then(
    (/* resolve */formObj)=>{
      items.unshift(formObj);
      displays.listBookmarks();
      return items;
    },
    (/* reject */err)=>{
      console.error(err);
    });
};

const toggleExpand = function(id) {
  $(`#expand-button-${id}`).on('submit', e => {
    e.preventDefault();
    
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
  $(`#star-rating-${id}`).on('click', e => {
    e.preventDefault();
    let starSelected = parseInt(e.target.getAttribute('data-value'));
    
    if(id === "_newBookmarkId") {
      lastAddedBookmarkRating.rating = starSelected;
    }

    for(let i = 0; i < 5; i++) {
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
    
    /* 
      allows user to make multiple filter selections by removing
      display:none settings each time a rating filter selection
      is made 
    */
    $('*#individual-bookmark').each(function(index, element) { 
      element.style.display='block';
    });

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