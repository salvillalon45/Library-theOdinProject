// import firebase from "./firebase/firebaseConfig";

console.log("Inside index.js");

let myLibrary = [];
// Get a reference to the database service


function Book(title, author, pages, read) {
    // The constructor
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.updateRead = function() {
    let currentStateRead = this.read;

    if (currentStateRead === "I've read it") {
        this.read = "Not read";
    }
    else {
        this.read = "I've read it";
    }
};

Book.prototype.removeBook = function(index) {
    myLibrary.splice(index, 1);
};

const addButton = document.querySelector(".add");
addButton.addEventListener("click", () => {

    let newTitle = document.forms["BookForm"]["title"];
    let newAuthor = document.forms["BookForm"]["author"];
    let newPages = document.forms["BookForm"]["pages"];
    let newRead = document.forms["BookForm"]["read"];

    if (newTitle.value.length === 0 || newAuthor.value.length === 0 || newPages.value === 0) {
        alert("Need to include fill in the form!");
    }
    else {
        addBookToLibrary(newTitle.value, newAuthor.value, newPages.value, newRead.value);
        render();
        closeForm();
    }

});

function openForm() {
    let formPage = document.querySelector(".form-page");
    formPage.classList.remove("hidden");
}

function closeForm() {
    let formPage = document.querySelector(".form-page");
    formPage.classList.add("hidden");
    clearFormFields();
}

function clearFormFields() {
    document.forms["BookForm"].reset();
}

function addBookToLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);

    // firebase.database().ref().child("books").set({
    //     title : title,
    //     author : author,
    //     pages : pages,
    //     read : read
    // });

    console.log("myLibrary:: " + myLibrary);
    // if (validateInput(newBook)) {
    //     break;
    // }
}

function render() {

    let libraryContainer = document.querySelector(".library-container");
    libraryContainer.innerHTML = '';

    for (let i = 0; i < myLibrary.length; i++) {
        const currentBook = myLibrary[i];

        const bookCard = document.createElement("div");
        const bookTitle = document.createElement("p");
        const bookAuthor = document.createElement("p");
        const bookPages = document.createElement("p");

        const bookCardTools = document.createElement("div");
        const bookRead = document.createElement("p");
        const bookTrash = document.createElement("p");
        const bookCheckMark = document.createElement("p");

        bookCard.classList.add("book-card");
        bookTitle.classList.add("book-title");
        bookAuthor.classList.add("book-author");
        bookPages.classList.add("book-pages");

        bookCardTools.classList.add("book-card-tools-container");
        bookCardTools.id = String(i);
        bookRead.classList.add("book-read");
        bookCheckMark.addEventListener("click", (e) => {
            currentBook.updateRead();
            render();
        });

        bookTrash.addEventListener("click", (e) => {
           currentBook.removeBook(bookCardTools.id);
           render();
        });

        bookTitle.innerHTML = currentBook.title;
        bookAuthor.innerHTML = currentBook.author;
        bookPages.innerHTML = currentBook.pages + " pages";
        bookRead.innerHTML = currentBook.read;
        bookTrash.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
        bookCheckMark.innerHTML = '<i class="fa fa-check" aria-hidden="true"></i>';

        bookCard.append(bookTitle);
        bookCard.append(bookAuthor);
        bookCard.append(bookPages);

        bookCardTools.append(bookRead);
        bookCardTools.append(bookTrash);
        bookCardTools.append(bookCheckMark);

        bookCard.append(bookCardTools);

        libraryContainer.append(bookCard);
    }
}

addBookToLibrary("The Fellowship of the Ring", "J.R.R. Tolkien", 423, "Not read");
addBookToLibrary("Flowers for Algernon", "Daniel Keyes", 311, "Not read");
addBookToLibrary("Alice in Wonderland", "Lewis Carroll", 200, "Not read");
addBookToLibrary("1984", "George Orwell", 328, "I've read it");
addBookToLibrary("Slaughterhouse-Five", "Kurt Vonnegut", 215, "I've read it");
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
