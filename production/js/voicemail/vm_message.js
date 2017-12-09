var g_messages = TAFFY();
var g_users = TAFFY();

function init_db() {
	delete g_messages;
	g_messages = TAFFY();

  delete g_users;
  g_users = TAFFY();
}

function init_message() {
  delete g_messages;
  g_messages = TAFFY();
}

var g_cur_context = null;
var g_cur_mailbox = null;
var g_cur_dir = null;
var g_cur_msgname = null;

/**
 * Get all dls info of given dlma uuid.
 * @return {[type]} [description]
 */
function get_user_list() {
  console.log("Fired get_user_list.");

  url = domain + "/voicemail/users";
  console.log("Query url info. " + url);

  tmp_res = send_request(url, "GET", null, false);

  // parsing data
  res = JSON.parse(tmp_res);
  //console.log("Result. " + tmp_res);

  // insert/update data
  for(var i = 0; i < res.result.list.length; i++) {
    g_users.insert(res.result.list[i]);
  }
}


/**
 * Get all data info.
 * @return {[type]} [description]
 */
function get_message_list(context, mailbox) {
  console.log("Fired get_message_list.");

  url = domain + "/voicemail/vms";
  console.log("Query url info. " + url);

  data = {"context":context, "mailbox":mailbox};

  tmp_res = send_request(url, "GET", data, false);

  // parsing data
  res = JSON.parse(tmp_res);
  //console.log("Result. " + tmp_res);

  // insert/update data
  for(var i = 0; i < res.result.list.length; i++) {
  	g_messages.insert(res.result.list[i]);
  }

  g_cur_context = context;
  g_cur_mailbox = mailbox;
}

function update_table_user_list() {
  console.log("Fired update_table_user_list.");

  // update
  table_update("user_list_table", g_users);
}

function update_table_message_list() {
  console.log("Fired update_table_message_list.");

  // update
  table_update("message_list_table", g_messages);
}


function user_list_table_double_click(row) {
	console.log("Fired user_list_table_double_click.");

	context = row.cells.item(0).innerText;
	mailbox = row.cells.item(1).innerText;

  init_message();

	get_message_list(context, mailbox);
  update_table_message_list();

}

function message_list_table_double_click(row) {
  console.log("Fired message_list_table_double_click.");

  message_id = row.cells.item(1).innerText;

  update_message_detail(message_id);
}



function update_message_detail(message_id) {
	  console.log("Fired update_message_detail.")

	  data = g_messages({msg_id: message_id}).first();

	  // set basic info
    document.getElementById("message_detail_msgname").value = data.msgname;
  	document.getElementById("message_detail_msg_id").value = data.msg_id;



    document.getElementById("message_detail_status").value = data.status;
    document.getElementById("message_detail_dir").value = data.dir;



    document.getElementById("message_detail_context").value = data.context;
    document.getElementById("message_detail_exten").value = data.exten;
    document.getElementById("message_detail_priority").value = data.priority;




    document.getElementById("message_detail_callerchan").value = data.callerchan;
    document.getElementById("message_detail_callerid").value = data.callerid;
    document.getElementById("message_detail_rdnis").value = data.rdnis;



    document.getElementById("message_detail_category").value = data.category;
    document.getElementById("message_detail_flag").value = data.flag;
    document.getElementById("message_detail_macrocontext").value = data.macrocontext;


    document.getElementById("message_detail_origdate").value = data.origdate;
    document.getElementById("message_detail_origtime").value = data.origtime;
    document.getElementById("message_detail_origmailbox").value = data.origmailbox;
    document.getElementById("message_detail_duration").value = data.duration;


    g_cur_dir = data.dir;
    g_cur_msgname = data.msgname;

}

function create_table_user_list() {
  console.log("Fired create_table_user_list.");

  // create table
  columns = [
    { id: "context", data: "context", title: "Context"},
    { id: "mailbox", data: "mailbox", title: "Mailbox" },
    { id: "full_name", data: "full_name", title: "Full name" },
    { id: "new_message_count", data: "new_message_count", title: "New message count" },
    { id: "old_message_count", data: "old_message_count", title: "Old message count" },
  ];
  table_create("user_list_table", columns, user_list_table_double_click);
}

function create_table_message_list() {
  console.log("Fired create_table_message_list.");

  // create table
  columns = [
    { id: "msgname", data: "msgname", title: "Message name"},
    { id: "msg_id", data: "msg_id", title: "Message id" },
    { id: "dir", data: "dir", title: "Directory" },
    { id: "status", data: "status", title: "Status" },
  ];
  table_create("message_list_table", columns, message_list_table_double_click);
}

function bt_download_message_detail() {
  console.log("Fired bt_download_message_detail.");

  url = domain + "/voicemail/vms/" + g_cur_msgname + "?context=" + g_cur_context + "&mailbox=" + g_cur_mailbox + "&dir=" + g_cur_dir;
  console.log("Query url info. " + url);

  data = {"context": g_cur_context, "mailbox": g_cur_mailbox, "dir": g_cur_dir}

  filename = g_cur_msgname + ".wav";
  send_request_download(url, "GET", data, false, filename);
}

function bt_delete_message_detail() {
  console.log("Fired bt_delete_message_detail.");

  url = domain + "/voicemail/vms/" + g_cur_msgname + "?context=" + g_cur_context + "&mailbox=" + g_cur_mailbox + "&dir=" + g_cur_dir;
  console.log("Query url info. " + url);

  data = {"context": g_cur_context, "mailbox": g_cur_mailbox, "dir": g_cur_dir}

  send_request(url, "DELETE", null, false);
}



// run!
$(document).ready(function() {

	// create tables
  	create_table_user_list();
    create_table_message_list();

  	get_user_list()
  	update_table_user_list();

  	console.log('vm_message.js');
});
