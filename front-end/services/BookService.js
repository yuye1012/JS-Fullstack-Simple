class BookService {
    constructor(){
        this.URI = "/api/books";
    }

    async getBooks(){
        const response = await fetch(this.URI);
        const books = await response.json();
        return books;
    }

    async postBook(book){
        const res = await fetch(this.URI, {
            method: "POST",
            body: book
        });
        console.log(res);
        return res;
    }

    async deleteBook(idBook){
        const res = await fetch(`${this.URI}/${idBook}`, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "DELETE"
        });
        console.log(res);
    }
}

export default BookService;