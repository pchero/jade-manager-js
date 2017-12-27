const domain = "http://localhost:8081";

var g_core_channels = TAFFY();
var g_core_systems = TAFFY();

var g_agent_agents = TAFFY();

var g_ob_campaigns = TAFFY();
var g_ob_destinations = TAFFY();
var g_ob_dialings = TAFFY();
var g_ob_dlmas = TAFFY();
var g_ob_dls = TAFFY();
var g_ob_plans = TAFFY();

var g_park_parkinglots = TAFFY();
var g_park_parkedcalls = TAFFY();

var g_pjsip_aors = TAFFY();
var g_pjsip_auths = TAFFY();
var g_pjsip_contacts = TAFFY();
var g_pjsip_endpoints = TAFFY();
var g_pjsip_transports = TAFFY();

var g_queue_entries = TAFFY();
var g_queue_members = TAFFY();
var g_queue_queues = TAFFY();

var g_vm_messages = TAFFY();
var g_vm_users = TAFFY();

/**
 * Get all data from jade.
 * @return {[type]} [description]
 */
function init_data() {
  console.log("Fired init_data.");
  
  console.log("Get data", name);


  targets = [
    ["/core/channels", g_core_channels],
    ["/core/systems", g_core_systems],

    ///////////////////
    ["/agent/agents", g_agent_agents],

    ["/ob/campaigns", g_ob_campaigns],
    ["/ob/destinations", g_ob_destinations],
    ["/ob/dialings", g_ob_dialings],
    ["/ob/dlmas", g_ob_dlmas],
    ["/ob/dls", g_ob_dls],
    ["/ob/plans", g_ob_plans],

    ["/park/parkinglots", g_park_parkinglots],
    ["/park/parkedcalls", g_park_parkedcalls],

    ["/pjsip/aors", g_pjsip_aors],
    ["/pjsip/auths", g_pjsip_auths],
    ["/pjsip/contacts", g_pjsip_contacts],
    ["/pjsip/endpoints", g_pjsip_endpoints],
    ["/pjsip/transports", g_pjsip_transports],

    ["/queue/entries", g_queue_entries],
    ["/queue/entries", g_queue_entries],
    ["/queue/members", g_queue_members],
    ["/queue/queues", g_queue_queues],

    ["/voicemail/users", g_vm_users],
    ["/voicemail/vms", g_vm_messages],
  ];

  for(var i = 0; i < targets.length; i++) {

    target = targets[i];

    try {
      // get data
      url = domain + target[0];
      console.log("Sending init data request. " + url);

      tmp_res = send_request(url, "GET", null, false);
      // console.log("Result. " + tmp_res);

      if(tmp_res == null) {
        console.log("Could not get result.");
        continue;
      }
      // parsing data
      res = JSON.parse(tmp_res);

      if(res.statuscode != 200) {
        // wrong message get
        console.log("Could not get correct result.");
        continue;
      }

      // insert data
      for(var j = 0; j < res.result.list.length; j++) {
        target[1].insert(res.result.list[j]);
      }
    }
    catch(err) {
      console.log("Error. " + err.message);
    }
  }

  // init websock
  connect_websock();
}

function connect_websock() {

  console.log("Fired connect_websock.");

  // Let us open a web socket
  var ws = new WebSocket("ws://localhost:3000/");

  ws.onopen = function() {
    // Web Socket is connected, send data using send()
    // ws.send("Message to send");
    console.log("Websocket is opened.");
  };

  ws.onmessage = function (evt)  { 
    var received_msg = evt.data;
    console.log("Received message.", evt.data);

    websock_msg_handler(evt.data);
  };

  ws.onclose = function() { 
    // websocket is closed.
    console.log("Websocket is closed.");
  };

  window.onbeforeunload = function(event) {
    socket.close();
  };
}

/**
 * Send request to the given parameters
 * @param  {[type]}  url       [description]
 * @param  {[type]}  method    [description]
 * @param  {[type]}  data      [description]
 * @param  {Boolean} async_flg [description]
 * @return {[type]}            [description]
 */
function send_request(url, method, data, async_flg=true) {

  console.log("Fired send_request. " + async_flg);

  var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
  xmlhttp.open(method, url, async_flg);
  xmlhttp.setRequestHeader("Content-Type", "application/json");

  // subscribe to this event before you send your request.
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4) {
      //alert the user that a response now exists in the responseTest property.
      // alert(xmlhttp.responseText);
      // And to view in firebug
      console.log('xhr',xmlhttp)
    }
  }


  res = xmlhttp.send(data ? JSON.stringify(data) : null);
  console.log("Result. " + xmlhttp.responseText);

  return xmlhttp.responseText;

}

function  send_request_download(url, method, data, async_flg=true, filename="temp") {

  console.log("Fired send_request_download.");

  // parsing the send data
  if(method == "GET") {
    send_data = data;
  }
  else {
    send_data = JSON.stringify(data);
  }

  try {
    // send request
    jQuery.ajax({
        url: url,
        type: method,
        data: send_data,
        xhrFields: {
            responseType: 'blob'
        },
        success: function(data, status, xhr) {
          var a = document.createElement('a');
          var tmp_url = window.URL.createObjectURL(data);
          a.href = tmp_url;
          a.download = filename;
          a.click();
          window.URL.revokeObjectURL(tmp_url);
        },
        error: function(e) {
          console.log(e.message);
          // alert(e.message);
        }
    });
  }
  catch(err) {
    console.log("Error. " + err.message);
  }
}


/**
@brief Update the table
*/
function table_update(id, db) {
  console.log("Fired table_update. " + id);
  var table = $('#' + id).DataTable();

  // clear
  table.clear().draw();

  console.log(db().get());

  // insert
  if(db().get() == {}) {
    console.log("Nothing!");
  }
  else {
    table.rows.add(db().get()).draw();
  }
}

/**
@brief Add the table to the given id.
*/
function table_create(id, columns, func_dblclick) {
  console.log("Fired table_create. " + id + ", " + columns);

  // create table and add it.
  table = $('#' + id).DataTable({
    // data: res,
    deferRender: true,
    // colReorder: true,
    // scrollY: 380,
    // scrollCollapse: true,
    // scroller: true,
    columns: columns
  });

  // add double click event
  $('#' + id +' tbody').on('dblclick', 'tr', function () {
    console.log("Selected row. " + this);

    // call the double function
    if(func_dblclick != null) {
      func_dblclick(this);
    }
  });

  // add one click event
  $('#' + id +' tbody').on('click', 'tr', function () {
    $(this).addClass('active').siblings().removeClass('active');
  });
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
  // $('#' + id).on('dblclick', 'tr', function () {
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


function websock_msg_handler(message) {
  j_data = JSON.parse(message);
  keys = Object.keys(j_data);

  for(var i = 0; i < keys.length; i++) {
    key = keys[i];

    console.log("Received key", key);

    if(key == "core.channel.create") {
      g_core_channels.insert(j_data[key]);
    }
    else if(key == "core.channel.update") {
      g_core_channels({unique_id: j_data[key]["unique_id"]}).update(j_data[key]);
    }
    else if(key == "core.channel.delete") {
      g_core_channels({unique_id: j_data[key]["unique_id"]}).remove();
    }
  }
}