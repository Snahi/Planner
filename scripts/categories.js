/* Scripts for managing categories for current table */

// CONST
const CATEGORY_DIV_ID_PREFIX    = "category_";
const CATEGORY_CLASS            = "category";
const CATEGORIES_LIST_ID        = "categories_list";
const CATEGORY_COLOR_CLASS      = "category_color";
const CATEGORY_NAME_REGEX       = new RegExp("^[a-zA-Z]{1}[a-zA-Z ]{0,29}$");

// state
let currCategories  = [];



function displayCategories()
{
    let categoriesMenu = document.getElementById(CATEGORIES_LIST_ID);
    categoriesMenu.innerHTML = "";  // clear old categories
    let categoryDiv;
    let categoryName;
    let categoryColor;

    currCategories.forEach(category =>
    {
        categoryDiv             = document.createElement("DIV");
        categoryDiv.id          = CATEGORY_DIV_ID_PREFIX + category.id;
        categoryDiv.className   = CATEGORY_CLASS;

        categoryName            = document.createElement("SPAN");
        categoryName.innerText  = category.name;

        categoryColor                       = document.createElement("DIV");
        categoryColor.className             = CATEGORY_COLOR_CLASS;
        categoryColor.style.backgroundColor = category.color;

        categoryDiv.appendChild(categoryName);
        categoryDiv.appendChild(categoryColor);
        categoriesMenu.appendChild(categoryDiv);
    });
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