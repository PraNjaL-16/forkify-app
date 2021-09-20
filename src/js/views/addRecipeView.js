// IMPORTING STATIC ASSESTS
import icons from 'url:../../img/icons.svg';

// IMPORTING LOCAL JS MODULES
import View from './view.js';

class AddRecipeView extends View {
  // private fields
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was sucessfully uploaded :)😀😀';

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  toogleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toogleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toogleWindow.bind(this));
    this._overlay.addEventListener('click', this.toogleWindow.bind(this));
  }

  // public method
  // part of PUBLISHER-SUBSCRIBER PATTERN - event listner funtion
  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();

      // FormData() constructor always recives a form element
      // here, "this" keyword inside of FormData() constructor will point to "this._parentElement" as in an event handler this keyword refers to object to which the event handler is attached to & "this._parentElement" refers to a form element in the html. So, we are passing a form element to FormData() constructor
      // have to convert constructor's result to an array
      // the array will have all the form fields along with their values
      const dataArr = [...new FormData(this)];
      // will transforms list of key-value pairs into an object
      const data = Object.fromEntries(dataArr);
      // console.log(dataArr, data);
      handler(data);
    });
  }
}

// creating & exporting class instance
export default new AddRecipeView();
