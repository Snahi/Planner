/* Main script for tasks_page.html. Contains state and basic functions */

// CONST
const TASK_CREATION_POPUP_ID = "task_creation_popup";

// state
let currTableId         = -1;
let selectedCategories  = [];



function initTasksPage()
{
    currTableId = getCookie(CURR_TABLE_ID);
    loadDBFromCookies();
    loadCategories();
    updateSearchInputDataSource();
}



function loadCategories()
{
    currCategories = getAllCategories().filter(category => category.tableId == currTableId);
    createCalendar();
    refreshCategories();
}



function onNewTaskClicked()
{
    populateCategorySelect(document.getElementById(NEW_TASK_CATEGORY_SELECT_ID));
    let newTaskPopup = document.getElementById(TASK_CREATION_POPUP_ID);
    newTaskPopup.style.display = "block";
}



function onCloseTaskCreationPopupClicked()
{
    closeTaskCreationPopup();
}



function populateCategorySelect(categorySelect)
{
    categorySelect.innerText    = "";   // clear old value

    currCategories.forEach(category => {
        let option = document.createElement("option");

        option.value        = category.id;
        option.innerText    = category.name;

        categorySelect.appendChild(option);
    })
}



/* search tasks //////////////////////////////////////////////////////////////////////////////////////////////////////*/



function updateSearchInputDataSource()
{
    let source = tasks.filter(task => task.tableId = currTableId).map(function(tk) {
        return {
            label:
                tk.title + " - " +
                tk.start.toLocaleDateString() + ", " +
                (tk.description.length > 40 ? tk.description.substr(0, 37) + "..." : tk.description),
            value: tk.title,
            task: tk};
    });

    $('#input_search').autocomplete({
        source: source,
        select: function(event, ui)
            {
                showTaskDetails(ui.item.task);
            }
    });
}



/* sign out //////////////////////////////////////////////////////////////////////////////////////////////////////////*/



function signOut()
{
    window.location.href = 'homepage.html';
}



