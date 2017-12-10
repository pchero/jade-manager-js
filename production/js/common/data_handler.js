const domain = "http://pchero21.com:8081";

var g_ob_campaigns = TAFFY();
var g_ob_destinations = TAFFY();
var g_ob_dialings = TAFFY();
var g_ob_dlmas = TAFFY();
var g_ob_dls = TAFFY();
var g_ob_plans = TAFFY();

var g_vm_messages = TAFFY();
var g_vm_users = TAFFY();

/**
 * Get all data from jade.
 * @return {[type]} [description]
 */
function init_data() {

  console.log("Fired init_data.");

  targets = [
    ["/ob/campaigns", g_ob_campaigns],
    ["/ob/destinations", g_ob_destinations],
    ["/ob/dialings", g_ob_dialings],
    ["/ob/dlmas", g_ob_dlmas],
    ["/ob/dls", g_ob_dls],
    ["/ob/plans", g_ob_plans],

    ["/voicemail/vms", g_vm_messages],
    ["/voicemail/users", g_vm_users],
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
}


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



/**
 * Send request
 * @param  {[type]} url    [description]
 * @param  {[type]} method [description]
 * @param  {[type]} data   [description]
 * @return {[type]}        [description]
 */
function send_request_(url, method, data, async_flg=true) {
  var res;

  console.log("Fired send_request. " + url);
  console.log("Insert data. " + data);

  // // parsing the send data
  // if(data != null) {
  //   if(method == "GET") {
  //     send_data = data;

  //     tmp = {data: data};
  //   }
  //   else {
  //     send_data = JSON.stringify(data);
  //     tmp = {dataType: "application/json", data: send_data};
  //   }
  //   // tmp = {dataType: "application/json", data: send_data};
  // }
  // else {
  //   tmp = {};
  // }
  // 
  
  data = {data:"sample"};

  tmp = {};
  if(data != null) {
    send_data = JSON.stringify(data);
    tmp = {
      dataType: "json", 
      traditional: true,
      // data: send_data,
      data: '{"method":"getStates", "program":"EXPLORE"}',
      // ContentLength: send_data.length,
      contentType: "application/x-www-form-urlencoded"
      // processData: false
    };
  }
  console.log("Data: " + tmp.data);


  // tmp_data = JSON.stringify(data);
  // console.log("data. " + tmp_data);

  // if(data != null) {
  //   tmp = {
  //     dataType: "application/json",
  //     data: data
  //   };
  // }


  // send_data = null;

  // if(send_data != null) {
  //   if(method == "GET") {
  //     send_data = data;
  //   }
  //   else {
  //     send_data = JSON.stringify(data);
  //   }
  // }
  

  // send request
  res = null;
  jQuery.ajax({
      type: method,
      url: url,
      cache: false,
      async: async_flg,
      // dataType: "application/json", 
      // data: send_data,

      tmp,
      // dataType: "application/json", 
      // data: data,
      // contentType: "application/json",


      success: function(response){
        // console.log("Result. " + response);
        // console.log("Result. " + response.responseText);
        res = response;
      },
      error: function(e) {
        console.log(e.message);
        // return null;
        // alert(e.message);
      }
  });

  // console.log("Return data. " + res);
  return res;
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
  var table = $('#' + id);

  // clear
  table.DataTable().clear().draw();

  // insert
  table.DataTable().rows.add(db().get()).draw();
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
    func_dblclick(this);
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
