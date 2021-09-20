// IMPORTING LOCAL JS MODULES
import View from './view.js';
import previewView from './previewView.js';

class BookMarksView extends View {
  // private fields
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No book marks yet. Find a nice recipe & book mark it!😅😅';
  _message = '';

  // public method
  // part of PUBLISHER-SUBSCRIBER PATTERN - event listner funtion
  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

// creating & exporting class instance
export default new BookMarksView();
