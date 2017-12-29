// run!
$(document).ready(function() {

  // add all list
  table_columns = [
    { id: "filename", data: "filename", title: "Filename"},
  ];
  table_create("list_table", table_columns, update_detail_list);

  table_update("list_table", g_vm_settings);

  console.log('vm_old_settings.js');
});


/**
@brief Update list detail info
*/
function update_detail_list(data) {
  console.log("Fired update_detail_list. " + data);

  delete data.___id;
  delete data.___s;

  res = JSON.stringify(data, null, 2);

  document.getElementById("list_detail").value = res;

}

/**
 * Get all dls info of given dlma uuid.
 * @return {[type]} [description]
 */
function delete_config(filename) {
  console.log("Fired get_user_list.");

  url = domain + "/voicemail/settings/" + filename;
  console.log("Query url info. " + url);

  tmp_res = send_request(url, "DELETE", null, false);
  console.log(tmp_res);
}


function bt_delete_list_detail() {
  console.log("Fired bt_delete_list_detail.");

  data = document.getElementById("list_detail").value;
  j_data = JSON.parse(data);

  filename = j_data.filename;

  delete_config(filename);
}

