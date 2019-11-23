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

// state
let currCategories  = [];



function displayCategories()
{
    let categoriesMenu = document.getElementById(CATEGORIES_LIST_ID);
    categoriesMenu.innerHTML = "";  // clear old categories
    // let categoryDiv;
    // let categoryName;
    // let categoryColor;

    currCategories.sort((cat1, cat2) => cat1.name.localeCompare(cat2.name));
    currCategories.forEach(category =>
    {
        // create html views
        let categoryDiv     = createCategoryDiv(category);
        let categoryName    = createCategoryNameSpan(category);
        let categoryColor   = createCategoryColorDiv(category);

        // set onClick listeners
        categoryDiv.onclick = function() {onCategoryClicked(category, categoryDiv, categoryColor)};

        // bind
        categoryDiv.appendChild(categoryName);
        categoryDiv.appendChild(categoryColor);
        categoriesMenu.appendChild(categoryDiv);

        if (category.isSelected) selectCategoryGraphically(categoryDiv, categoryColor);
    });
}



function createCategoryDiv(category)
{
    let categoryDiv         = document.createElement("DIV");
    categoryDiv.id          = CATEGORY_DIV_ID_PREFIX + category.id;
    categoryDiv.className   = CATEGORY_CLASS;

    return categoryDiv;
}



function onCategoryClicked(category, categoryDiv, categoryColorDiv)
{
    if (selectedCategories.some(selectedCategory => selectedCategory.id === category.id))
        deselectCategory(category, categoryDiv, categoryColorDiv);
    else
        selectCategory(category, categoryDiv, categoryColorDiv);

    console.log(selectedCategories);
}



function selectCategory(category, categoryDiv, categoryColorDiv)
{
    selectCategoryGraphically(categoryDiv, categoryColorDiv);

    selectedCategories.push(category);
    category.isSelected = true;
}



function selectCategoryGraphically(categoryDiv, categoryColorDiv)
{
    categoryDiv.style.backgroundColor   = SELECTED_CATEGORY_BG;
    categoryDiv.style.color             = SELECTED_CATEGORY_COLOR;
    categoryColorDiv.style.visibility   = "visible";
}



function deselectCategory(category, categoryDiv, categoryColorDiv)
{
    deselectCategoryGraphically(categoryDiv, categoryColorDiv);

    // remove from selected categories
    selectedCategories  = selectedCategories.filter(selectedCategory => selectedCategory.id !== category.id)
    category.isSelected = false;
}



function deselectCategoryGraphically(categoryDiv, categoryColorDiv)
{
    categoryDiv.style.backgroundColor   = UNSELECTED_CATEGORY_BG;
    categoryDiv.style.color             = UNSELECTED_CATEGORY_COLOR;
    categoryColorDiv.style.visibility   = "hidden";
}



function createCategoryNameSpan(category)
{
    let categoryName        = document.createElement("SPAN");
    categoryName.innerText  = category.name;

    return categoryName;
}



function createCategoryColorDiv(category)
{
    let categoryColor                   = document.createElement("DIV");
    categoryColor.className             = CATEGORY_COLOR_CLASS;
    categoryColor.style.backgroundColor = category.color;

    return categoryColor;
}



function createCategory(categoryName)
{
    categoryName = removeRedundantSpaces(categoryName);
    let isUnique = isCategoryNameUniqueInTable(currTableId, categoryName);
    let isValid  = CATEGORY_NAME_REGEX.test(categoryName);

    if (isUnique && isValid)
    {
        addCategory(currTableId, categoryName);
        currCategories = getAllCategories();
        displayCategories();
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
}



// utils ///////////////////////////////////////////////////////////////////////////////////////////////////////////////