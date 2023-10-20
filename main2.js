const localStorageKey = 'BOOK_KEY'

window.addEventListener("load", function(){
    console.log("load...")
    isLocalStorageExist()
    const books = JSON.parse(localStorage.getItem(localStorageKey))
    renderCompleteBooks(books)
    renderIncompleteBooks(books)
})

function isLocalStorageExist(){
    const cek = JSON.parse(localStorage.getItem(localStorageKey))
    if(cek == null){
        localStorage.setItem(localStorageKey, JSON.stringify([]))
    }
}

const inputBook = document.getElementById("inputBook");
const searchBook = document.getElementById("searchBook");
inputBook.addEventListener("submit", function(event){
    event.preventDefault();
    addNewBook();
})

function renderCompleteBooks (books){
    const completedBookList = document.getElementById("completeBookshelfList");
    completedBookList.innerHTML = "";
    const cbooks = books.filter((book)=>book.isComplete == true)
    for(const bookItem of cbooks){
        const bookElement= makeNewBook(bookItem, bookItem.isComplete);
        completedBookList.append(bookElement)
    }
}

function renderIncompleteBooks (books){
    const uncompletedBookList = document.getElementById("incompleteBookshelfList");
    uncompletedBookList.innerHTML = ""
    const ubooks = books.filter((book)=>book.isComplete == false)
    // ubooks.reverse()
    for(const bookItem of ubooks){
        // books.filter((book)=>book.isComplete == false)
        const bookElement= makeNewBook(bookItem, bookItem.isComplete);
        uncompletedBookList.append(bookElement)
    }
}

function addNewBook() {
    const id = +new Date();
    const title = document.getElementById("inputBookTitle").value;
    const author = document.getElementById("inputBookAuthor").value;
    const year= Number(document.getElementById("inputBookYear").value);
    const isComplete = document.getElementById("inputBookIsComplete").checked;

    const bookObject = {id, title, author, year, isComplete}

    isLocalStorageExist()
    const books = JSON.parse(localStorage.getItem(localStorageKey))
    books.push(bookObject)
    localStorage.setItem(localStorageKey, JSON.stringify(books))
    console.log(books)
    if(isComplete){
        renderCompleteBooks(books)
    }else{
        renderIncompleteBooks(books)
    }
   
    const listCompleteBook = books.filter((book)=> book.isComplete == true)
    console.log(listCompleteBook)
    const listUncompleteBook = books.filter((book)=> book.isComplete == false)
    console.log(listUncompleteBook)
    console.log(listCompleteBook, listUncompleteBook)
    const completedBookList = document.getElementById("completeBookshelfList");
    
    if(listCompleteBook.length>0){
        completedBookList.innerHTML = ""
        for(const bookItem of listCompleteBook){
            const bookElement= makeNewBook(bookItem);
            completedBookList.append(bookElement)
        }
    }
    
        
    const uncompletedBookList = document.getElementById("incompleteBookshelfList");
    if(listUncompleteBook.length>0){
        uncompletedBookList.innerHTML = ""
        for(const bookItem of listUncompleteBook){
            const bookElement= makeNewBook(bookItem);
            uncompletedBookList.append(bookElement)
        }
    }      
}

function makeNewBook(bookObject, isComplete) {
    const title = document.createElement('h3');
    title.innerText = bookObject.title;

    const author = document.createElement("p");
    author.innerText = bookObject.author;

    const year = document.createElement("p");
    year.innerText= bookObject.year;

    const btnGreen = document.createElement("button");
    btnGreen.classList.add("green");
    if(isComplete){
        btnGreen.innerText = "Belum selesai dibaca";
    }else{
        btnGreen.innerText = "Selesai dibaca";
    }
    btnGreen.addEventListener("click", function(){
        const books = JSON.parse(localStorage.getItem(localStorageKey))
        const index = books.findIndex((book)=> book.id == bookObject.id)
        books[index].isComplete =  !books[index].isComplete
        localStorage.setItem(localStorageKey, JSON.stringify(books))
        renderCompleteBooks(books)
        renderIncompleteBooks(books)
    })

    const btnRed = document.createElement("button");
    btnRed.classList.add("red")
    btnRed.innerText = "Hapus buku"
    btnRed.addEventListener('click', function(bookObject){
        const books = JSON.parse(localStorage.getItem(localStorageKey))
        const index = books.findIndex((book)=> book.id == bookObject.id)
        const confirm = window.confirm("Apakah Anda yakin ingin menghapus buku ini?")
        if(confirm){
            books.splice(index, 1)
            localStorage.setItem(localStorageKey, JSON.stringify(books))
            renderCompleteBooks(books)
            renderIncompleteBooks(books)
        }
    })

    const action = document.createElement("div");
    action.classList.add("action")
    action.append(btnGreen, btnRed);

    const bookItem = document.createElement("article");
    bookItem.classList.add("book_item");

    bookItem.append(title, author, year, action)

    return bookItem;
}

searchBook.addEventListener("submit", function(event){
    event.preventDefault();
    const query = document.getElementById("searchBookTitle").value

    isLocalStorageExist()
    const books = JSON.parse(localStorage.getItem(localStorageKey))
    books.filter((book) => book.title.toLowerCase().includes(query.toLowerCase())).map((bookSearch) => {renderCompleteBooks(bookSearch); renderIncompleteBooks(bookSearch)})
})


    
    
