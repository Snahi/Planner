// Const
const TASK_TITLE_ID             = "task_title";
const TASK_DESC_ID              = "task_description";
const TASK_START_DAT_ID         = "task_start";
const TASK_START_TIM_ID         = "task_start_time";
const TASK_END_DAT_ID           = "task_end";
const TASK_END_TIM_ID           = "task_end_time";
const TASK_CATEGORY_ID          = "task_category";
const TASK_HASH_TAGS_ID         = "task_hash_tags";
const TASK_DETAILS_POPUP_ID     = "task_details_popup";
const BUT_SAVE_ID               = "but_save_task_changes";
const BUT_DELETE_ID             = "but_delete_task";



function showTaskDetails(task)
{
    let title       = document.getElementById(TASK_TITLE_ID);
    let desc        = document.getElementById(TASK_DESC_ID);
    let startDat    = document.getElementById(TASK_START_DAT_ID);
    let startTim    = document.getElementById(TASK_START_TIM_ID);
    let endDat      = document.getElementById(TASK_END_DAT_ID);
    let endTim      = document.getElementById(TASK_END_TIM_ID);
    let category    = document.getElementById(TASK_CATEGORY_ID);
    let hashTags    = document.getElementById(TASK_HASH_TAGS_ID);

    let hoursStart      = task.start.getHours() < 10 ? "0" + task.start.getHours() : task.start.getHours();
    let minutesStart    = task.start.getMinutes() < 10 ? "0" + task.start.getMinutes() : task.start.getMinutes();
    let hoursEnd      = task.end.getHours() < 10 ? "0" + task.end.getHours() : task.end.getHours();
    let minutesEnd    = task.end.getMinutes() < 10 ? "0" + task.end.getMinutes() : task.end.getMinutes();

    let startTimeStr = hoursStart + ":" + minutesStart;
    let endTimeStr   = hoursEnd + ":" + minutesEnd;
    console.log(startTimeStr);
    title.value     = task.title;
    desc.value      = task.description;
    startDat.value  = task.start.toISOString().slice(0, 10);
    startTim.value  = startTimeStr;
    endDat.value    = task.end.toISOString().slice(0, 10);
    endTim.value    = endTimeStr;
    populateCategorySelect(category);
    category.value  = task.category;
    hashTags.value  = task.hashTags.reduce(((acc, hash) => acc + "#" + hash), "");

    document.getElementById(TASK_DETAILS_POPUP_ID).style.display = "block";

    setSaveButtonListener(task);
    setDeleteButtonListener(task);
}



function hideDetailsPopup()
{
    document.getElementById(TASK_DETAILS_POPUP_ID).style.display="none";
}



function setSaveButtonListener(task){
    let butSave = document.getElementById(BUT_SAVE_ID);

    butSave.onclick = function()
    {
        let editRes = editTask(task);
        if (editRes)
        {
            hideDetailsPopup();
        }
    }
}



function setDeleteButtonListener(task)
{
    let butDel = document.getElementById(BUT_DELETE_ID);

    butDel.onclick = function()
    {
        deleteTask(task.id);
        hideDetailsPopup();
    }
}



function editTask(task)
{
    let title       = document.getElementById(TASK_TITLE_ID).value;
    title           = removeRedundantSpaces(title);
    let desc        = document.getElementById(TASK_DESC_ID).value;
    desc            = removeRedundantSpaces(desc);
    let startDat    = document.getElementById(TASK_START_DAT_ID).value;
    let startTim    = document.getElementById(TASK_START_TIM_ID).value;
    let endDat      = document.getElementById(TASK_END_DAT_ID).value;
    let endTim      = document.getElementById(TASK_END_TIM_ID).value;
    let category    = document.getElementById(TASK_CATEGORY_ID).value;
    let hashTags    = document.getElementById(TASK_HASH_TAGS_ID).value;

    let startDate   = obtainDateObject(startDat, startTim);
    let endDate     = obtainDateObject(endDat, endTim);

    let hashTagsArr = createHashTagsArray(hashTags);

    let validationResult = validateNewTaskData(title, startDate, endDate, startDat, endDat, startTim, endTim, category,
        hashTagsArr);

    if (!validationResult[0])
    {
        window.alert("Errors occurred: " + validationResult[1]);

        return false;
    }
    else
    {
        updateTask(task, title, desc, startDate, endDate, hashTagsArr, category);
        updateSearchInputDataSource();

        return true;
    }
}