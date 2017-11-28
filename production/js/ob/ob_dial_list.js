var g_dls = TAFFY();

function init_g_dls() {
  delete g_dls;
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

  // init dial list db.
  init_g_dls();

  // send request
  data = {"dlma_uuid": dlma_uuid, "count": count};
  tmp_res = send_request(url, "GET", data, false);

  // parsing data
  res = JSON.parse(tmp_res);
  console.log("Result. " + tmp_res);
  // console.log("Check value. " + res.result.list[0].uuid);

  // insert/update data
  for(var i = 0; i < res.result.list.length; i++) {
    g_dls.insert(res.result.list[i]);
  }
}

function dl_list_table_double_click(row) {
  uuid = row.cells.item(0).innerText;

  update_dl_detail(uuid);
}

function dlma_list_table_double_click(row) {
  uuid = row.cells.item(0).innerText;

  update_dl_list(uuid);
}


/**
@brief Update dial list detail info
*/
function update_dl_detail(uuid) {
  console.log("Fired update_dl_detail. " + uuid);

  // get data
  data = g_dls({uuid: uuid}).first();

  // set basic info
  document.getElementById("dl_detail_uuid").value = data.uuid;
  document.getElementById("dl_detail_name").value = data.name;
  document.getElementById("dl_detail_description").value = data.detail;
  document.getElementById("dl_detail_status").value = data.status;
  document.getElementById("dl_detail_dlma_uuid").value = data.dlma_uuid;

  // contacts
  document.getElementById("dl_detail_email").value = data.email;

  document.getElementById("dl_detail_number_1").value = data.number_1;
  document.getElementById("dl_detail_number_2").value = data.number_2;
  document.getElementById("dl_detail_number_3").value = data.number_3;
  document.getElementById("dl_detail_number_4").value = data.number_4;
  document.getElementById("dl_detail_number_5").value = data.number_5;
  document.getElementById("dl_detail_number_6").value = data.number_6;
  document.getElementById("dl_detail_number_7").value = data.number_7;
  document.getElementById("dl_detail_number_8").value = data.number_8;

  // try count
  document.getElementById("dl_detail_try_count_1").value = data.trycnt_1;
  document.getElementById("dl_detail_try_count_2").value = data.trycnt_2;
  document.getElementById("dl_detail_try_count_3").value = data.trycnt_3;
  document.getElementById("dl_detail_try_count_4").value = data.trycnt_4;
  document.getElementById("dl_detail_try_count_5").value = data.trycnt_5;
  document.getElementById("dl_detail_try_count_6").value = data.trycnt_6;
  document.getElementById("dl_detail_try_count_7").value = data.trycnt_7;
  document.getElementById("dl_detail_try_count_8").value = data.trycnt_8;

  // dialing info
  document.getElementById("dl_detail_dialing_camp_uuid").value = data.dialing_camp_uuid;
  document.getElementById("dl_detail_dialing_plan_uuid").value = data.dialing_plan_uuid;
  document.getElementById("dl_detail_dialing_uuid").value = data.dialing_uuid;

  // result
  document.getElementById("dl_detail_res_dial").value = data.res_dial;
  document.getElementById("dl_detail_res_dial_detail").value = data.res_dial_detail;
  document.getElementById("dl_detail_res_hangup").value = data.res_hangup;
  document.getElementById("dl_detail_res_hangup_detail").value = data.res_hangup_detail;

  // last
  document.getElementById("dl_detail_tm_last_dial").value = data.tm_last_dial;
  document.getElementById("dl_detail_tm_last_hangup").value = data.tm_last_hangup;

  //
  document.getElementById("dl_detail_resv_target").value = data.resv_target;
  document.getElementById("dl_detail_ukey").value = data.ukey;


  // variables
  document.getElementById("dl_detail_variables").value = JSON.stringify(data.variables);

  // other info
  document.getElementById("dl_detail_in_use").value = data.in_use;
  document.getElementById("dl_detail_tm_create").value = data.tm_create;
  document.getElementById("dl_detail_tm_update").value = data.tm_update;
  document.getElementById("dl_detail_tm_delete").value = data.tm_delete;
}


function update_dl_list(uuid) {
  console.log("Fired update_dl_list. " + uuid);

  // get dls
  get_dial_list(uuid, 1000);

  update_table_dl_list();
}

function update_table_dl_list() {
  console.log("Fired update_table_dl_list.");

  // update
  table_update("dl_list_table", g_dls);
}

function update_table_dlma_list() {
  console.log("Fired update_table_dlma_list.");

  table_update("dlma_list_table", g_dlmas);
}

/**
@brief Create dlma list table.
*/
function create_table_dlma_list() {
  console.log("Fired create_table_dlma_list.");

  // create table
  dlma_list_columns = [
    { id: "uuid", data: "uuid", title: "Uuid"},
    { id: "name", data: "name", title: "Name" },
    { id: "detail", data: "detail", title: "Description" },
    { id: "dl_table", data: "dl_table", title: "Dial list table" }
  ];
  table_create("dlma_list_table", dlma_list_columns, dlma_list_table_double_click);
}

/**
@brief Create dl list table.
*/
function create_table_dl_list() {
  console.log("Fired create_table_dl_list.");


  // add all dl list
  dl_list_columns = [
    { id: "uuid", data: "uuid", title: "Uuid"},
    { id: "name", data: "name", title: "Name" },
    { id: "detail", data: "detail", title: "Description" },
    { id: "status", data: "status", title: "Status" },
    { id: "dlma_uuid", data: "dlma_uuid", title: "Dial list master uuid"}
  ];
  table_create("dl_list_table", dl_list_columns, dl_list_table_double_click);

  // add_table("dl_list_table", g_dls, dl_list_columns, update_dl_detail);
}

