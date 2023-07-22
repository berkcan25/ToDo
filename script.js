const addButton = document.getElementById("add-btn");
const toDoList = document.getElementById("todo-list");
const input = document.getElementById("input-text");
const listBtns = document.getElementsByClassName("check-box");

let todoItems = [];

loadListFromStorage();
assignEventListeners();

addButton.addEventListener("click", () => {
    const inputValue = input.value.trim();
    if (inputValue.length == 0) {return}
    addListItem(inputValue);
    input.value = "";
});

function assignEventListeners() {
    for (i in listBtns) {
        const listBtn = listBtns.item(i);
        if (listBtn == null) {return}
        listBtn.addEventListener("click", () => {
            const listText = listBtn.nextSibling;
            if (listText == null) {return}
            listText.style.textDecoration = "line-through";
        })
    }
}

//Functions for adding a new item to the to-do list

function addListItem(inputValue) {
    listItem = createListItem(inputValue);
    toDoList.appendChild(listItem);
    todoItems.push(inputValue);
    saveListToStorage(todoItems);
}

function createListItem(inputValue) {
    const listItem = document.createElement("li");
    listItem.appendChild(createCheckBox());
    const listText = createListItemText(inputValue);
    listItem.appendChild(listText);
    return listItem;
}

function createCheckBox() {
    const listBtn = document.createElement("div");
    listBtn.className = "btn check-box";
    listBtn.tabIndex = "0";
    return listBtn;
}

function createListItemText(inputValue) {
    const listText = document.createElement("div");
    listText.className = "list-item-text";
    listText.innerHTML = inputValue;
    return listText;
}


//Functions for saving and loading from Local Storage

function saveListToStorage(list) {
    localStorage.setItem("savedTodo", list);
}

function loadListFromStorage() {
    let items = localStorage.getItem("savedTodo");
    if (items == null) {return}
    items = items.split(",");
    todoItems = items;
    items.forEach(item => {
        const listItem = createListItem(item);
        toDoList.appendChild(listItem);
    });
}