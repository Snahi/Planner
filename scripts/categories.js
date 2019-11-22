/* Scripts for managing categories for current table */

// CONST
const CATEGORY_DIV_ID_PREFIX    = "category_";
const CATEGORY_CLASS            = "category";
const CATEGORIES_LIST_ID        = "categories_list";
const CATEGORY_COLOR_CLASS      = "category_color";

// state
let currCategories  = [];



function displayCategories()
{
    let categoriesMenu = document.getElementById(CATEGORIES_LIST_ID);
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



// utils ///////////////////////////////////////////////////////////////////////////////////////////////////////////////