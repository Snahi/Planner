// CONST
const NEW_TASK_CATEGORY_SELECT_ID   = "new_task_category";
const NEW_TASK_TITLE_ID             = "new_task_title";
const NEW_TASK_DESC_ID              = "new_task_description";
const NEW_TASK_START_DAT_ID         = "new_task_start";
const NEW_TASK_START_TIM_ID         = "new_task_start_time";
const NEW_TASK_END_DAT_ID           = "new_task_end";
const NEW_TASK_END_TIM_ID           = "new_task_end_time";
const NEW_TASK_CATEGORY_ID          = "new_task_category";
const NEW_TASK_HASH_TAGS_ID         = "new_task_hash_tags";
const HASH_TAGS_SEPARATOR           = "#";



function closeTaskCreationPopup()
{
    let elemsToClear = [
        document.getElementById(NEW_TASK_TITLE_ID),
        document.getElementById(NEW_TASK_DESC_ID),
        document.getElementById(NEW_TASK_START_DAT_ID),
        document.getElementById(NEW_TASK_START_TIM_ID),
        document.getElementById(NEW_TASK_END_DAT_ID),
        document.getElementById(NEW_TASK_END_TIM_ID),
        document.getElementById(NEW_TASK_CATEGORY_ID),
        document.getElementById(NEW_TASK_HASH_TAGS_ID)
    ];

    elemsToClear.forEach(elem => elem.value = "");

    let tskCreationPopup = document.getElementById(TASK_CREATION_POPUP_ID);
    tskCreationPopup.style.display = "none";
}



function createNewTask()
{
    let title       = document.getElementById(NEW_TASK_TITLE_ID).value;
    title           = removeRedundantSpaces(title);
    let desc        = document.getElementById(NEW_TASK_DESC_ID).value;
    desc            = removeRedundantSpaces(desc);
    let startDat    = document.getElementById(NEW_TASK_START_DAT_ID).value;
    let startTim    = document.getElementById(NEW_TASK_START_TIM_ID).value;
    let endDat      = document.getElementById(NEW_TASK_END_DAT_ID).value;
    let endTim      = document.getElementById(NEW_TASK_END_TIM_ID).value;
    let category    = document.getElementById(NEW_TASK_CATEGORY_ID).value;
    let hashTags    = document.getElementById(NEW_TASK_HASH_TAGS_ID).value;

    let startDate   = obtainDateObject(startDat, startTim);
    let endDate     = obtainDateObject(endDat, endTim);

    let hashTagsArr = createHashTagsArray(hashTags);

    let validationResult = validateNewTaskData(title, startDate, endDate, startDat, endDat, startTim, endTim, category,
        hashTagsArr);

    if (!validationResult[0])
    {
        window.alert("Errors occurred: " + validationResult[1]);
    }
    else
    {
        addTask(currTableId, title, desc, startDate, endDate, hashTagsArr, category);
        closeTaskCreationPopup();
        updateSearchInputDataSource();
        window.alert("Task created");
    }
}


/**
 * basic validation is done with html, things that are not checked in html and are checked in this function:
 * - title is null
 * - start or start time is null
 * - end or end time is null
 * - category is null
 * - empty hashTag
 * @param title
 * @param startDate
 * @param endDate
 * @param startDatStr
 * @param endDatStr
 * @param startTimStr
 * @param endTimStr
 * @param category
 * @param hashTags
 */
function validateNewTaskData(title, startDate, endDate, startDatStr, endDatStr, startTimStr, endTimStr, category,
                             hashTags)
{
    let isValid = true;
    let message = "";

    if (title === null || title === "")
    {
        isValid = false;
        message += "Empty title. ";
    }

    let dateValidationResult = validateDatesAndTimes(startDatStr, endDatStr, startTimStr, endTimStr, startDate, endDate);
    if (!dateValidationResult[0])
    {
        isValid = false;
        message += dateValidationResult[1];
    }

    if (category === null || category === "")
    {
        isValid = false;
        message += "Category not specified. ";
    }

    let hashTagsValRes = validateHashTags(hashTags);
    if (!hashTagsValRes[0])
    {
        isValid = false;
        message += hashTagsValRes[1];
    }

    return [isValid, message];
}



function validateDatesAndTimes(start, end, startTime, endTime, startDate, endDate)
{
    let isValid = true;
    let message = "";

    if (start === null || start === "")
    {
        isValid = false;
        message += "Start date not specified. ";
    }

    if (end === null || end === "")
    {
        isValid = false;
        message += "End date not specified. "
    }

    if (startTime === null || startTime === "")
    {
        isValid = false;
        message += "Start time not specified. "
    }

    if (endTime === null || endTime === "")
    {
        isValid = false;
        message += "End time not specified. "
    }

    if (startDate !== null && endDate !== null && startDate > endDate)
    {
        isValid = false;
        message += "End date is not after start date. "
    }

    return [isValid, message];
}


// test if obtain date object works before removing it

// function obtainStartDateObject(startDatStr, startTimStr)
// {
//     let startDate = null;
//     if (startDatStr !== null && startDatStr !== "" && startTimStr !== null && startTimStr !== "")
//     {
//         let startDateStr    = startDatStr + " " + startTimStr;
//         startDate           = Date.parse(startDateStr);
//     }
//
//     return new Date(startDate);
// }
//
//
//
// function obtainEndDateObject(endDatStr, endTimStr)
// {
//     let endDate = null;
//     if (endDatStr !== null && endDatStr !== "" && endTimStr !== null && endTimStr !== "")
//     {
//         let startDateStr    = endDatStr + " " + endTimStr;
//         endDate           = Date.parse(startDateStr);
//     }
//
//     return new Date(endDate);
// }



function obtainDateObject(dateStr, timeStr)
{
    let date = null;
    if (dateStr !== null && dateStr !== "" && timeStr !== null && timeStr !== "")
    {
        let fullDateStr = dateStr + " " + timeStr;
        date            = Date.parse(fullDateStr);

        return new Date(date);
    }
    else
        return null;
}



function createHashTagsArray(hashTagsStr)
{
    let arr = hashTagsStr.split(HASH_TAGS_SEPARATOR);
    arr.shift();    // first elem is either empty or wrong (not preceded with hash);

    arr.map(hash => removeRedundantSpaces(hash));

    return arr;
}



function validateHashTags(hashTags)
{
    if (hashTags.length === 0)  // if empty -> ok
        return [true, ""];

    let areValid = true;
    let message  = "";

    hashTags.forEach(hashTag => {
        if (hashTag === "")
            areValid = false;
    });

    if (!areValid)
        message = "Empty hashTag. ";

    return [areValid, message];
}