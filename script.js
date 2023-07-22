const addButton = document.getElementById("add-btn");
const toDoList = document.getElementById("todo-list");
const input = document.getElementById("input-text");
const listBtns = document.getElementsByClassName("check-box");

let todoItems = [];

//start() contains all the function calls for start up
start();

//Functions for initialization
function start() {
    loadListFromStorage();
    const listItems = document.getElementsByClassName("to-do-item");
    if (listItems.length == 0) {createTutorialItem()}
    assignEventListeners();
    assignAddButtonBehavior();
}

function createTutorialItem() {
    const initialItemText = "Welcome to the ToDoApp! To delete this item, simply click the to the left of this text and refresh the page!";
    listItem = createListItem(initialItemText);
    toDoList.appendChild(listItem);
}

function assignAddButtonBehavior() {
    addButton.addEventListener("click", () => {
        const inputValue = input.value.trim();
        if (inputValue.length == 0) {return}
        addListItem(inputValue);
        input.value = "";
    });
}


function assignEventListeners() {
    for (i in listBtns) {
        const listBtn = listBtns.item(i);
        if (listBtn == null) {return}
        assignCheckBoxEventListener(listBtn);
    }
}

function assignCheckBoxEventListener(listBtn) {
    listBtn.addEventListener("click", () => {removeListItem(listBtn)});
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
    listItem.className = "to-do-item";
    listItem.appendChild(createCheckBox());
    const listText = createListItemText(inputValue);
    listItem.appendChild(listText);
    return listItem;
}

function createCheckBox() {
    const listBtn = document.createElement("div");
    listBtn.className = "btn check-box";
    listBtn.tabIndex = "0";
    assignCheckBoxEventListener(listBtn);
    return listBtn;
}

function createListItemText(inputValue) {
    const listText = document.createElement("div");
    listText.className = "list-item-text";
    listText.innerHTML = inputValue;
    return listText;
}

//Functions for deleting an item from the to-do list

function removeListItem(listBtn) {
    const listText = listBtn.nextSibling;
    if (listText == null) {return}
    listText.style.textDecoration = "line-through";
    const listTextString = listText.innerHTML;
    const index = todoItems.indexOf(listTextString);
    if (index == -1) {return}
    console.log(todoItems.splice(index, 1));
    todoItems = todoItems.splice(index, 1);
    saveListToStorage(todoItems);
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
        if (item == false){return}
        const listItem = createListItem(item);
        toDoList.appendChild(listItem);
    });
}