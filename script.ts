const addButton = document.getElementById("add-btn");
const toDoList = document.getElementById("todo-list");
const input = <HTMLInputElement>document.getElementById("input-text");
const listBtns = document.getElementsByClassName("check-box");
let shownInitialText = false;

let todoItems:String[] = [];

//start() contains all the function calls for start up
start();

//Functions for initialization
function start() {
    loadListFromStorage();
    if (!localStorage.getItem("shownInitialText")) {createTutorialItem()}
    assignEventListeners();
    assignAddButtonBehavior();
}

function createTutorialItem() {
    if (toDoList == null) {return}
    const initialItemText = "Welcome to the ToDoApp! To delete this item, simply click the to the left of this text and refresh the page!";
    const listItem = createListItem(initialItemText);
    toDoList.appendChild(listItem);
    shownInitialText = true;
    localStorage.setItem("shownInitialText", shownInitialText.toString());
}

//Functions for button functionality
function assignAddButtonBehavior() {
    if (addButton == null) {return}
    addButton.addEventListener("click", () => {
        enterInput();
    });
}

function enterInput() {
    if (input == null) {return}
    const inputValue = input.value.trim();
    if (inputValue.length == 0) {return}
    addListItem(inputValue);
    input.value = "";
}

input.addEventListener("keyup", (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
        enterInput();
    }
});

function assignEventListeners() {
    let i = 0;
    while (i < listBtns.length) {
        const listBtn = listBtns.item(i);
        if (listBtn == null) {return}
        assignCheckBoxEventListener(listBtn);
        i++;
    }
}

function assignCheckBoxEventListener(listBtn:Element) {
    listBtn.addEventListener("click", () => {
        removeListItem(listBtn);

    });
}

//Functions for adding a new item to the to-do list
function addListItem(inputValue:string) {
    if (toDoList == null) {return}
    const listItem = createListItem(inputValue);
    toDoList.appendChild(listItem);
    todoItems.push(inputValue);
    saveListToStorage(todoItems);
}

function createListItem(inputValue:string) {
    const listItem = document.createElement("li");
    listItem.className = "to-do-item";
    listItem.appendChild(<Node>createCheckBox());
    const listText = createListItemText(inputValue);
    listItem.appendChild(listText);
    return listItem;
}

function createCheckBox() {
    if (listBtns == null) {return}
    const listBtn = document.createElement("div");
    listBtn.className = "btn check-box";
    listBtn.tabIndex = 0;
    assignCheckBoxEventListener(listBtn);
    return listBtn;
}

function createListItemText(inputValue:string) {
    const listText = document.createElement("div");
    listText.className = "list-item-text";
    listText.innerHTML = inputValue;
    return listText;
}

//Functions for deleting an item from the to-do list
function removeListItem(listBtn:Element) {
    const listText = <HTMLElement>listBtn.nextSibling;
    if (listText == null) {return}
    listText.style.textDecoration = "line-through";
    const listTextString = listText.innerHTML;
    const index = todoItems.indexOf(listTextString);
    if (index == -1) {return}
    todoItems.splice(index, 1);
    saveListToStorage(todoItems);
}


//Functions for saving and loading from Local Storage
function saveListToStorage(list:String[]) {
    localStorage.setItem("savedTodo", list.toString());
}

function loadListFromStorage() {
    if (toDoList == null) {return}
    let restoredItems = localStorage.getItem("savedTodo");
    if (restoredItems == null) {return}
    const items = restoredItems ? restoredItems.split(",") : [];
    todoItems = items;
    items.forEach(item => {
        const listItem = createListItem(item);
        toDoList.appendChild(listItem);
    });
}