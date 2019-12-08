/* Scripts for managing categories for current table */

// CONST
const CATEGORY_DIV_ID_PREFIX    = "category_";
const CATEGORY_CLASS            = "category";
const CATEGORIES_LIST_ID        = "categories_list";
const CATEGORY_COLOR_CLASS      = "category_color";
const CATEGORY_NAME_REGEX       = new RegExp("^[a-zA-Z]{1}[a-zA-Z ]{0,29}$");
const SELECTED_CATEGORY_BG      = "#0D7377";
const SELECTED_CATEGORY_COLOR   = "#14FFEC";
const UNSELECTED_CATEGORY_BG    = "#212121";
const UNSELECTED_CATEGORY_COLOR = "#0D7377";
const BUT_CATEGORY_SETT_CLASS   = "but_category_settings";
const BUT_DELETE_CATEGORY_CLASS = "but_delete_category";
const INPUT_CATEGORY_NAME_CLASS = "input_category_name";
const BUT_SAVE_CAT_EDIT_CLASS   = "but_save_category_edit";
const DIV_CATEGORY_SETTINGS     = "div_category_settings";
const CAT_EDIT_DIV_ELEM_CLASS   = "category_edit_elem";

// state
let currCategories  = [];



// displaying categories ///////////////////////////////////////////////////////////////////////////////////////////////



function displayCategories()
{
    let categoriesMenu = document.getElementById(CATEGORIES_LIST_ID);
    categoriesMenu.innerHTML = "";  // clear old categories

    currCategories.sort((cat1, cat2) => cat1.name.localeCompare(cat2.name));
    currCategories.forEach(category =>
    {
        // create html views
        let categoryDiv     = createCategoryDiv(category);
        let categoryName    = createCategoryNameSpan(category);
        let categoryColor   = createCategoryColorDiv(category);
        let catDivArr       = createCategorySettingsDiv(category);  // [0] catSettingDiv, [1] edited name - i need to
                                                                    // refresh it because it holds old value
        let categorySettDiv = catDivArr[0];
        let catEditName     = catDivArr[1];
        let categorySett    = createCategorySettingsBut(categorySettDiv, category, catEditName);

        // set listeners
        categoryName.onclick = function() {onCategoryClicked(category, categoryDiv, categoryColor, categorySett)};

        // bind
        categoryDiv.appendChild(categoryName);
        categoryDiv.appendChild(categoryColor);
        categoryDiv.appendChild(categorySett);
        categoryDiv.appendChild(categorySettDiv);
        categoriesMenu.appendChild(categoryDiv);

        setCategorySettingDivDimensions(categorySettDiv, categoryDiv);

        if (category.isSelected) selectCategoryGraphically(categoryDiv, categoryColor, categorySett);
        else deselectCategoryGraphically(categoryDiv, categoryColor, categorySett);
    });
}



function refreshCategories()
{
    currCategories = getAllCategories().filter(category => category.tableId = currTableId);
    displayCategories();

    calendar.refetchResources();
}



function setCategorySettingDivDimensions(categorySettingDiv, categoryDiv)
{
    let catEditDivHeight    = window.getComputedStyle(categorySettingDiv, null).height;
    catEditDivHeight        = catEditDivHeight.substr(0, catEditDivHeight.length - 2);
    let categoryHeight      = categoryDiv.offsetHeight;
    let editDivOffset       = (catEditDivHeight - categoryHeight) / 2;

    categorySettingDiv.style.top = (categoryDiv.getBoundingClientRect().top - editDivOffset) + "px";
}



function createCategoryDiv(category)
{
    let categoryDiv         = document.createElement("DIV");
    categoryDiv.id          = CATEGORY_DIV_ID_PREFIX + category.id;
    categoryDiv.className   = CATEGORY_CLASS;

    return categoryDiv;
}



function onCategoryClicked(category, categoryDiv, categoryColorDiv, categorySett)
{
    if (selectedCategories.some(selectedCategory => selectedCategory.id === category.id))
        deselectCategory(category, categoryDiv, categoryColorDiv, categorySett);
    else
        selectCategory(category, categoryDiv, categoryColorDiv, categorySett);
}



function selectCategory(category, categoryDiv, categoryColorDiv, categorySett)
{
    selectCategoryGraphically(categoryDiv, categoryColorDiv, categorySett);

    selectedCategories.push(category);
    category.isSelected = true;

    calendar.refetchResources();
    //showEventsByResource(category.id);
}



function selectCategoryGraphically(categoryDiv, categoryColorDiv, categorySett)
{
    categoryDiv.style.backgroundColor   = SELECTED_CATEGORY_BG;
    categoryDiv.style.color             = SELECTED_CATEGORY_COLOR;
    categoryColorDiv.style.visibility   = "visible";
    categorySett.style.display          = "none";
}



