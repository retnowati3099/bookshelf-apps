const inputBook = document.getElementById("inputBook");
const searchBook = document.getElementById("searchBook");
const books = [];
inputBook.addEventListener("submit", function(event){
    event.preventDefault();
    addNewBook();
})

function renderCompleteBooks (books){
    const completedBookList = document.getElementById("completeBookshelfList");
        completedBookList.innerHTML = ""
        const cbooks =books.filter((book)=>book.isComplete == true)
        for(const bookItem of cbooks){
            const bookElement= makeNewBook(bookItem, bookItem.isComplete);
            completedBookList.append(bookElement)
        }
        console.log(completedBookList)
}

function renderIncompleteBooks (books){
    const uncompletedBookList = document.getElementById("incompleteBookshelfList");
        uncompletedBookList.innerHTML = ""
        const ubooks = books.filter((book)=>book.isComplete == false)
        ubooks.reverse()
        for(const bookItem of ubooks){
            books.filter((book)=>book.isComplete == false)
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

    books.push(bookObject)
    console.log(books)
    if(isComplete){
        renderCompleteBooks(books)
    }else{
        renderIncompleteBooks(books)
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
        btnGreen.innerText = "Selesai dibaca";
    }else{
        btnGreen.innerText = "Belum selesai dibaca";
    }
    btnGreen.addEventListener("click", function(){
        const index = books.findIndex((book)=> book.id == bookObject.id)
        books[index].isComplete =  !books[index].isComplete
        renderCompleteBooks(books)
        renderIncompleteBooks(books)
    })

    const btnRed = document.createElement("button");
    btnRed.classList.add("red")
    btnRed.innerText = "Hapus buku"
    btnRed.addEventListener('click', function(bookObject){
        const index = books.findIndex((book)=> book.id == bookObject.id)
        books.splice(index, 1)
        renderCompleteBooks(books)
        renderIncompleteBooks(books)
    })

    const action = document.createElement("div");
    action.classList.add("action")
    action.append(btnGreen, btnRed);

    const bookItem = document.createElement("article");
    bookItem.classList.add("book_item");

    bookItem.append(title, author, year, action)

    return bookItem;
}

function handlerDelete(id){
    // console.log(`button dengan id ${id} ditekan`)
    // const notDeletedBook = books.filter((book) => book.id !== id)
    // console.log(notDeletedBook)
}

searchBook.addEventListener("submit", function(event){
    event.preventDefault();
    console.log("search")
})

const localStorageKey = 'BOOK_KEY'
if(typeof Storage !== 'undefined'){
    if(localStorage.getItem(localStorageKey) === null){
        localStorage.setItem(localStorageKey, JSON.stringify([]));
    }

    const inputBook = document.getElementById("inputBook");
    inputBook.addEventListener("submit", function(event){
        event.preventDefault();
        addNewBook();
    })

    function addNewBook(){
        const id = +new Date();
        const title = document.getElementById("inputBookTitle").value;
        const author = document.getElementById("inputBookAuthor").value;
        const year= Number(document.getElementById("inputBookYear").value);
        const isComplete = document.getElementById("inputBookIsComplete").checked;   
        const bookObject = {id, title, author, year, isComplete}

        let booksData = localStorage.getItem(localStorageKey);
        booksData = JSON.parse(booksData);
        booksData.push(bookObject);
        localStorage.setItem(localStorageKey, JSON.stringify(booksData));
        localStorage.setItem(localStorageKey, booksData)
        let books = localStorage.getItem(localStorageKey)
        if(books[books.length - 1].isComplete){
            renderCompleteBooks(books)
        }else{
            renderIncompleteBooks(books)
        }
    }

    function renderCompleteBooks (books){
        const completedBookList = document.getElementById("completeBookshelfList");
        completedBookList.innerHTML = ""
        const cbooks = books.filter((book)=>book.isComplete == true)
        for(const item of cbooks){
            const bookElement= makeNewBook(item);
            completedBookList.append(bookElement)
        }
    }

    function renderIncompleteBooks (books){
        const uncompletedBookList = document.getElementById("incompleteBookshelfList");
        uncompletedBookList.innerHTML = ""
        const ubooks = books.filter((book)=>book.isComplete == false)
        ubooks.reverse()
        for(const item of ubooks){
            books.filter((book)=>book.isComplete == false)
            const bookElement= makeNewBook(item);
            uncompletedBookList.append(bookElement)
        }
    }

function makeNewBook(item) {
    const title = document.createElement('h3');
    title.innerText = item.title;

    const author = document.createElement("p");
    author.innerText = bookItem.author;

    const year = document.createElement("p");
    year.innerText= item.year;

    const btnGreen = document.createElement("button");
    btnGreen.classList.add("green");
    if(isComplete){
        btnGreen.innerText = "Selesai dibaca";
    }else{
        btnGreen.innerText = "Belum selesai dibaca";
    }
    btnGreen.addEventListener("click", function(){
        let books = localStorage.getItem(localStorageKey)
        const index = books.findIndex((book)=> book.id == item.id)
        books[index].isComplete =  !books[index].isComplete
        renderCompleteBooks(books)
        renderIncompleteBooks(books)
    })

    const btnRed = document.createElement("button");
    btnRed.classList.add("red")
    btnRed.innerText = "Hapus buku"
    btnRed.addEventListener('click', function(){
        let books = localStorage.getItem(localStorageKey)
        const index = books.findIndex((book)=> book.id == bookItem.id)
        books.splice(index, 1)
        renderCompleteBooks(books)
        renderIncompleteBooks(books)
    })

    const action = document.createElement("div");
    action.classList.add("action")
    action.append(btnGreen, btnRed);

    const bookItem = document.createElement("article");
    bookItem.classList.add("book_item");

    bookItem.append(title, author, year, action)

    return bookItem;
}
    
}else {
    alert('Browser yang Anda gunakan tidak mendukung Web Storage');
}
