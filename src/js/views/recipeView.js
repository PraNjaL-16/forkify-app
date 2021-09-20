// now we are displaying website from production directory. So, we have to IMPORT ALL THE STATIC ASSESTS from development directory to production directory.
// to import any static assets that are not programming files with Parcel 2. So for any assests like images or videos or sound files, we need to write url: and then the path to the file
import icons from 'url:../../img/icons.svg';
// console.log(icons);

// IMPORTING THIRD PARTY PACKAGES
// package to convert decimal numbers to fractions
import { Fraction } from 'fractional';

// IMPORTING LOCAL JS MODULES
import View from './view.js';

class RecipeView extends View {
  // private fields
  _parentElement = document.querySelector('.recipe');
  _errorMessage = 'We could not find that recipe. Please try another one!😅😅';
  _message = '';

  // public method
  // part of PUBLISHER-SUBSCRIBER PATTERN - event listner funtion
  addHandlerRender(handler) {
    // hashchange event is to listen to any changes in the URL & event handler will be fired off immediately if URL changes
    // load event is to listen to laoding of the page & the event will be fired off immediately after the page has completed loading
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }

  // public method
  // part of PUBLISHER-SUBSCRIBER PATTERN - event listner funtion
  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener('click', function (e) {
      // console.log(e.target);
      const btn = e.target.closest('.btn--update-servings');

      // guard class
      if (!btn) return;

      // console.log(btn);
      // object destructuring
      // this will give undefined as we are first converting "btn.dataset" to a number & then destructuring a variable from it but we can't destructuring something from a number. object destructuring works only on an object.
      // const { updateTo } = +btn.dataset;
      const { updateTo } = btn.dataset;
      // console.log(updateTo);

      if (+updateTo > 0) {
        handler(+updateTo);
      }
    });
  }

  // public method
  // part of PUBLISHER-SUBSCRIBER PATTERN - event listner funtion
  addHandlerAddBookmark(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--bookmark');
      // console.log(btn);

      // guard class
      if (!btn) return;

      handler();
    });
  }

  // private method
  _generateMarkup() {
    return `
    <figure class="recipe__fig">
      <img src="${this._data.image}" alt="${
      this._data.title
    }" class="recipe__img" crossorigin/>
      <h1 class="recipe__title">
        <span>${this._data.title}</span>
      </h1>
    </figure>

    <div class="recipe__details">
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-clock"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">${
          this._data.cookingTime
        }</span>
        <span class="recipe__info-text">minutes</span>
      </div>
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-users"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people">${
          this._data.servings
        }</span>
        <span class="recipe__info-text">servings</span>

        <div class="recipe__info-buttons">
          <button class="btn--tiny btn--update-servings" data-update-to="${
            this._data.servings - 1
          }">
            <svg>
              <use href="${icons}#icon-minus-circle"></use>
            </svg>
          </button>
          <button class="btn--tiny btn--update-servings" data-update-to="${
            this._data.servings + 1
          }">
            <svg>
              <use href="${icons}#icon-plus-circle"></use>
            </svg>
          </button>
        </div>
      </div>

      <div class="recipe__user-generated ${this._data.key ? '' : 'hidden'}">
        <svg>
          <use href="${icons}#icon-user"></use>
        </svg>
      </div>
      <button class="btn--round btn--bookmark">
        <svg class="">
          <use href="${icons}#icon-bookmark${
      this._data.bookmarked ? '-fill' : ''
    }"></use>
        </svg>
      </button>
    </div>

    <div class="recipe__ingredients">
      <h2 class="heading--2">Recipe ingredients</h2>
      <ul class="recipe__ingredient-list">
        ${this._data.ingredients
          .map(ing => this._generateMarkupIngredients(ing))
          .join('')}
      </ul>
    </div>

    <div class="recipe__directions">
      <h2 class="heading--2">How to cook it</h2>
      <p class="recipe__directions-text">
        This recipe was carefully designed and tested by
        <span class="recipe__publisher">${
          this._data.publisher
        }</span>. Please check out
        directions at their website.
      </p>
      <a
        class="btn--small recipe__btn"
        href="${this._data.sourceUrl}"
        target="_blank"
      >
        <span>Directions</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </a>
    </div>`;
  }

  // private method
  _generateMarkupIngredients(ing) {
    return `
        <li class="recipe__ingredient">
          <svg class="recipe__icon">
            <use href="${icons}#icon-check"></use>
          </svg>
          <div class="recipe__quantity">${
            ing.quantity ? new Fraction(ing.quantity).toString() : ''
          }</div>
          <div class="recipe__description">
            <span class="recipe__unit">${ing.unit}</span>
            ${ing.description}
          </div>
        </li>`;
  }
}

// creating & exporting class instance
export default new RecipeView();
