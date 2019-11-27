/* Main script for tasks_page.html. Contains state and basic functions */

// CONST
const TASK_CREATION_POPUP_ID = "task_creation_popup";

// state
let currTableId         = 1;
let selectedCategories  = [];



function initTasksPage()
{
    /* to be removed when we connect with tables page */ initDB();
    loadCategories();
}



function loadCategories()
{
    currCategories = getAllCategories().filter(category => category.tableId = currTableId);
    displayCategories();
}



function onNewTaskClicked()
{
    populateCategorySelect();
    let newTaskPopup = document.getElementById(TASK_CREATION_POPUP_ID);
    newTaskPopup.style.display = "flex";
}



function populateCategorySelect()
{
    let categorySelect          = document.getElementById(CATEGORY_SELECT_ID);
    categorySelect.innerText    = "";   // clear old value

    currCategories.forEach(category => {
        let option = document.createElement("option");

        option.value        = category.id;
        option.innerText    = category.name;

        categorySelect.appendChild(option);
    })
}