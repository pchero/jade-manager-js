

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


function  send_request_download(url, method, data, async_flg=true, filename="temp") {

  console.log("Fired send_request_download.");

  // parsing the send data
  if(method == "GET") {
    send_data = data;
  }
  else {
    send_data = JSON.stringify(data);
  }

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
      }
  });

}


/**
@brief Update the table
*/
function table_update(id, db) {
  console.log("Fired table_update." + id);
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
