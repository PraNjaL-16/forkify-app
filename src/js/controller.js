// FORKIFY API source: https://forkify-api.herokuapp.com/v2

// 1. npm init
// 2. change entry point to index.html in package.json file i.e. "main": "index.html"
// 3. install parcel package through command line i.e. "npm install parcel-bundler --save-dev"
// 4. create start & build scripts under scripts section of package.json file

// Sass is basically a better way of writing CSS, which has some nice additional features, which makes writing CSS in a large scale application a lot easier. Browsers actually don't understand Sass and so it has to be converted to CSS. And so Parcel is going to do that for us.
// 5. npm install sass@1.26.10 --save-dev
// 6. npm install @parcel/transformer-image@2.0.0-rc.0 -D
// 7. npm install @parcel/transformer-sass@2.0.0-rc.0 -D

// npm parcel module bundler takes a raw source code and compiles it into nice package in dist folder. So, this dist folder is ready to ship to browsers.
// have to use new server created by "npm run start" to view the web page
// to start the parcel
// 8. npm run start
// now we are displaying website from production directory. So, we have to import all the static assests from development directory to production directory.

// to install package for polyfilling i.e. to convert ES6 code to ES5
// to polyfill synchronous js
// 9. npm install core-js

// to polyfill asynchronous js
// 10. npm install regenerator-runtime

// installing package to convert decimal numbers to fractions
// 11. npm install fractional

// to end the parcel
// 12. ctrl + C

// stop the parcel & delete '.parcel-cahe' & 'dist' folder before building the project to get a fresh dist folder
// change "main" to "default" in package.json file
// "--dist-dir ./dist" - this is how we specify the directory to which we want to compress the project
// 13. parcel build index.html --dist-dir ./dist
// this will remove the dead code & compress the project to dist folder

// IMPORING THIRD PARTY PACKAGES
// packages for polyfilling
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// IMPORTING LOCAL JS MODULES
import { MODAL_CLOSE_SEC } from './config.js';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

// HOT MODULE RELOADING means is that whenever we change one of the modules or change anything in the module, it will then, of course, trigger a rebuild but that new modified bundle will then automatically, like magic, get injected into the browser without triggering a whole page reload. This code here is code that only Parcel understands.
// if (module.hot) {
//   console.log('hot module relaoding');
//   module.hot.accept();
// }

// part of PUBLISHER-SUBSCRIBER PATTERN - event handler function
// this will happen when event gets triggered
const controlRecipe = async function () {
  try {
    // to retrive recipe id from the page's URL
    const id = window.location.hash.slice(1);
    // console.log(id);

    // guard class will be executed, if we don't have any recipe id
    if (!id) return;

    // to render spinner
    recipeView.renderSprinner();

    // 0. UPDATE RESULTS VIEW & BOOKMARK VIEW TO HIGHLIGHT CURRENT SELECTED RECIPE
    // without re-rendring the complete web page
    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);

    // 1. LOADING RECIPE
    // loadRecipe() is a async function. So, it will return a promise
    await model.loadRecipe(id);
    // console.log(model.state.recipe);

    // 2. RENDRING RECIPE
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

// part of PUBLISHER-SUBSCRIBER PATTERN - event handler function
// this will happen when event gets triggered
const controlSearchResults = async function () {
  try {
    // to render spinner
    resultsView.renderSprinner();

    // 1. GET SEARCH QUERY
    const query = searchView.getQuery();

    if (!query) return;

    // 2. LOAD SEARCH RESULTS
    // loadSearchResults() is a async function. So, it will return a promise
    await model.loadSearchResults(query);
    // console.log(model.state.search.results);

    // 3. RENDER INITIAL RESULTS
    resultsView.render(model.getSearchResultsPage());

    // 4. RENDER INITIAL PAGINATION
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

// part of PUBLISHER-SUBSCRIBER PATTERN - event handler function
// this will happen when event gets triggered
const controlPagination = function (goToPage) {
  // 1. RENDER NEW RESULTS
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 2. RENDER NEW PAGINATION
  paginationView.render(model.state.search);
};

// part of PUBLISHER-SUBSCRIBER PATTERN - event handler function
// this will happen when event gets triggered
const controlServings = function (newServings) {
  // 1. UPDATE THE RECIPE SERVINGS (IN STATE)
  model.updateServings(newServings);

  // 2. UPDATE THE RECIPE VIEW
  // re-rendring entire recipe view with updated data will add additional work-load on the broswers. So, instead we should only update concerned text elements
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

// part of PUBLISHER-SUBSCRIBER PATTERN - event handler function
// this will happen when event gets triggered
const controlAddBookmark = function () {
  // 1. add or remove bookmark
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }
  // console.log(model.state.recipe);

  // 2. update recipe view
  // updating recipeView without re-rendring the complete page
  recipeView.update(model.state.recipe);

  // 3. render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

// part of PUBLISHER-SUBSCRIBER PATTERN - event handler function
// this will happen when event gets triggered
const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

// part of PUBLISHER-SUBSCRIBER PATTERN - event handler function
// this will happen when event gets triggered
const controlAddRecipe = async function (newRecipe) {
  try {
    // console.log(newRecipe);
    // to render spinner
    addRecipeView.renderSprinner();

    // 1. UPLOAD NEW RECIPE DATA
    await model.uplaodRecipe(newRecipe);

    // 2. RENDER RECIPE
    // console.log(model.state.recipe);
    recipeView.render(model.state.recipe);

    // 3. DISPLAY SUCESS MESSAGE
    addRecipeView.renderMessage();

    // 4. RE-RENDER BOOKMARK VIEW
    bookmarksView.render(model.state.bookmarks);

    // 5. CHANGING ID IN THE URL
    // pushState() takes three arguments i.e. state, title, url
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // 6. CLOSE FORM WINDOW
    setTimeout(function () {
      addRecipeView.toogleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    addRecipeView.renderError(err.message);
  }
};

// DESIGN PATTERNS in programming are basically just standard solutions to certain kinds of problems.
// So, in the PUBLISHER-SUBSCRIBER PATTERN we have a publisher which is some code that knows when to react. Now, on the other hand, we have a subscriber which is code that actually wants to react. So this is the code that should actually be executed when the event happens.
// In practice, that means as soon as the program loads, the init function will be called.
// And this is how we implement event listeners and event handlers in the MVC architecture. So this will allow us to keep the handler in the controller and to listener in the view i.e. we will be able to listen for the events in the view module, & being able to handle that events from the controller module. And by that, keeping everything nicely separated.
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
