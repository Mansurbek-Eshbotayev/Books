let elList = document.querySelector(".books__list");
let elform = document.querySelector(".books__form");
let elLanguageSelect = document.querySelector(".form__lenguage");
let elSortSelect = document.querySelector(".form__sort");
let elSearch = document.querySelector(".form__search");
let elSortLanguage = document.querySelector(".form__lenguage");
let elSort = document.querySelector(".form__sort");

// splise
let booksLittle = books.slice(0,28)

// create function
let listFragment = new DocumentFragment();
function CreateList(arr,element){
  element.innerHtML = ""
  arr.forEach(item => {
    let newItem = document.createElement("li");
    newItem.setAttribute("class","book__item mb-5")
    let info = 
    `
    <div class="card" style="width: 18rem;">
    <img src="${item.imageLink}" class="card__img img-fliuid" alt="books">
    <div class="card-body">
    <h5 class="card-title">${item.title}</h5>
    <p class="card-text">${item.author}</p>
    <div class="d-flex justify-content-between align-items-center mb-3">
          <span class="info__year d-flex align-items-center">${item.year}</span>
          <span class="info__page d-flex align-items-center">${item.pages}</span>
          <span class="info__language d-flex align-items-center">${item.language}</span>
        </div>
    <a href="${item.link}" class="btn btn-primary" target="blank">Wikipedia</a>
    </div>
    </div>
    `;

    newItem.innerHTML = info;
    listFragment.appendChild(newItem);
  });
  elList.appendChild(listFragment)
}
CreateList(booksLittle,elList);

// language select 
let optionLang = [];
books.forEach(item => {
  let langArr = [];
  langArr.push(item.language)
  langArr.forEach(result => {
    if(!optionLang.includes(result)){
       optionLang.push(result)
    }
  })
})
// create language option;

let newFragmentOption = new DocumentFragment();
optionLang.forEach(item => {
  let newOption = document.createElement("option");
  newOption.textContent = item;
  newOption.value = item;
  newFragmentOption.appendChild(newOption);
})
elLanguageSelect.appendChild(newFragmentOption);

// Barchasini jamlovchi function
function showBooks (item){
  return books.filter(book => {
    let allThis = book.title.match(item) && 
    (elSortLanguage.value === "All" || book.language.includes(elSortLanguage.value));
    return allThis
  })
}

// sort books
function sortBook(arr,element){
  if(element === "a-z"){
    arr.sort((a,b) => a.title.charCodeAt(0) - b.title.charCodeAt(0))
  }else if(element === "z-a"){
    arr.sort((a,b) => b.title.charCodeAt(0) - a.title.charCodeAt(0))
  }else if(element === "page-high"){
    arr.sort((a,b) => a.pages - b.pages)
  }else if(element === "page-low"){
    arr.sort((a,b) => b.pages - a.pages)
  }else if(element === "year-high"){
    arr.sort((a,b) => a.year - b.year)
  }else if(element === "year-low"){
    arr.sort((a,b) => b.year - a.year)
  }
}

// Submit section
elform.addEventListener("submit",function(evt){
  evt.preventDefault();
  elList.innerHTML =""
  let newRex = RegExp(elSearch.value.trim(), "gi");
  let filterList = showBooks(newRex);
  sortBook(filterList,elSortSelect.value)
  CreateList(filterList,elList);

  elList.appendChild(listFragment)

})
