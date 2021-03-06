import BookService from "./services/BookService"
const bookService = new BookService();

import { format } from 'timeago.js'

class UI {

    async renderBooks() {
        const books = await bookService.getBooks();

        const booksCardContainer = document.getElementById("books-cards");
        booksCardContainer.innerHTML = "";
        books.forEach(book => {
            const div = document.createElement("div");
            div.className = "";
            div.innerHTML = `
                <div class="card m-2">
                    <div class="row">
                        <div class="col-md-4">
                            <img src="${book.imagePath}" alt="" class="img-fluid" />
                        </div>

                        <div class="col-md-8">
                            <div class="card-block px-2" >
                                <h4 class="card-title" >${book.title}</h4>
                                <p class="card-text" >${book.author}</p>
                                <a hred="" class="btn btn-danger delete" _id="${book._id}">X</a>
                            </div>
                        </div>
                    </div>

                    <div class="card-footer">
                        ${format(book.created_at)}
                    </div>
                </div>
            `;
            booksCardContainer.appendChild(div);
        })
    }

    async addNewBook(book) {
        await bookService.postBook(book);
        this.clearBookform();
        this.renderBooks();
    }

    clearBookform() {
        document.getElementById("book-form").reset();
    }

    async deleteBook(idBook){
        await bookService.deleteBook(idBook);
        this.renderBooks();
    }

    renderMessage(message, color, second){
        const div = document.createElement("div");
        div.className = `alert alert-${color} message`;
        div.appendChild(document.createTextNode(message));

        // obtener el contenedor de formularios
        const container = document.querySelector(".col-md-4");
        // obtener el elemento formulario
        const bookForm = document.querySelector("#book-form");

        // insertar el nuevo elemento (mensaje) antes del formulario
        container.insertBefore(div, bookForm);

        // eliminar el elemento mensaje despues de n segundos
        setTimeout(() => {
            document.querySelector(".message").remove();
        }, second);
    }
}

export default UI;