function deselectCategory(category, categoryDiv, categoryColorDiv, categorySett)
{
    deselectCategoryGraphically(categoryDiv, categoryColorDiv, categorySett);

    // remove from selected categories
    selectedCategories  = selectedCategories.filter(selectedCategory => selectedCategory.id !== category.id);
    category.isSelected = false;

    calendar.refetchResources();
    //hideEventsByResource(category.id);
}



function deselectCategoryGraphically(categoryDiv, categoryColorDiv, categorySett)
{
    categoryDiv.style.backgroundColor   = UNSELECTED_CATEGORY_BG;
    categoryDiv.style.color             = UNSELECTED_CATEGORY_COLOR;
    categoryColorDiv.style.visibility   = "hidden";
    categorySett.style.display          = "inline-block";
}



function createCategoryNameSpan(category)
{
    let categoryName            = document.createElement("SPAN");
    categoryName.innerText      = category.name;
    categoryName.style.cursor   = "pointer";

    return categoryName;
}



function createCategoryColorDiv(category)
{
    let categoryColor                   = document.createElement("DIV");
    categoryColor.className             = CATEGORY_COLOR_CLASS;
    categoryColor.style.backgroundColor = category.color;

    return categoryColor;
}



function createCategorySettingsBut(categoryDiv, category, catEditName)
{
    let categorySettings        = document.createElement("DIV");
    categorySettings.className  = BUT_CATEGORY_SETT_CLASS;

    categorySettings.onclick = function() {onCategorySettingsClicked(categoryDiv, category, catEditName)};
    return categorySettings;
}



// category settings ///////////////////////////////////////////////////////////////////////////////////////////////////



function onCategorySettingsClicked(categoryDiv, category, catEditName)
{
    let display = window.getComputedStyle(categoryDiv, null).display;

    if (display === "none")
    {
        catEditName.value           = category.name;
        categoryDiv.style.display   = "flex";
    }
    else
        categoryDiv.style.display = "none";
}



// If an event gets to the body
$(document).click(function(e)
{
    if($(e.target).closest('.div_category_settings').length !== 0 ||
        $(e.target).closest('.but_category_settings').length !== 0) return false;
    $('.div_category_settings').hide();
});



function createCategorySettingsDiv(category)
{
    let catSetDiv   = document.createElement("DIV");

    let delBut          = createDeleteCategoryButton(category);
    let nameInput       = createEditCategoryNameInput(category);
    let saveBut         = createSaveCategoryButton(category, nameInput);

    catSetDiv.appendChild(delBut);
    catSetDiv.appendChild(nameInput);
    catSetDiv.appendChild(saveBut);

    catSetDiv.className = DIV_CATEGORY_SETTINGS;

    return [catSetDiv, nameInput];
}



function createDeleteCategoryButton(category)
{
    let delBut          = document.createElement("DIV");
    delBut.className    = BUT_DELETE_CATEGORY_CLASS + " " + CAT_EDIT_DIV_ELEM_CLASS;

    delBut.onclick = function() {onDeleteCategoryButtonClicked(category)};

    return delBut;
}



function onDeleteCategoryButtonClicked(category)
{
    deleteCategory(category.id);
    refreshCategories();
}



function createEditCategoryNameInput(category)
{
    let nameInput       = document.createElement("INPUT");
    nameInput.type      = "text";
    nameInput.className = INPUT_CATEGORY_NAME_CLASS + " " + CAT_EDIT_DIV_ELEM_CLASS;
    nameInput.value     = category.name;

    return nameInput;
}



function createSaveCategoryButton(category, nameInput)
{
    let saveBut         = document.createElement("DIV");
    saveBut.className   = BUT_SAVE_CAT_EDIT_CLASS + " " + CAT_EDIT_DIV_ELEM_CLASS;
    saveBut.innerText   = "save changes";

    saveBut.onclick = function() {onSaveCategoryButtonClicked(category, nameInput)};

    return saveBut;
}



function onSaveCategoryButtonClicked(category, nameInput)
{
    let categoryName    = removeRedundantSpaces(nameInput.value);

    let isNameValid = validateCategoryName(categoryName);
    if (isNameValid)
    {
        category.name = categoryName;
        refreshCategories();
    }
}




// category creation ///////////////////////////////////////////////////////////////////////////////////////////////////



function createCategory(categoryName)
{
    categoryName = removeRedundantSpaces(categoryName);

    let isNameValid = validateCategoryName(categoryName);
    if (isNameValid)
    {
        addCategory(currTableId, categoryName);
        refreshCategories();
    }
}



function validateCategoryName(categoryName)
{
    let isUnique = isCategoryNameUniqueInTable(currTableId, categoryName);
    let isValid  = CATEGORY_NAME_REGEX.test(categoryName);

    if (isUnique && isValid)
    {
        return true;
    }
    else if (!isUnique)
    {
        window.alert("Category with name '" + categoryName + "' already exists. Choose different name.");
    }
    else
    {
        window.alert("Category name is invalid. It must contain only letters and cannot be shorter than 1 and longer " +
            "than 30 characters");
    }

    return false;
}