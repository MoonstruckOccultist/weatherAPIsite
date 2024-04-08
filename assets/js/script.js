var searchFormEl = document.querySelector('#searchForm');

function handleSearchFormSubmit(event) {
    event.preventDefault();

    var searchInputVal = document.querySelector('#cityInp').value;

    if (!searchInputVal) {
        console.error('You need a search input value!');
        return;
    }

    var queryString = '';

    location.assign(queryString);
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);