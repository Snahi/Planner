
function create_new_table(table_name){

    var table_real_name = document.getElementById(table_name).value;
    addTable(table_real_name);
    show_added_table(table_real_name);

}
 function initial_show_table_elements(){

   var z= getAllTables();

   for (var value of z.values()) {

    $( ".flex-container" ).append( "<div>"+value+"</div>" );

    }

  }
function show_added_table(name){
    $( ".flex-container" ).append( "<div>"+name+"</div>" );

  }
function remove_tables(name){
    window.location.reload(false);
    initial_show_table_elements();
}
