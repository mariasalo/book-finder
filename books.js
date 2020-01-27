class Books {
    constructor() {
        this.key = ''; // Google API key
        this.booksUrl = 'https://www.googleapis.com/books/v1/volumes?';
    }

    // fetch book information from Google Books API according to search data
    async getBooks(searchData) {
        console.log(searchData);
        const query = `q=${searchData}&key=${this.key}`;
        try {
            const response = await fetch(this.booksUrl + query);
            const data = await response.json();
            if (data.totalItem === 0) {
                alert("No results found, please try again!");
            }
            else return data;
        }
        catch (err) {
            alert("Oops, something went wrong");
        }
    }
}