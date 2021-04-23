import "./styles/app.css"

import UI from "./UI.js"


document.addEventListener("DOMContentLoaded", ()=> {
    const ui = new UI();
    ui.renderBooks();
})
/*
window.onload = () => {
    ui.renderBooks();
}
*/

document.getElementById('book-form').addEventListener("submit", e => {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const isbn = document.getElementById("isbn").value;
    const image = document.getElementById("image").files;

    const formData = new FormData();
    formData.append("image", image[0]);
    formData.append("title", title);
    formData.append("author", author);
    formData.append("isbn", isbn);

    const ui = new UI();
    ui.addNewBook(formData);

    ui.renderMessage("Book added!", "success", 5000);

    e.preventDefault();
})


document.getElementById("books-cards").addEventListener("click", e => {
    if (e.target.classList.contains("delete")){
        const ui = new UI();
        ui.deleteBook(e.target.getAttribute("_id"));
        ui.renderMessage("Book removed!", "danger", 5000);
    }

    e.preventDefault();
})
