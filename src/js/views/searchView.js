class SearchView {
  // private class fields
  _parentElement = document.querySelector('.search');

  // public method
  getQuery() {
    const query = this._parentElement.querySelector('.search__field').value;
    // to clear the input field
    this._clearInput();

    return query;
  }

  // private method
  _clearInput() {
    // clearing the input field
    this._parentElement.querySelector('.search__field').value = '';
  }

  // public method
  // part of PUBLISHER-SUBSCRIBER PATTERN - event listner funtion
  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      // to prevent default page loading behaviour
      e.preventDefault();
      handler();
    });
  }
}

// creating & exporting class instance
export default new SearchView();
