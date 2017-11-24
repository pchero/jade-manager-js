
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
 * Add the campaign's detail info.
 * @param {[type]} id   [description]
 * @param {[type]} uuid [description]
 */
function add_campaign_detail(id, uuid) {
  console.log("Fired add_campaign_detail. " + id + ", " + uuid);

  // get data
  campaign = g_campaigns({uuid: uuid}).first();

  // set uuid
  div = document.createElement("div");
  div.setAttribute("class", "form-group");
  div.appendChild(create_campaign_label("UUID"));

  item = document.createElement("input");
  setAttributes(item, {"type": "text", "class": "form-control", "readonly": "readonly", "placeholder": campaign.uuid});

  // item.setAttribute("type", "text");
  // item.setAttribute("class", "form-control");
  // item.setAttribute("readonly", "readonly");
  // item.setAttribute("placeholder", campaign.uuid);

  tmp_div = document.createElement("div");
  tmp_div.setAttribute("class", "col-md-9 col-sm-9 col-xs-12");
  tmp_div.appendChild(item);

  div.appendChild(tmp_div);

  form = document.createElement("form");
  form.setAttribute("class", "form-horizontal form-label-left");
  form.appendChild(div)

  document.getElementById(id).appendChild(form);

                      // <div class="form-group">
                      //   <label class="control-label col-md-3 col-sm-3 col-xs-12">UUID</label>
                      //   <div class="col-md-9 col-sm-9 col-xs-12">
                      //     <input type="text" class="form-control" disabled="disabled" placeholder="Default Input">
                      //   </div>
                      // </div>
                      



  // name
  // description
  // status
  // schedule mode
  // 
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


  // add detail campaigns info
  add_campaign_detail("campaign_detail_info", "2d954c66-8943-4798-ad30-0afe84b0449e");

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
