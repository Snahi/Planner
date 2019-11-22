/* Main script for tasks_page.html. Contains state and basic functions */

// state
let currTableId = 1;

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