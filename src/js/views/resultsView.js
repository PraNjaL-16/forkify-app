// IMPORTING LOCAL JS MODULES
import View from './view.js';
import previewView from './previewView.js';

class resultView extends View {
  // private fields
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query! Please try again!😅😅';
  _message = '';

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

// creating & exporting class instance
export default new resultView();
