// IMPORTING STATIC ASSESTS
import icons from 'url:../../img/icons.svg';

// this class be used as parent class of other view classes
export default class View {
  // private fields
  // with Parcel and Babel, inheritance between these truly private fields and methods doesn't really work yet. So, we will have to go back to protected fields and protected methods.
  _data;

  // public method
  // JSDoc documentation for a function
  /**
   * Render the recived object to the DOM
   * @param {Object | Object[]} data The data to be rendered (e.g. recipe)
   * @param {boolean} [render=true] An optional parameter. If false, create markup string instead of rendering to the DOM
   * @returns {undefined | string} A markup string is returned if rende=false
   * @this {Object} View instance
   * @author Pranjal
   * @todo Finish the implementation
   */
  render(data, render = true) {
    // guard class
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return this.renderError();
    }

    this._data = data;

    const markup = this._generateMarkup();

    if (!render) {
      return markup;
    }

    // clearing all the html code from the container
    this._clear();
    // creating new html element inside of container
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    /* if (!data || (Array.isArray(data) && data.length === 0)) {
      return this.renderError();
    } */

    this._data = data;

    const newMarkup = this._generateMarkup();

    // creating VIRTUAL DOM OBJECT
    // method will convert "newMarkup" string to real DOM object. This will be a virtual DOM object i.e. it does not live on the web page but live in the memory
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    // console.log(newElements);

    // selecting DOM from web page
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));
    // console.log(curElements);

    // comparing newly created DOM & the DOM that we have selected from webpage
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      // console.log(curEl, newEl.isEqualNode(curEl));

      // updating DOM only in places where the data has updated
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        // console.log(newEl.firstChild?.nodeValue.trim());
        curEl.textContent = newEl.textContent;
      }

      // updating attribute values
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  // private method
  _clear() {
    this._parentElement.innerHTML = '';
  }

  // public method
  renderSprinner() {
    const markup = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>`;

    // clearing all the html code from the container
    this._clear();
    // creating new html element inside of container
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  // public method
  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>`;

    // clearing all the html code from the container
    this._clear();
    // creating new html element inside of container
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  // public method
  renderMessage(message = this._message) {
    const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>`;

    // clearing all the html code from the container
    this._clear();
    // creating new html element inside of container
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
