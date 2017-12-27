
/**
@brief Add the table to the given id.
*/
function add_table(id, db, columns, func) {
  console.log("Fired add_table. " + id + ", " + db + ", " + columns);

  // get columns keys
  keys = [];
  for(var i = 0; i < columns.length; i++) {
    keys.push(columns[i].id);
  }
  console.log("Ids. " + keys);

  // make data list
  res = [];
  console.log("length: " + db().get().length);
  for(var i = 0; i < db().get().length; i++) {
    data = db().get()[i];
    tmp = [];
    console.log("test  data. " + data + data["uuid"]);

    for(var j = 0; j < keys.length; j++) {
      tmp.push(data[keys[j]]);
    }
    res.push(tmp);
  }
  console.log("result" + res);

  // create table and add it.
  table = $('#' + id).DataTable({
    data: res,
    deferRender: true,
    // colReorder: true,
    // scrollY: 380,
    // scrollCollapse: true,
    // scroller: true,
    columns: columns
  });

  // add double click event
  $('#' + id +' tbody').on('dblclick', 'tr', function () {
    var data = table.row( this ).data();

    // register the function
    func(data[0]);
  });

  // add one click event
  $('#' + id +' tbody').on('click', 'tr', function () {
    $(this).addClass('active').siblings().removeClass('active');
  });
}

/**
@brief Update dlma detail info
*/
function update_dlma_detail(uuid) {
  console.log("Fired update_dlma_detail. " + uuid);

  // get data
  data = g_ob_dlmas({uuid: uuid}).first();

  // set basic info
  document.getElementById("dlma_detail_uuid").value = data.uuid;
  document.getElementById("dlma_detail_name").value = data.name;
  document.getElementById("dlma_detail_description").value = data.detail;

  // 
  document.getElementById("dlma_detail_dl_table").value = data.dl_table;

  // variables
  document.getElementById("dlma_detail_variables").value = JSON.stringify(data.variables);
  
  // other info
  document.getElementById("dlma_detail_in_use").value = data.in_use;
  document.getElementById("dlma_detail_tm_create").value = data.tm_create;
  document.getElementById("dlma_detail_tm_update").value = data.tm_update;
  document.getElementById("dlma_detail_tm_delete").value = data.tm_delete;

}

function get_dlma_detail_from_form() {
  console.log("Fired get_dlma_detail_from_form.");

  data = {};

  // basic info
  data.uuid = document.getElementById("dlma_detail_uuid").value;
  data.name = document.getElementById("dlma_detail_name").value;
  data.detail = document.getElementById("dlma_detail_description").value;

  //
  data.dl_table = document.getElementById("dlma_detail_dl_table").value;

  // // variables
  data.variables = JSON.parse(document.getElementById("dlma_detail_variables").value);

  // other info
  data.in_use = document.getElementById("dlma_detail_in_use").value;
  data.tm_create = document.getElementById("dlma_detail_tm_create").value;
  data.tm_update = document.getElementById("dlma_detail_tm_update").value;
  data.tm_delete = document.getElementById("dlma_detail_tm_delete").value;

  return data;
}

function bt_create_dlma_detail() {
  console.log("Fired bt_create_dlma_detail.");

  // get data info from the form
  data = get_dlma_detail_from_form();

  // delete unnecessary items
  delete data.uuid;
  delete data.in_use;
  delete data.tm_create;
  delete data.tm_update;
  delete data.tm_delete;

  // send request 
  console.log(data);
  send_create_dlma_request(data);
}

function bt_update_dlma_detail() {
  console.log("Fired bt_update_dlma_detail.");

  // get data info from the form
  data = get_dlma_detail_from_form();

  // delete unnecessary items
  delete data.in_use;
  delete data.tm_create;
  delete data.tm_update;
  delete data.tm_delete;

  console.log(data);

  send_update_dlma_request(data);
}

function bt_delete_dlma_detail() {
  console.log("Fired bt_delete_dlma_detail.");

  // get data info from the form
  data = get_dlma_detail_from_form();

  // delete unnecessary items
  delete data.in_use;
  delete data.tm_create;
  delete data.tm_update;
  delete data.tm_delete;

  console.log(data);

  send_delete_dlma_request(data);
}

/**
 * Send request for dlma create
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
function send_create_dlma_request(data) {
  console.log("Fired send_create_dlma_request.")

  url = domain + "/ob/dlmas";
  console.log("Query url info. url[" + url + "]");

  send_request(url, "POST", data);
}

/**
 * Send request for dlma update
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
function send_update_dlma_request(data) {
  console.log("Fired send_update_dlma_request.")

  url = domain + "/ob/dlmas/" + data.uuid;
  console.log("Query url info. url[" + url + "]");

  send_request(url, "PUT", data);
}

/**
 * Send request for dlma delete
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
function send_delete_dlma_request(data) {
  console.log("Fired send_delete_dlma_request.")

  url = domain + "/ob/dlmas/" + data.uuid;
  console.log("Query url info. url[" + url + "]");

  send_request(url, "DELETE", data);
}


function dlma_list_table_double_click(row) {
  console.log("Fired dlma_list_table_double_click.");

  message_id = row.cells.item(0).innerText;

  update_dlma_detail(message_id);
}


// run!
$(document).ready(function() {

  // add all dlma list
  dlma_list_columns = [
    { id: "uuid", data: "uuid", title: "Uuid"},
    { id: "name", data: "name", title: "Name" },
    { id: "detail", data: "detail", title: "Description" },
    { id: "dl_table", data: "dl_table", title: "Dial list table" }
  ];

  table_create("dlma_list_table", dlma_list_columns, dlma_list_table_double_click);
  table_update("dlma_list_table", g_ob_dlmas);

  console.log('ob_dlma.js');
});
