
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
  campaign = g_campaigns({uuid: uuid}).first();

  // set campaign info
  document.getElementById("campaign_detail_uuid").value = campaign.uuid;
  // document.getElementById("campaign_detail_name").setAttribute("value", campaign.name);
  document.getElementById("campaign_detail_name").value = campaign.name;
  document.getElementById("campaign_detail_description").value = campaign.detail;
  document.getElementById("campaign_detail_status").value = campaign.status;

  // related info
  document.getElementById("campaign_detail_plan").value = campaign.plan;
  document.getElementById("campaign_detail_destination").value = campaign.destination;
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
  document.getElementById("campaign_detail_variables").value = campaign.variables;
  document.getElementById("campaign_detail_next_campaign").value = campaign.next_campaign;
  document.getElementById("campaign_detail_in_use").value = campaign.in_use;

  // timestamp
  document.getElementById("campaign_detail_tm_create").value = campaign.tm_create;
  document.getElementById("campaign_detail_tm_update").value = campaign.tm_update;
  document.getElementById("campaign_detail_tm_delete").value = campaign.tm_delete;

}

// run!
$(document).ready(function() {

  // add all campaign list
  campaign_list_columns = [
    { id: "uuid", title: "Uuid"},
    { id: "name", title: "Name" },
    { id: "detail", title: "Desc" },
    { id: "status", title: "Status" }
  ];
  add_table("campaign_list_table", g_campaigns, campaign_list_columns);

  // update_campaign_detail(null);

  console.log('ob_campaign.js');
});
