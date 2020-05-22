console.log("Inside index.js");

const database = firebase.database();
let databaseData = "";
let myLibrary = [];
let debug = 0;

function Book(title, author, pages, read) {
    // The constructor
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.updateRead = function(index) {
    let currentStateRead = this.read;

    let databaseArrayKeys = Object.keys(databaseData);
    let key = databaseArrayKeys[index];
    let databaseReferenceUpdate = database.ref("books/" + key);

    if (currentStateRead === "I've read it") {
        this.read = "Not read";
    }
    else {
        this.read = "I've read it";
    }

    // Update the value read in the database for the selected book
    databaseReferenceUpdate.update({
       read : this.read
    });
};

Book.prototype.removeBook = function(index) {
    let databaseArrayKeys = Object.keys(databaseData);
    let key = databaseArrayKeys[index];
    let databaseReferenceRemove = database.ref("books/" + key);

    // Remove the selected book from the database
    databaseReferenceRemove.remove()
        .then(function() {
            console.log("Remove succeeded.")
        })
        .catch(function(error) {
            console.log("Remove failed: " + error.message)
        });
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

function pushToDatabase(title, author, pages, read) {
    // Insert a new book into the database
    let reference = database.ref("books");
    let newReference = reference.push();
    newReference.set({
        title : title,
        author : author,
        pages : pages,
        read : read
    });
}

function addBookToLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    pushToDatabase(title, author, pages, read);
}

function render() {
    let libraryContainer = document.querySelector(".library-container");
    libraryContainer.innerHTML = '';

    let databaseReference = database.ref("books");

    databaseReference.on("value", function (snapshot) {

        // Get all the values in the database
        databaseData = snapshot.val();

        let databaseArrayValues = Object.values(databaseData);

        for (let i = 0; i < databaseArrayValues.length; i++) {
            const databaseBook = databaseArrayValues[i];
            let currentBook = new Book(databaseBook.title, databaseBook.author, databaseBook.pages, databaseBook.read);

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
                currentBook.updateRead(bookCardTools.id);
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
    });
}

debug === 1 && (addBookToLibrary("The Fellowship of the Ring", "J.R.R. Tolkien", 423, "Not read"));
debug === 1 && (addBookToLibrary("Flowers for Algernon", "Daniel Keyes", 311, "Not read"));
debug === 1 && (addBookToLibrary("Alice in Wonderland", "Lewis Carroll", 200, "Not read"));
debug === 1 && (addBookToLibrary("1984", "George Orwell", 328, "I've read it"));
debug === 1 && (addBookToLibrary("Slaughterhouse-Five", "Kurt Vonnegut", 215, "I've read it"));
render();
