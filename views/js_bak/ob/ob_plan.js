
/**
@brief Add the table to the given id.
*/
function add_table(id, db, columns) {
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
    update_plan_detail(data[0]);
  });

  // add one click event
  $('#' + id +' tbody').on('click', 'tr', function () {
    $(this).addClass('active').siblings().removeClass('active');
  });
}


/**
@brief Add the count of given db to the given id.
*/
function add_count(id, db) {
  console.log("Fired add_count" + id + ", " + db);

  count = db().count();
  document.getElementById(id).innerHTML = count;
}

function setAttributes(el, attrs) {
  for(var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

function plan_list_table_double_click(row) {
  console.log("Fired plan_list_table_double_click.");

  message_id = row.cells.item(0).innerText;

  update_plan_detail(message_id);
}

/**
@brief Update plan detail info
*/
function update_plan_detail(uuid) {
  console.log("Fired update_plan_detail. " + uuid);

  // get data
  data = g_ob_plans({uuid: uuid}).first();

  // set basic info
  document.getElementById("plan_detail_uuid").value = data.uuid;
  document.getElementById("plan_detail_name").value = data.name;
  document.getElementById("plan_detail_description").value = data.detail;

  // dial 
  document.getElementById("plan_detail_tech_name").value = data.tech_name;
  document.getElementById("plan_detail_trunk_name").value = data.trunk_name;
  document.getElementById("plan_detail_dial_mode").value = data.dial_mode;
  document.getElementById("plan_detail_dial_timeout").value = data.dial_timeout;

  // dialing
  document.getElementById("plan_detail_dl_end_handle").value = data.dl_end_handle;
  document.getElementById("plan_detail_caller_id").value = data.caller_id;
  document.getElementById("plan_detail_service_level").value = data.service_level;
  document.getElementById("plan_detail_early_media").value = data.early_media;
  document.getElementById("plan_detail_codecs").value = data.codecs;
  
  // variables
  document.getElementById("plan_detail_variables").value = JSON.stringify(data.variables);

  // retry
  document.getElementById("plan_detail_retry_delay").value = data.retry_delay;
  document.getElementById("plan_detail_max_retry_count_1").value = data.max_retry_cnt_1;
  document.getElementById("plan_detail_max_retry_count_2").value = data.max_retry_cnt_2;
  document.getElementById("plan_detail_max_retry_count_3").value = data.max_retry_cnt_3;
  document.getElementById("plan_detail_max_retry_count_4").value = data.max_retry_cnt_4;
  document.getElementById("plan_detail_max_retry_count_5").value = data.max_retry_cnt_5;
  document.getElementById("plan_detail_max_retry_count_6").value = data.max_retry_cnt_6;
  document.getElementById("plan_detail_max_retry_count_7").value = data.max_retry_cnt_7;
  document.getElementById("plan_detail_max_retry_count_8").value = data.max_retry_cnt_8;
  
  // other info
  document.getElementById("plan_detail_in_use").value = data.in_use;
  document.getElementById("plan_detail_tm_create").value = data.tm_create;
  document.getElementById("plan_detail_tm_update").value = data.tm_update;
  document.getElementById("plan_detail_tm_delete").value = data.tm_delete;

}

function get_plan_detail_from_form() {
  console.log("Fired get_plan_detail_from_form.");

  data = {};

  // basic info
  data.uuid = document.getElementById("plan_detail_uuid").value;
  data.name = document.getElementById("plan_detail_name").value;
  data.detail = document.getElementById("plan_detail_description").value;

  // dial 
  data.tech_name = document.getElementById("plan_detail_tech_name").value;
  data.trunk_name = document.getElementById("plan_detail_trunk_name").value;
  data.dial_mode = document.getElementById("plan_detail_dial_mode").value;
  data.dial_timeout = document.getElementById("plan_detail_dial_timeout").value;

  // dialing
  data.dl_end_handle = document.getElementById("plan_detail_dl_end_handle").value;
  data.caller_id = document.getElementById("plan_detail_caller_id").value;
  data.service_level = document.getElementById("plan_detail_service_level").value;
  data.early_media = document.getElementById("plan_detail_early_media").value;
  data.codecs = document.getElementById("plan_detail_codecs").value;

  // // variables
  data.variables = JSON.parse(document.getElementById("plan_detail_variables").value);

  // retry
  data.retry_delay = document.getElementById("plan_detail_retry_delay").value;
  data.max_retry_cnt_1 = document.getElementById("plan_detail_max_retry_count_1").value;
  data.max_retry_cnt_2 = document.getElementById("plan_detail_max_retry_count_2").value;
  data.max_retry_cnt_3 = document.getElementById("plan_detail_max_retry_count_3").value;
  data.max_retry_cnt_4 = document.getElementById("plan_detail_max_retry_count_4").value;
  data.max_retry_cnt_5 = document.getElementById("plan_detail_max_retry_count_5").value;
  data.max_retry_cnt_6 = document.getElementById("plan_detail_max_retry_count_6").value;
  data.max_retry_cnt_7 = document.getElementById("plan_detail_max_retry_count_7").value;
  data.max_retry_cnt_8 = document.getElementById("plan_detail_max_retry_count_8").value;

  // other info
  data.in_use = document.getElementById("plan_detail_in_use").value;
  data.tm_create = document.getElementById("plan_detail_tm_create").value;
  data.tm_update = document.getElementById("plan_detail_tm_update").value;
  data.tm_delete = document.getElementById("plan_detail_tm_delete").value;

  return data;
}

function bt_create_plan_detail() {
  console.log("Fired bt_create_plan_detail.");

  // get plan info from the form
  data = get_plan_detail_from_form();

  // delete unnecessary items
  delete data.uuid;
  delete data.in_use;
  delete data.tm_create;
  delete data.tm_update;
  delete data.tm_delete;

  // send request 
  console.log(data);
  send_create_plan_request(data);
}

function bt_update_plan_detail() {
  console.log("Fired bt_update_plan_detail.");

  // get plan info from the form
  data = get_plan_detail_from_form();

  // delete unnecessary items
  delete data.in_use;
  delete data.tm_create;
  delete data.tm_update;
  delete data.tm_delete;

  console.log(data);

  send_update_plan_request(data);
}

function bt_delete_plan_detail() {
  console.log("Fired bt_delete_plan_detail.");

  // get data info from the form
  data = get_plan_detail_from_form();

  // delete unnecessary items
  delete data.in_use;
  delete data.tm_create;
  delete data.tm_update;
  delete data.tm_delete;

  console.log(data);

  send_delete_plan_request(data);
}

/**
 * Send request for plan create
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
function send_create_plan_request(data) {
  console.log("Fired send_create_plan_request.")

  url = domain + "/ob/plans";
  console.log("Query url info. url[" + url + "]");

  send_request(url, "POST", data);
}

/**
 * Send request for plan update
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
function send_update_plan_request(data) {
  console.log("Fired send_update_plan_request.")

  url = domain + "/ob/plans/" + data.uuid;
  console.log("Query url info. url[" + url + "]");

  send_request(url, "PUT", data);
}

/**
 * Send request for plan delete
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
function send_delete_plan_request(data) {
  console.log("Fired send_delete_plan_request.")

  url = domain + "/ob/plans/" + data.uuid;
  console.log("Query url info. url[" + url + "]");

  send_request(url, "DELETE", data);
}

// run!
$(document).ready(function() {


  // add all plan list
  plan_list_columns = [
    { id: "uuid", data: "uuid", title: "Uuid"},
    { id: "name", data: "name", title: "Name" },
    { id: "detail", data: "detail", title: "Description" },
    { id: "dial_mode", data: "dial_mode", title: "Dial mode" }
  ];

  table_create("plan_list_table", plan_list_columns, plan_list_table_double_click);
  table_update("plan_list_table", g_ob_plans);

  console.log('ob_plan.js');
});
