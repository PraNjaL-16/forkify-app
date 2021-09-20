// IMPORTING STATIC ASSESTS
import icons from 'url:../../img/icons.svg';

// IMPORTING LOCAL JS MODULES
import View from './view.js';

class PaginationView extends View {
  // private fields
  _parentElement = document.querySelector('.pagination');

  // public method
  // part of PUBLISHER-SUBSCRIBER PATTERN - event listner funtion
  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      // console.log(e.target);
      const btn = e.target.closest('.btn--inline');

      // guard class
      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;

    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // console.log(numPages);

    // 1. at page 1, & there are other pages
    if (curPage === 1 && numPages > 1) {
      return `
        <button data-goto='${
          curPage + 1
        }' class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
      `;
    }

    // 2. at last page
    if (curPage === numPages && numPages > 1) {
      return `
        <button data-goto='${
          curPage - 1
        }' class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
        </button>
        `;
    }

    // 3. at any other page
    if (curPage < numPages) {
      return `
        <button data-goto='${
          curPage - 1
        }' class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
        </button>
        <button data-goto='${
          curPage + 1
        }' class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
        `;
    }

    // 4. at page 1, & there are not other pages
    return '';
  }
}

// creating & exporting class instance
export default new PaginationView();
