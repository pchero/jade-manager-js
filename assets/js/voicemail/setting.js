
// run!
$(document).ready(function() {

  init_config();

  console.log('vm_setting.js');
});


function init_config() {

  data = get_current_config();

  tmp = JSON.stringify(data.result, null, 2);

  update_detail_list(tmp);
}

/**
 * Get all dls info of given dlma uuid.
 * @return {[type]} [description]
 */
function get_current_config() {
  console.log("Fired get_user_list.");

  url = domain + "/voicemail/setting";
  console.log("Query url info. " + url);

  tmp_res = send_request(url, "GET", null, false);

  // parsing data
  res = JSON.parse(tmp_res);
  
  return res;
}

/**
@brief Update list detail info
*/
function update_detail_list(data) {
  console.log("Fired update_detail_list.");

  document.getElementById("list_detail").value = data;
}

function bt_update_list_detail() {
  console.log("Fired bt_update_list_detail.");

  // get data
  tmp = document.getElementById("list_detail").value;
  j_data = JSON.parse(tmp);

  data = JSON.stringify(j_data);

  url = domain + "/voicemail/setting";
  console.log("Query url info. url[" + url + "]");

  send_request(url, "PUT", j_data);
}
