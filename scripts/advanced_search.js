// CONST
const ADVANCED_SEARCH_POPUP_ID = "advanced_search_popup";



function showAdvancedSearchPopup()
{
    let popup = document.getElementById(ADVANCED_SEARCH_POPUP_ID);
    popup.style.display = "block";
}



function hideAdvancedSearchPopup()
{
    let popup = document.getElementById(ADVANCED_SEARCH_POPUP_ID);
    popup.style.display = "none";
}