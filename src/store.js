// import $ from 'jquery';

const items = [];

let adding = false;
let error =  null;
let filter = 0;
let expand = false;


// on submit of Add New button, toggle adding value
const toggleAdd = function() {
  let adding = !adding;
}

// on click of condensed bookmark, toggle expand value
const toggleExpand = function() {
  let expand = !expand;
}



export const store = {
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
  store,
  toggleAdd,
  toggleExpand
};