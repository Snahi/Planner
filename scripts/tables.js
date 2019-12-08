// CONST
const TABLE_DIV_CLASS   = "table_div";
const TABLES_SECTION_ID = "tables";



function initialLoadTables()
{
    initTables();
    loadTables();
}



function loadTables()
{
    let tablesSection       = document.getElementById(TABLES_SECTION_ID);
    tablesSection.innerHTML = "";

    tables.forEach((tabName, tabId) => tablesSection.appendChild(createTableDiv(tabId, tabName)));

    $(".table_div").draggable({
        containment:    "body",
        revert:         true
    });
    $( "#tables_bin" ).droppable({
        drop: function( event, ui )
        {
            deleteTable(ui.draggable.context.innerText);
            loadTables();
        }
    });
}



function createNewTable(tableInputId)
{
    let tableName   = document.getElementById(tableInputId).value;

    if (tableName.length > 0)
    {
        let addTableRes = addTable(tableName);

        if (addTableRes[1])
        {
            loadTables();
        }
        else
        {
            window.alert("Table name is not unique");
        }
    }
    else
    {
        window.alert("Table name cannot be empty");
    }
}



function createTableDiv(tabId, tabName)
{
    let tabDiv          = document.createElement("DIV");
    tabDiv.className    = TABLE_DIV_CLASS;
    tabDiv.innerText    = tabName;

    return tabDiv;
}
