var g_dls = TAFFY();

function init_db() {
  g_dls = TAFFY();
}

/**
 * Get all dls info of given dlma uuid.
 * @return {[type]} [description]
 */
function get_dial_list(dlma_uuid, count) {
  console.log("Fired get_dial_list. " + dlma_uuid + ", " + count);

  url = domain + "/ob/dls/";
  console.log("Query url info. url[" + url + "]");

  init_db();

  data = {"dlma_uuid": dlma_uuid, "count": count};
  msg = "\"" + JSON.stringify(data) + "\"";
  console.log("Data. " + msg);
  // console.log("Data. " + JSON.stringify(data));

  tmp = send_request(url, "GET", msg);
  console.log("Result. " + tmp);

  res = JSON.parse(tmp);

  
}

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
@brief Update dial list detail info
*/
function update_dl_detail(uuid) {
  console.log("Fired update_dl_detail. " + uuid);

  // get data
  data = g_dlmas({uuid: uuid}).first();

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


function update_dl_list(uuid) {
  console.log("Fired update_dl_list. " + uuid);

  // get dls
  get_dial_list(uuid, 1000);

  // add all dlma list
  dl_list_columns = [
    { id: "uuid", title: "Uuid"},
    { id: "name", title: "Name" },
    { id: "detail", title: "Description" },
    { id: "status", title: "Status" },
    { id: "dlma_uuid", title: "Dial list master uuid"}
  ];
  add_table("dl_list_table", g_dls, dl_list_columns, update_dlma_detail);
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


/**
 * Send request
 * @param  {[type]} url    [description]
 * @param  {[type]} method [description]
 * @param  {[type]} data   [description]
 * @return {[type]}        [description]
 */
function send_request(url, method, data) {
  console.log("Fired send_request.");

  // ret = $.get(url, JSON.stringify(data));
  // console.log(ret);

  resp = jQuery.ajax({
      type: method,
      url: url,
      cache: true,
      async: false, 
      dataType: "application/x-www-form-urlencoded", 
      data: data
      // dataType: "application/json; charset=utf-8",
      // data: data
      // data: JSON.stringify(data)
    });

  return resp.responseText;

}

// run!
$(document).ready(function() {

  // add all dlma list
  dlma_list_columns = [
    { id: "uuid", title: "Uuid"},
    { id: "name", title: "Name" },
    { id: "detail", title: "Description" },
    { id: "dl_table", title: "Dial list table" }
  ];
  add_table("dlma_list_table", g_dlmas, dlma_list_columns, update_dl_list);

  console.log('ob_dial_list.js');
});
