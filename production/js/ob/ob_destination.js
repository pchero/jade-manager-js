
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
    // update_destination_detail(data[0]);
    func(data[0]);
  });

  // add one click event
  $('#' + id +' tbody').on('click', 'tr', function () {
    $(this).addClass('active').siblings().removeClass('active');
  });
}

/**
@brief Update destination detail info
*/
function update_destination_detail(uuid) {
  console.log("Fired update_destination_detail. " + uuid);

  // get data
  data = g_destinations({uuid: uuid}).first();

  // set basic info
  document.getElementById("destination_detail_uuid").value = data.uuid;
  document.getElementById("destination_detail_name").value = data.name;
  document.getElementById("destination_detail_description").value = data.detail;

  // 
  document.getElementById("destination_detail_type").value = data.type;
  document.getElementById("destination_detail_application").value = data.application;
  document.getElementById("destination_detail_data").value = data.data;
  document.getElementById("destination_detail_context").value = data.context;
  document.getElementById("destination_detail_exten").value = data.exten;
  document.getElementById("destination_detail_priority").value = data.priority;

  // variables
  document.getElementById("destination_detail_variables").value = JSON.stringify(data.variables);
  
  // other info
  document.getElementById("destination_detail_in_use").value = data.in_use;
  document.getElementById("destination_detail_tm_create").value = data.tm_create;
  document.getElementById("destination_detail_tm_update").value = data.tm_update;
  document.getElementById("destination_detail_tm_delete").value = data.tm_delete;

}

function get_destination_detail_from_form() {
  console.log("Fired get_destination_detail_from_form.");

  data = {};

  // basic info
  data.uuid = document.getElementById("destination_detail_uuid").value;
  data.name = document.getElementById("destination_detail_name").value;
  data.detail = document.getElementById("destination_detail_description").value;

  //
  data.type = document.getElementById("destination_detail_type").value;
  data.application = document.getElementById("destination_detail_application").value;
  data.data = document.getElementById("destination_detail_data").value;
  data.context = document.getElementById("destination_detail_context").value;
  data.exten = document.getElementById("destination_detail_exten").value;
  data.priority = document.getElementById("destination_detail_priority").value;

  // // variables
  data.variables = JSON.parse(document.getElementById("destination_detail_variables").value);

  // other info
  data.in_use = document.getElementById("destination_detail_in_use").value;
  data.tm_create = document.getElementById("destination_detail_tm_create").value;
  data.tm_update = document.getElementById("destination_detail_tm_update").value;
  data.tm_delete = document.getElementById("destination_detail_tm_delete").value;

  return data;
}

function bt_create_destination_detail() {
  console.log("Fired bt_create_destination_detail.");

  // get data info from the form
  data = get_destination_detail_from_form();

  // delete unnecessary items
  delete data.uuid;
  delete data.in_use;
  delete data.tm_create;
  delete data.tm_update;
  delete data.tm_delete;

  // send request 
  console.log(data);
  send_create_destination_request(data);
}

function bt_update_destination_detail() {
  console.log("Fired bt_update_destination_detail.");

  // get data info from the form
  data = get_destination_detail_from_form();

  // delete unnecessary items
  delete data.in_use;
  delete data.tm_create;
  delete data.tm_update;
  delete data.tm_delete;

  console.log(data);

  send_update_destination_request(data);
}

function bt_delete_destination_detail() {
  console.log("Fired bt_delete_destination_detail.");

  // get data info from the form
  data = get_destination_detail_from_form();

  // delete unnecessary items
  delete data.in_use;
  delete data.tm_create;
  delete data.tm_update;
  delete data.tm_delete;

  console.log(data);

  send_delete_destination_request(data);
}

/**
 * Send request for destination create
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
function send_create_destination_request(data) {
  console.log("Fired send_create_destination_request.")

  url = domain + "/ob/destinations";
  console.log("Query url info. url[" + url + "]");

  send_request(url, "POST", data);
}

/**
 * Send request for destination update
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
function send_update_destination_request(data) {
  console.log("Fired send_update_destination_request.")

  url = domain + "/ob/destinations/" + data.uuid;
  console.log("Query url info. url[" + url + "]");

  send_request(url, "PUT", data);
}

/**
 * Send request for destination delete
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
function send_delete_destination_request(data) {
  console.log("Fired send_delete_destination_request.")

  url = domain + "/ob/destinations/" + data.uuid;
  console.log("Query url info. url[" + url + "]");

  send_request(url, "DELETE", data);
}


/**
 * Send request
 * @param  {[type]} url    [description]
 * @param  {[type]} method [description]
 * @param  {[type]} data   [description]
 * @return {[type]}        [description]
 */
function send_request(url, method, data) {
  console.log("Fired send_request.");

  resp = jQuery.ajax({
      type: method,
      url: url,
      cache: false,
      dataType: "application/json",
      data: JSON.stringify(data)
    });

}

// run!
$(document).ready(function() {

  // get all destination info
  get_all_destinations_init();
  
  // add all destination list
  destination_list_columns = [
    { id: "uuid", title: "Uuid"},
    { id: "name", title: "Name" },
    { id: "detail", title: "Description" },
    { id: "type", title: "Type" }
  ];
  add_table("destination_list_table", g_destinations, destination_list_columns, update_destination_detail);

  console.log('ob_destination.js');
});
