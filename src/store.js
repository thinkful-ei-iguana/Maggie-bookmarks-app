// import $ from 'jquery';
import api from './api.js';

const items = [];

let adding = false;
let error =  null;
let filter = 0;
let expand = false;


const loadBookmarks = function() {
  return api.getBookmarks().then(
    (/* resolve */allBookmarks)=>{
      console.log('we got here', allBookmarks);
      items.push.apply(items, allBookmarks);
      console.log('this is items', items);
      return items;
    },
    (/* reject */err)=>{
      console.error(err);
    });
};

const deleteBookmark = function(id) {
  return api.deleteBookmark(id).then(
    (/* resolve */)=>{
      
      console.log('deleteBookmark 1 of 2');

      items.filter(items, );
      
      console.log('deleteBookmark 2 of 2');
      
      return items;
    },
    (/* reject */err)=>{
      console.error(err);
    });
};

// on submit of Add New button, toggle adding value
const toggleAdd = function() {
  adding = !adding;
};

// on click of condensed bookmark, toggle expand value
const toggleExpand = function() {
  expand = !expand;
  console.log(expand);
};

// .on('change') for select element, filter bookmarks
const setChosenRating = function(value) {
  filter = value;
};

const toggleStars = function(e) {

  // value of the star that is selected
  let starValueClicked = parseInt(e.currentTarget.getAttribute('data-value'));
  
  for(let i = 0; i < 5; i++) {
    
    // gives array of all star elements
    let star = $('#star-rating').getElementsByClassName('fa-star');
    console.log('star is', star);
    //turns typeof data-value of a star into a number
    let starNumValue = parseInt(star.getAttribute('data-value'));
    if(starValueClicked >= starNumValue){
      star.addClass('checked');
    }
    
  }
    
};


const store = {
  bookmarks: [
    { 
      id: '7ddr',
      title: 'The Golden Compass',
      rating: 5,
      url: 'http://www.thegoldencompass.com',
      description: 'A really great book',
      expanded: false
    },
    {
      id: '7ddr',
      title: 'The Amber Spyglass',
      rating: 5,
      url: 'http://www.theamberspyglass.com',
      description: 'A really really great book',
      expanded: false
    }
  ],
  adding: false,
  error: null,
  filter: 0
};

export default {
  toggleAdd,
  toggleExpand,
  setChosenRating,
  toggleStars,
  loadBookmarks,
  deleteBookmark
};