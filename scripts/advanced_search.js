// CONST
const ADVANCED_SEARCH_POPUP_ID              = "advanced_search_popup";
const ADVANCED_SEARCH_CATEGORY_SELECT_ID    = "searched_category";
const SEARCHED_TITLE_ID                     = "searched_title";
const SEARCHED_DESC_ID                      = "searched_description";
const SEARCHED_START_DAT_ID                 = "searched_start_date";
const SEARCHED_START_TIM_ID                 = "searched_start_time";
const SEARCHED_END_DAT_ID                   = "searched_end_date";
const SEARCHED_END_TIM_ID                   = "searched_end_time";
const SEARCHED_CATEGORY_ID                  = "searched_category";
const SEARCHED_HASH_TAGS_ID                 = "searched_hash_tags";
const TIME_ZERO                             = "0:0";
const DATE_ZERO                             = "1970-1-1";



function showAdvancedSearchPopup()
{
    let popup = document.getElementById(ADVANCED_SEARCH_POPUP_ID);

    populateCategorySelect(document.getElementById(ADVANCED_SEARCH_CATEGORY_SELECT_ID));
    let nullCategory        = document.createElement("option");
    nullCategory.value      = null;
    nullCategory.innerText  = "";
    let select = document.getElementById(ADVANCED_SEARCH_CATEGORY_SELECT_ID);
    select.insertAdjacentElement('afterbegin', nullCategory);
    select.value = "";

    popup.style.display = "block";
}



function hideAdvancedSearchPopup()
{
    let popup = document.getElementById(ADVANCED_SEARCH_POPUP_ID);
    popup.style.display = "none";
}



function onSearchButtonClicked()
{
    let title       = document.getElementById(SEARCHED_TITLE_ID).value;
    let desc        = document.getElementById(SEARCHED_DESC_ID).value;
    let startDat    = document.getElementById(SEARCHED_START_DAT_ID).value;
    let startTim    = document.getElementById(SEARCHED_START_TIM_ID).value;
    let endDat      = document.getElementById(SEARCHED_END_DAT_ID).value;
    let endTim      = document.getElementById(SEARCHED_END_TIM_ID).value;
    let category    = document.getElementById(SEARCHED_CATEGORY_ID).value;
    let hashTags    = document.getElementById(SEARCHED_HASH_TAGS_ID).value;

    let searchRes = searchForTasks(title, desc, obtainDateObject(startDat, TIME_ZERO),
        obtainDateObject(DATE_ZERO, startTim), obtainDateObject(endDat, TIME_ZERO), obtainDateObject(DATE_ZERO, endTim),
        category, createHashTagsArray(hashTags));

    console.log(searchRes);
}



function searchForTasks(title, description, startDate, startTime, endDate, endTime, category, hashTags)
{
    let matches = [];
    title       = title.toLowerCase().trim();
    description = description.toLowerCase().trim();

    tasks.forEach(function(task)
    {
        if (
            (title.length === 0 || task.title.toLowerCase().includes(title) || title.includes(task.title.toLowerCase())) &&
            (description.length === 0 || task.description.toLowerCase().includes(description)) &&
            (startDate === null || compareDateWithoutTime(task.start, startDate)) &&
            (startTime === null || compareTimeWithoutDate(task.start, startTime)) &&
            (endDate === null || compareDateWithoutTime(task.end, endDate)) &&
            (endTime === null || compareTimeWithoutDate(task.end, endTime)) &&
            (category === "" || Number(task.category) === Number(category)) &&
            (hashTags == null ||
                hashTags.reduce((areAllIn, hash) => areAllIn && task.hashTags.includes(hash), true))
        )
        {
            matches.push(task);
        }
    });

    return matches;
}



function compareDateWithoutTime(date1, date2)
{
    let d1 = new Date(date1.getTime());
    let d2 = new Date(date2.getTime());

    d1.setHours(0, 0, 0, 0);
    d2.setHours(0, 0, 0, 0);

    return d1.getTime() === d2.getTime();
}



function compareTimeWithoutDate(date1, date2)
{
    return date1.getHours() === date2.getHours() &&
        date1.getMinutes() === date2.getMinutes();
}