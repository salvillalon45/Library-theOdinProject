console.log("Inside index.js");

let libraryContainer = document.querySelector(".library-container");
let myLibrary = [];

function Book(title, author, pages, read) {
    // The constructor
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function processNewBookInsertion() {
    let formPage = document.querySelector(".form-page");
    formPage.classList.remove("hidden");
}

function cancelNewBookProcessInsertion() {
    let formPage = document.querySelector(".form-page");
    formPage.classList.add("hidden");
}

function addBookToLibrary() {
    let newBook = prompt("Enter name of book: ", "");
    myLibrary.push(newBook);
    console.log("My Library:: " + myLibrary);
    // if (validateInput(newBook)) {
    //     break;
    // }
}

function render() {

    for (let i = 0; i < myLibrary.length; i++) {
        let currentBook = myLibrary[i];

        let bookCard = document.createElement("div");
        let bookTitle = document.createElement("p");
        let bookAuthor = document.createElement("p");
        let bookPages = document.createElement("p");
        let bookRead = document.createElement("p");

        let bookCardItem = "book-card-" + i;
        bookCard.classList.add(bookCardItem);
        bookTitle.classList.add("book-title");
        bookAuthor.classList.add("book-author");
        bookPages.classList.add("book-pages");
        bookRead.classList.add("book-read");

        bookTitle.innerHTML = currentBook.title;
        bookAuthor.innerHTML = currentBook.author;
        bookPages.innerHTML = currentBook.pages + " pages";
        bookRead.innerHTML = currentBook.read;

        bookCard.append(bookTitle);
        bookCard.append(bookAuthor);
        bookCard.append(bookPages);
        bookCard.append(bookRead);

        libraryContainer.append(bookCard);
    }

}

let title = "The Hobbit";
let author = "J.R.R. Tolkien";
let pages = 295;
let read = "read yet";
myLibrary = [new Book(title, author, pages, read), new Book(title, author, pages, read), new Book(title, author, pages, read), new Book(title, author, pages, read), new Book(title, author, pages, read)];
render();

function validateInput(input) {
    // // If they enter something that is not a number. If they press the esc key, it will return null, but since we are converting the prompt
    // // response into a Number type it will convert null into 0 (zero)
    // if (isNaN(input) || input === 0) {
    //     return false;
    // }
    // // If they enter a number that is too big
    // else if (input >= 1000) {
    //     return false;
    // }
    // // Input is correct
    // else {
    //     return true;
    // }
}
