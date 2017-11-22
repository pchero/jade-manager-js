
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

  // add all campaigns info
  campaign_columns = [
    { id: "uuid", title: "Uuid"},

    { id: "name", title: "Name" },
    { id: "detail", title: "Desc" },
    { id: "status", title: "Status" },

    { id: "plan", title: "Plan" }, 
    { id: "dest", title: "Destination" },
    { id: "dlma", title: "Dial list master" }, 

    { id: "variables", title: "Variables" },

    { id: "next_campaign", title: "Next campaign" },

    { id: "sc_mode", title: "Schedule mode" },
    { id: "sc_time_start", title: "Scedule time start" },
    { id: "sc_time_end", title: "Schedule time end" }, 
    { id: "sc_date_start", title: "Schedule date start" },
    { id: "sc_date_end", title: "Schedule date end" },
    { id: "sc_date_list", title: "Schedule date list" },
    { id: "sc_date_list_except", title: "Schedule list except" },
    { id: "sc_day_list", title: "Schedule day list"},
  ];
  add_table("campaign_detail_table", g_campaigns, campaign_columns);

  console.log('ob_campaign.js');
});
