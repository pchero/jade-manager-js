
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
  $('#' + id).DataTable({
    data: res,
    deferRender: true,
    // scrollY: 380,
    // scrollCollapse: true,
    // scroller: true,
    columns: columns
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


// run!
$(document).ready(function() {
  // total_campaigns
  add_count("campaigns_count", g_campaigns);

  // total dialings
  add_count("dialings_count", g_dialings);

  // total plans
  add_count("plans_count", g_plans);

  // total destination
  add_count("destinations_count", g_destinations);

  // total dlmas
  add_count("dlmas_count", g_dlmas);

  // add all campaigns info
  campaign_columns = [
    { title: "Uuid", id: "uuid"},
    { title: "Name", id: "name"},
    { title: "Desc", id: "detail"},
    { title: "Status", id: "status"}
  ];
  add_table("campaigns_all_table", g_campaigns, campaign_columns);

  // add all dialings info
  dialing_columns = [
    { title: "Uuid", id: "uuid"},
    { title: "Channel", id: "channel"},
    { title: "Status", id: "status"},
    { title: "Dial address", id: "dial_addr"},
    { title: "Dial channel", id: "dial_channel"},
    { title: "Dial result", id: "res_dial"}
  ];
  add_table("dialings_all_table", g_dialings, dialing_columns);

  // add all plans info
  plans_columns = [
    { title: "Uuid", id: "uuid"},
    { title: "Name", id: "name"},
    { title: "Desc", id: "detail"}
  ];
  add_table("plans_all_table", g_plans, plans_columns);

  // add all destinations info
  destination_columns = [
    { title: "Uuid", id: "uuid"},
    { title: "Name", id: "name"},
    { title: "Desc", id: "detail"}
  ];
  add_table("destinations_all_table", g_destinations, destination_columns);

  // add all dlma info
  dlma_columns = [
    { title: "Uuid", id: "uuid"},
    { title: "Name", id: "name"},
    { title: "Desc", id: "detail"}
  ];
  add_table("dlmas_all_table", g_dlmas, dlma_columns);



  console.log('run_datatables');
});
