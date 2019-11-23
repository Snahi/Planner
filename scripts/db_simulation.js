
// global variables
/**
map that contains (table_id: number, table_name: String) pairs. Table may be understood as a project, so tasks and
categories declared in one table are not visible in other tables.
 */
let tables = new Map();
/**
array that contains categories, where category is an object containing
fields:
    id          : number,
    currTableId : number
    name        : String
    color       : String
    isSelected  : bool
 */
let categories = [];
/**
array that contains tasks, where task is an object containing
fields:
    id              : number,
    currTableId         : number,
    title           : String,
    description     : String,
    start           : Date,
    end             : Date,
    hashTags        : Array<String>,
    categories      : Array<number>
 */
let tasks = [];
/**
 * when some objects require unique id it is generated by adding one to this variable and setting it's value to the
 * incremented value
 * @type {number}
 */
let lastId = -1;



// default values for presentation purposes ////////////////////////////////////////////////////////////////////////////



function initDB()
{
    let birthdayPartyId = addTable("Birthday Party");
    addTable("Work");

    let balloonsId = addCategory(birthdayPartyId, "Balloons");
    addCategory(birthdayPartyId, "Music");

    addTask(birthdayPartyId, "choose colors", "choose colors of balloons", new Date(), new Date(),
        ["color", "balloons"], [balloonsId]);
    addTask(birthdayPartyId, "choose shop", "choose in which shop to buy balloons", new Date(), new Date(),
        ["buy", "balloons"], [balloonsId]);
}



// db access functions /////////////////////////////////////////////////////////////////////////////////////////////////



// tables ////////////////////////////////////////////////////////////////////////////////////



function addTable(name)
{
    let id = generateUniqueId();
    tables.set(id, name);

    return id;
}



function deleteTable(name)
{
    for (let idName of tables.entries())
    {
        if (idName[1] === name)
        {
            tables.delete(idName[0]);
            return true;
        }
    }

    return false;
}



function getAllTables()
{
    return tables;
}



// categories ////////////////////////////////////////////////////////////////////////////////



function addCategory(tableId, name)
{
    let id = generateUniqueId();

    let newCategory = {
        id          : id,
        tableId     : tableId,
        name        : name,
        color       : getRandomColor(),
        isSelected  : false
    };

    categories.push(newCategory);

    return id;
}



function deleteCategory(categoryId)
{
    categories = categories.filter(category => category.id !== categoryId);
}



function getAllCategories()
{
    return categories;
}



function isCategoryNameUniqueInTable(tableId, categoryName)
{
    let categoriesWithTheSameName = categories.filter(category =>
        category.tableId === tableId &&
        category.name === categoryName);

    return categoriesWithTheSameName.length === 0;
}



// tasks /////////////////////////////////////////////////////////////////////////////////////


/**
 *
 * @param tableId: number
 * @param title: string
 * @param description: string
 * @param start: date
 * @param end: date
 * @param hashTags: array<string>
 * @param categories: array<number>
 */
function addTask(tableId, title, description, start, end, hashTags, categories)
{
    let id = generateUniqueId();

    let newTask = {
        id          : id,
        tableId     : tableId,
        description : description,
        start       : start,
        end         : end,
        hashTags    : hashTags,
        categories  : categories
    };

    tasks.push(newTask);

    return id;
}



function deleteTask(taskId)
{
    tasks = tasks.filter(task => task.id !== taskId);
}



function getAllTasks()
{
    return tasks;
}



// utils ///////////////////////////////////////////////////////////////////////////////////////////////////////////////



function generateUniqueId()
{
    lastId = lastId + 1;
    return lastId;
}



function getRandomColor()
{
    let letters = "0123456789ABCDEF";
    let color   = "#";

    for (let i = 0; i < 6; i++)
    {
        color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
}
