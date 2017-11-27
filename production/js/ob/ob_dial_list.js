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
    console.log("Double click data. " + data);

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

  // make clean
  $("dl_list_table").empty();

  // get dls
  get_dial_list(uuid, 1000);

  // $("dl_list_table").DataTable().ajax.reload();

}

function create_table_dl_list() {
  // add all dl list
  dl_list_columns = [
    { id: "uuid", title: "Uuid"},
    { id: "name", title: "Name" },
    { id: "detail", title: "Description" },
    { id: "status", title: "Status" },
    { id: "dlma_uuid", title: "Dial list master uuid"}
  ];
  add_table("dl_list_table", g_dls, dl_list_columns, update_dl_detail);
}

function update_dl_list_org(uuid) {
  console.log("Fired update_dl_list. " + uuid);

  // get dls
  get_dial_list(uuid, 1000);

  // add all dl list
  dl_list_columns = [
    { id: "uuid", title: "Uuid"},
    { id: "name", title: "Name" },
    { id: "detail", title: "Description" },
    { id: "status", title: "Status" },
    { id: "dlma_uuid", title: "Dial list master uuid"}
  ];
  add_table("dl_list_table", g_dls, dl_list_columns, update_dl_detail);
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


/**
 * Send request
 * @param  {[type]} url    [description]
 * @param  {[type]} method [description]
 * @param  {[type]} data   [description]
 * @return {[type]}        [description]
 */
function send_request(url, method, data, async_flg=true) {
  console.log("Fired send_request.");

  // parsing the send data
  if(method == "GET") {
    send_data = data;
  }
  else {
    send_data = JSON.stringify(data);
  }

  // send request
  resp = jQuery.ajax({
      type: method,
      url: url,
      cache: false,
      async: async_flg,
      dataType: "application/json",
      data: send_data
    });
  return resp.responseText;
}

// run!
$(document).ready(function() {

  create_table_dl_list();

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
