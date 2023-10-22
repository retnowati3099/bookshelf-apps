const inputBook = document.getElementById("inputBook");
const searchBook = document.getElementById("searchBook");
const checkbox = document.getElementById("inputBookIsComplete");
const incompleteRead = document.getElementById("incompleteRead");
const modal = document.getElementById("modal");
const mode = document.getElementById("mode");
const icon = document.getElementById("iconDarkLight");
let darkMode = true;
const iconDark = "./assets/dark_mode.svg";
const iconLight = "/assets/light_mode.svg";
const localStorageKey = "BOOK_KEY";

window.addEventListener("load", function () {
  isLocalStorageExist();
  const books = JSON.parse(localStorage.getItem(localStorageKey));
  renderCompleteBooks(books);
  renderIncompleteBooks(books);
});

function isLocalStorageExist() {
  const cek = JSON.parse(localStorage.getItem(localStorageKey));
  if (cek == null) {
    localStorage.setItem(localStorageKey, JSON.stringify([]));
  }
}

inputBook.addEventListener("submit", function (event) {
  event.preventDefault();
  addNewBook();
});

function renderCompleteBooks(books) {
  const completedBookList = document.getElementById("completeBookshelfList");
  completedBookList.innerHTML = "";
  const cbooks = books.filter((book) => book.isComplete == true);
  if (cbooks.length === 0) {
    const empty = document.createElement("h4");
    empty.innerText = "Tidak ada buku";
    empty.classList.add("emptyBook");
    completedBookList.append(empty);
  } else {
    for (const bookItem of cbooks) {
      const bookElement = makeNewBook(bookItem, bookItem.isComplete);
      completedBookList.append(bookElement);
    }
  }
  handlerDarkLight();
}

function renderIncompleteBooks(books) {
  const uncompletedBookList = document.getElementById(
    "incompleteBookshelfList"
  );
  uncompletedBookList.innerHTML = "";
  const ubooks = books.filter((book) => book.isComplete == false);
  if (ubooks.length === 0) {
    const empty = document.createElement("h4");
    empty.innerText = "Tidak ada buku";
    empty.classList.add("emptyBook");
    uncompletedBookList.append(empty);
  } else {
    for (const bookItem of ubooks) {
      const bookElement = makeNewBook(bookItem, bookItem.isComplete);
      uncompletedBookList.append(bookElement);
    }
  }
  handlerDarkLight();
}

function addNewBook() {
  const id = +new Date();
  const title = document.getElementById("inputBookTitle").value;
  const author = document.getElementById("inputBookAuthor").value;
  const year = Number(document.getElementById("inputBookYear").value);
  const isComplete = document.getElementById("inputBookIsComplete").checked;
  const bookObject = { id, title, author, year, isComplete };
  isLocalStorageExist();
  const books = JSON.parse(localStorage.getItem(localStorageKey));
  books.push(bookObject);
  localStorage.setItem(localStorageKey, JSON.stringify(books));
  if (isComplete) {
    renderCompleteBooks(books);
  } else {
    renderIncompleteBooks(books);
  }
  handlerDarkLight();
}

function makeNewBook(bookObject, isComplete) {
  const title = document.createElement("h3");
  title.innerText = bookObject.title;
  const author = document.createElement("p");
  author.innerText = bookObject.author;
  const year = document.createElement("p");
  year.innerText = bookObject.year;
  const btnGreen = document.createElement("button");
  btnGreen.classList.add("green");
  if (isComplete) {
    btnGreen.innerText = "Belum selesai dibaca";
  } else {
    btnGreen.innerText = "Selesai dibaca";
  }
  btnGreen.addEventListener("click", function () {
    const books = JSON.parse(localStorage.getItem(localStorageKey));
    const index = books.findIndex((book) => book.id == bookObject.id);
    books[index].isComplete = !books[index].isComplete;
    localStorage.setItem(localStorageKey, JSON.stringify(books));
    renderCompleteBooks(books);
    renderIncompleteBooks(books);
  });
  const btnRed = document.createElement("button");
  btnRed.classList.add("red");
  btnRed.innerText = "Hapus buku";
  btnRed.addEventListener("click", function () {
    const books = JSON.parse(localStorage.getItem(localStorageKey));
    const index = books.findIndex((book) => book.id == bookObject.id);
    modal.style.display = "block";
    const cancelBtn = document.getElementById("cancel");
    cancelBtn.addEventListener("click", function () {
      modal.style.display = "none";
    });
    const deleteBtn = document.getElementById("delete");
    deleteBtn.addEventListener("click", function () {
      modal.style.display = "none";
      books.splice(index, 1);
      localStorage.setItem(localStorageKey, JSON.stringify(books));
      renderCompleteBooks(books);
      renderIncompleteBooks(books);
    });
  });
  const btnBlue = document.createElement("button");
  btnBlue.classList.add("blue");
  btnBlue.innerText = "Edit buku";
  btnBlue.addEventListener("click", function () {
    console.log("editing..." + bookObject.title);
    const editDialog = document.createElement("dialog");
    const title = document.createElement("h1");
    title.innerText = bookObject.title;
    console.log(title.textContent);
    editDialog.append(title);
    editDialog.open = true;
  });
  const action = document.createElement("div");
  action.classList.add("action");
  action.append(btnGreen, btnRed, btnBlue);
  const bookItem = document.createElement("article");
  bookItem.classList.add("book_item");
  bookItem.append(title, author, year, action);
  return bookItem;
}

searchBook.addEventListener("submit", function (event) {
  event.preventDefault();
  const query = document.getElementById("searchBookTitle").value;
  isLocalStorageExist();
  const books = JSON.parse(localStorage.getItem(localStorageKey));
  const searchResult = books.filter((book) =>
    book.title.toLowerCase().includes(query.toLowerCase())
  );
  renderCompleteBooks(searchResult);
  renderIncompleteBooks(searchResult);
});

checkbox.addEventListener("click", function () {
  if (checkbox.checked) {
    incompleteRead.textContent = "Selesai dibaca";
  } else {
    incompleteRead.textContent = "Belum selesai dibaca";
  }
});

mode.addEventListener("click", function () {
  const sectionElement = document.querySelectorAll("section");
  const bookItemElement = document.querySelectorAll(".book_item");
  const inputElement = document.querySelectorAll("input");
  const emptyBookElement = document.querySelectorAll(".emptyBook");
  const searchLabelElement = document.getElementById("searchBookTitleLabel");
  if (darkMode) {
    icon.src = iconLight;
    document.getElementsByTagName("body")[0].style.backgroundColor = "black";
    sectionElement.forEach(
      (element) => (element.style.borderColor = "cornflowerblue")
    );
    bookItemElement.forEach((element) => {
      element.style.borderColor = "cornflowerblue";
      element.style.color = "white";
    });
    inputElement.forEach(
      (element) => (element.style.borderColor = "cornflowerblue")
    );
    emptyBookElement.forEach((element) => (element.style.color = "white"));
    searchLabelElement.style.color = "white";
    darkMode = false;
  } else {
    icon.src = iconDark;
    document.getElementsByTagName("body")[0].style.backgroundColor = "white";
    sectionElement.forEach((element) => (element.style.borderColor = "black"));
    bookItemElement.forEach((element) => {
      element.style.borderColor = "black";
      element.style.color = "black";
    });
    inputElement.forEach((element) => (element.style.borderColor = "black"));
    emptyBookElement.forEach((element) => (element.style.color = "black"));
    searchLabelElement.style.color = "black";
    darkMode = true;
  }
});