function get_dl_detail_from_form() {
  console.log("Fired get_dl_detail_from_form.");

  data = {};

  // basic info
  data.uuid = document.getElementById("dl_detail_uuid").value;
  data.name = document.getElementById("dl_detail_name").value;
  data.detail = document.getElementById("dl_detail_description").value;
  data.status = document.getElementById("dl_detail_status").value;
  data.dlma_uuid = document.getElementById("dl_detail_dlma_uuid").value;

  // contact
  data.email = document.getElementById("dl_detail_email").value;
  data.number_1 = document.getElementById("dl_detail_number_1").value;
  data.number_2 = document.getElementById("dl_detail_number_2").value;
  data.number_3 = document.getElementById("dl_detail_number_3").value;
  data.number_4 = document.getElementById("dl_detail_number_4").value;
  data.number_5 = document.getElementById("dl_detail_number_5").value;
  data.number_6 = document.getElementById("dl_detail_number_6").value;
  data.number_7 = document.getElementById("dl_detail_number_7").value;
  data.number_8 = document.getElementById("dl_detail_number_8").value;

  // try count
  data.trycnt_1 = document.getElementById("dl_detail_try_count_1").value;
  data.trycnt_2 = document.getElementById("dl_detail_try_count_2").value;
  data.trycnt_3 = document.getElementById("dl_detail_try_count_3").value;
  data.trycnt_4 = document.getElementById("dl_detail_try_count_4").value;
  data.trycnt_5 = document.getElementById("dl_detail_try_count_5").value;
  data.trycnt_6 = document.getElementById("dl_detail_try_count_6").value;
  data.trycnt_7 = document.getElementById("dl_detail_try_count_7").value;
  data.trycnt_8 = document.getElementById("dl_detail_try_count_8").value;


  // dialing info
  data.dialing_camp_uuid = document.getElementById("dl_detail_dialing_camp_uuid").value;
  data.dialing_plan_uuid = document.getElementById("dl_detail_dialing_plan_uuid").value;
  data.dialing_uuid = document.getElementById("dl_detail_dialing_uuid").value;

  // result
  data.res_dial = document.getElementById("dl_detail_res_dial").value;
  data.res_dial_detail = document.getElementById("dl_detail_res_dial_detail").value;
  data.res_hangup = document.getElementById("dl_detail_res_hangup").value;
  data.res_hangup_detail = document.getElementById("dl_detail_res_hangup_detail").value;

  // last
  data.tm_last_dial = document.getElementById("dl_detail_tm_last_dial").value;
  data.tm_last_hangup = document.getElementById("dl_detail_tm_last_hangup").value;

  //
  data.resv_target = document.getElementById("dl_detail_resv_target").value;
  data.ukey = document.getElementById("dl_detail_ukey").value;


  // variables
  data.variables = JSON.parse(document.getElementById("dl_detail_variables").value);

  // other info
  data.in_use = document.getElementById("dl_detail_in_use").value;
  data.tm_create = document.getElementById("dl_detail_tm_create").value;
  data.tm_update = document.getElementById("dl_detail_tm_update").value;
  data.tm_delete = document.getElementById("dl_detail_tm_delete").value;

  return data;
}

function bt_create_dl_detail() {
  console.log("Fired bt_create_dl_detail.");

  // get data info from the form
  data = get_dl_detail_from_form();

  // delete unnecessary items
  delete data.uuid;
  delete data.in_use;
  delete data.tm_create;
  delete data.tm_update;
  delete data.tm_delete;

  // send request
  console.log(data);
  send_create_dl_request(data);
}

function bt_update_dl_detail() {
  console.log("Fired bt_update_dl_detail.");

  // get data info from the form
  data = get_dl_detail_from_form();

  // delete unnecessary items
  delete data.in_use;
  delete data.tm_create;
  delete data.tm_update;
  delete data.tm_delete;

  console.log(data);

  send_update_dl_request(data);
}

function bt_delete_dl_detail() {
  console.log("Fired bt_delete_dl_detail.");

  // get data info from the form
  data = get_dl_detail_from_form();

  // delete unnecessary items
  delete data.in_use;
  delete data.tm_create;
  delete data.tm_update;
  delete data.tm_delete;

  console.log(data);

  send_delete_dl_request(data);
}

/**
 * Send request for dl create
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
function send_create_dl_request(data) {
  console.log("Fired send_create_dl_request.")

  url = domain + "/ob/dls";
  console.log("Query url info. url[" + url + "]");

  send_request(url, "POST", data);
}

/**
 * Send request for dl update
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
function send_update_dl_request(data) {
  console.log("Fired send_update_dl_request.")

  url = domain + "/ob/dls/" + data.uuid;
  console.log("Query url info. url[" + url + "]");

  send_request(url, "PUT", data);
}

/**
 * Send request for dl delete
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
function send_delete_dl_request(data) {
  console.log("Fired send_delete_dl_request.")

  url = domain + "/ob/dls/" + data.uuid;
  console.log("Query url info. url[" + url + "]");

  send_request(url, "DELETE", data);
}

// run!
$(document).ready(function() {

  // create tables
  create_table_dlma_list();
  create_table_dl_list();

  // update tables
  update_table_dlma_list();
  update_table_dl_list();

  console.log('ob_dial_list.js');
});
