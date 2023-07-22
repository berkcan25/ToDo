var addButton = document.getElementById("add-btn");
var toDoList = document.getElementById("todo-list");
var input = document.getElementById("input-text");
var listBtns = document.getElementsByClassName("check-box");
var shownInitialText = false;
var todoItems = [];
//start() contains all the function calls for start up
start();
//Functions for initialization
function start() {
    loadListFromStorage();
    if (!localStorage.getItem("shownInitialText")) {
        createTutorialItem();
    }
    assignEventListeners();
    assignAddButtonBehavior();
}
function createTutorialItem() {
    if (toDoList == null) {
        return;
    }
    var initialItemText = "Welcome to the ToDoApp! To delete this item, simply click the to the left of this text and refresh the page!";
    var listItem = createListItem(initialItemText);
    toDoList.appendChild(listItem);
    shownInitialText = true;
    localStorage.setItem("shownInitialText", shownInitialText.toString());
}
//Functions for button functionality
function assignAddButtonBehavior() {
    if (addButton == null) {
        return;
    }
    addButton.addEventListener("click", function () {
        enterInput();
    });
}
function enterInput() {
    if (input == null) {
        return;
    }
    var inputValue = input.value.trim();
    if (inputValue.length == 0) {
        return;
    }
    addListItem(inputValue);
    input.value = "";
}
input.addEventListener("keyup", function (e) {
    if (e.key === "Enter" || e.keyCode === 13) {
        enterInput();
    }
});
function assignEventListeners() {
    var i = 0;
    while (i < listBtns.length) {
        var listBtn = listBtns.item(i);
        if (listBtn == null) {
            return;
        }
        assignCheckBoxEventListener(listBtn);
    }
}
function assignCheckBoxEventListener(listBtn) {
    listBtn.addEventListener("click", function () {
        removeListItem(listBtn);
    });
}
//Functions for adding a new item to the to-do list
function addListItem(inputValue) {
    if (toDoList == null) {
        return;
    }
    var listItem = createListItem(inputValue);
    toDoList.appendChild(listItem);
    todoItems.push(inputValue);
    saveListToStorage(todoItems);
}
function createListItem(inputValue) {
    var listItem = document.createElement("li");
    listItem.className = "to-do-item";
    listItem.appendChild(createCheckBox());
    var listText = createListItemText(inputValue);
    listItem.appendChild(listText);
    return listItem;
}
function createCheckBox() {
    if (listBtns == null) {
        return;
    }
    var listBtn = document.createElement("div");
    listBtn.className = "btn check-box";
    listBtn.tabIndex = 0;
    assignCheckBoxEventListener(listBtn);
    return listBtn;
}
function createListItemText(inputValue) {
    var listText = document.createElement("div");
    listText.className = "list-item-text";
    listText.innerHTML = inputValue;
    return listText;
}
//Functions for deleting an item from the to-do list
function removeListItem(listBtn) {
    var listText = listBtn.nextSibling;
    if (listText == null) {
        return;
    }
    listText.style.textDecoration = "line-through";
    var listTextString = listText.innerHTML;
    var index = todoItems.indexOf(listTextString);
    if (index == -1) {
        return;
    }
    todoItems.splice(index, 1);
    saveListToStorage(todoItems);
}
//Functions for saving and loading from Local Storage
function saveListToStorage(list) {
    localStorage.setItem("savedTodo", list.toString());
}
function loadListFromStorage() {
    if (toDoList == null) {
        return;
    }
    var restoredItems = localStorage.getItem("savedTodo");
    if (restoredItems == null) {
        return;
    }
    var items = restoredItems ? restoredItems.split(",") : [];
    todoItems = items;
    items.forEach(function (item) {
        var listItem = createListItem(item);
        toDoList.appendChild(listItem);
    });
}
