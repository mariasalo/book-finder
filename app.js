const searchBox = document.querySelector('#search-box');
const searchForm = document.querySelector('form');
const placeHolder = '<img src="https://via.placeholder.com/300x500">';
const cardList = document.querySelector('.card-list');
const books = new Books();


searchForm.addEventListener('submit', e => {

    e.preventDefault();

    // reset the previous search results
    cardList.innerHTML = "";

    // get the search input typed by the user & reset the form
    const searchData = searchForm.book.value.trim();
    searchForm.reset();

    // check if search field was empty, if not continue to the HTTP request to get data from API
    if (searchData === "" || searchData === null) {
        alert("Search field can't be empty. Please try again!");
    } else {
        books.getBooks(searchData)
            .then(data => updateUI(data))
            .catch(err => console.log(err));
    }

});


const updateUI = (data) => {

    console.log(data);

    // go through the data fetched from the Google Books API & set the data to book cards
    let { title, authors, publisher, bookLink, bookImg } = data;

    for (var i = 0; i < data.items.length; i++) {
        item = data.items[i];
        title = item.volumeInfo.title;
        authors = item.volumeInfo.authors;
        publisher = item.volumeInfo.publisher;
        bookLink = item.volumeInfo.infoLink;
        bookImg = (item.volumeInfo.imageLinks) ? item.volumeInfo.imageLinks.thumbnail : placeHolder;

        let HTML = `
        <div class="card-container shadow-lg rounded">
        <img src="${bookImg}" class="cover card-img-top mx-auto" alt="Book image">
        <div class="col-md-auto">
        <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">Authors: ${authors}</p>
                <p class="card-text">Publisher: ${publisher}</p>
                <button id="info" class="btn btn-info btn-sm ml-2" onclick="window.location.href = '${bookLink}';">Read more</button>
            </div>
            </div>
            </div></br></br>
        `;

        cardList.innerHTML += HTML;

    }

    // remove the d-none class to show results
    if (cardList.classList.contains('d-none')) {
        cardList.classList.remove('d-none');
    }
}