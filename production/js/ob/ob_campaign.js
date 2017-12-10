
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
    update_campaign_detail(data[0]);
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

function create_campaign_label(label) {
  res = document.createElement("label");
  text = document.createTextNode(label);

  res.setAttribute("class", "control-label col-md-3 col-sm-3 col-xs-12");
  res.appendChild(text);

  return res;
}

function setAttributes(el, attrs) {
  for(var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

/**
@brief Update campaign detail info
*/
function update_campaign_detail(uuid) {
  console.log("Fired update_campaign_detail. " + uuid);

  // get data
  campaign = g_ob_campaigns({uuid: uuid}).first();

  // set campaign info
  document.getElementById("campaign_detail_uuid").value = campaign.uuid;
  document.getElementById("campaign_detail_name").value = campaign.name;
  document.getElementById("campaign_detail_description").value = campaign.detail;
  document.getElementById("campaign_detail_status").value = campaign.status;

  // related info
  document.getElementById("campaign_detail_plan").value = campaign.plan;
  document.getElementById("campaign_detail_destination").value = campaign.dest;
  document.getElementById("campaign_detail_dlma").value = campaign.dlma;

  // schedule
  document.getElementById("campaign_detail_sc_mode").value = campaign.sc_mode;
  document.getElementById("campaign_detail_sc_time_start").value = campaign.sc_time_start;
  document.getElementById("campaign_detail_sc_time_end").value = campaign.sc_time_end;
  document.getElementById("campaign_detail_sc_date_start").value = campaign.sc_date_start;
  document.getElementById("campaign_detail_sc_date_end").value = campaign.sc_date_end;
  document.getElementById("campaign_detail_sc_date_list").value = campaign.sc_date_list;
  document.getElementById("campaign_detail_sc_date_list_except").value = campaign.sc_date_list_except;
  document.getElementById("campaign_detail_sc_day_list").value = campaign.sc_day_list;

  // other info
  document.getElementById("campaign_detail_variables").value = JSON.stringify(campaign.variables);
  document.getElementById("campaign_detail_next_campaign").value = campaign.next_campaign;
  document.getElementById("campaign_detail_in_use").value = campaign.in_use;

  // timestamp
  document.getElementById("campaign_detail_tm_create").value = campaign.tm_create;
  document.getElementById("campaign_detail_tm_update").value = campaign.tm_update;
  document.getElementById("campaign_detail_tm_delete").value = campaign.tm_delete;

}

function get_campaign_detail_from_form() {
  console.log("Fired get_campaign_detail_from_form.");

  data = {};

  data.uuid = document.getElementById("campaign_detail_uuid").value;
  data.name = document.getElementById("campaign_detail_name").value;
  data.detail = document.getElementById("campaign_detail_description").value;
  data.status = document.getElementById("campaign_detail_status").value;

  // related info
  data.plan = document.getElementById("campaign_detail_plan").value;
  data.dest = document.getElementById("campaign_detail_destination").value;
  data.dlma = document.getElementById("campaign_detail_dlma").value;

  // schedule
  data.sc_mode = document.getElementById("campaign_detail_sc_mode").value;
  data.sc_time_start = document.getElementById("campaign_detail_sc_time_start").value;
  data.sc_time_end = document.getElementById("campaign_detail_sc_time_end").value = campaign.sc_time_end;
  data.sc_date_start = document.getElementById("campaign_detail_sc_date_start").value = campaign.sc_date_start;
  data.sc_date_end = document.getElementById("campaign_detail_sc_date_end").value = campaign.sc_date_end;
  data.sc_date_list = document.getElementById("campaign_detail_sc_date_list").value = campaign.sc_date_list;
  data.sc_date_list_except = document.getElementById("campaign_detail_sc_date_list_except").value = campaign.sc_date_list_except;
  data.sc_day_list = document.getElementById("campaign_detail_sc_day_list").value = campaign.sc_day_list;

  // // other info
  console.log("variables: " + document.getElementById("campaign_detail_variables").value);
  data.variables = JSON.parse(document.getElementById("campaign_detail_variables").value);
  data.next_campaign = document.getElementById("campaign_detail_next_campaign").value;
  data.in_use = document.getElementById("campaign_detail_in_use").value;

  // timestamp
  data.tm_create = document.getElementById("campaign_detail_tm_create").value;
  data.tm_update = document.getElementById("campaign_detail_tm_update").value;
  data.tm_delete = document.getElementById("campaign_detail_tm_delete").value;

  return data;
}

function bt_create_campaign_detail() {
  console.log("Fired create_campaign_detail.");

  // get campaign info from the form
  data = get_campaign_detail_from_form();

  // delete unnecessary items
  delete data.uuid;
  delete data.in_use;
  delete data.tm_create;
  delete data.tm_update;
  delete data.tm_delete;

  // send request 
  console.log(data);
  send_create_campaign_request(data);
}

function bt_update_campaign_detail() {
  console.log("Fired update_campaign_detail.");

  // get campaign info from the form
  data = get_campaign_detail_from_form();

  // delete unnecessary items
  delete data.in_use;
  delete data.tm_create;
  delete data.tm_update;
  delete data.tm_delete;

  console.log(data);

  send_update_campaign_request(data);
}

function bt_delete_campaign_detail() {
  console.log("Fired update_campaign_detail.");

  // get campaign info from the form
  data = get_campaign_detail_from_form();

  // delete unnecessary items
  delete data.in_use;
  delete data.tm_create;
  delete data.tm_update;
  delete data.tm_delete;

  console.log(data);

  send_delete_campaign_request(data);
}

/**
 * Send request for campaign create
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
function send_create_campaign_request(data) {
  console.log("Fired send_create_campaign_request.")

  url = domain + "/ob/campaigns";
  console.log("Query url info. url[" + url + "]");

  send_request(url, "POST", data);
}

/**
 * Send request for campaign update
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
function send_update_campaign_request(data) {
  console.log("Fired send_update_campaign_request.")

  url = domain + "/ob/campaigns/" + data.uuid;
  console.log("Query url info. url[" + url + "]");

  send_request(url, "PUT", data);
}

/**
 * Send request for campaign delete
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
function send_delete_campaign_request(data) {
  console.log("Fired send_delete_campaign_request.")

  url = domain + "/ob/campaigns/" + data.uuid;
  console.log("Query url info. url[" + url + "]");

  send_request(url, "DELETE", data);
}


// run!
$(document).ready(function() {

  // add all campaign list
  campaign_list_columns = [
    { id: "uuid", title: "Uuid"},
    { id: "name", title: "Name" },
    { id: "detail", title: "Description" },
    { id: "status", title: "Status" }
  ];
  add_table("campaign_list_table", g_ob_campaigns, campaign_list_columns);

  console.log('ob_campaign.js');
});
