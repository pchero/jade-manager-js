var g_users = TAFFY();

function init_db() {
	delete g_users;
	g_users = TAFFY();
}

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

function update_table_user_list() {
  console.log("Fired update_table_user_list.");

  // update
  table_update("user_list_table", g_users);
}


function user_list_table_double_click(row) {
	console.log("Fired user_list_table_double_click.");

	context = row.cells.item(0).innerText;
	mailbox = row.cells.item(1).innerText;

	update_user_detail(context, mailbox);

}


function update_user_detail(context, mailbox) {
	console.log("Fired update_user_detail.")

	data = g_users({context: context, mailbox: mailbox}).first();

	  // set basic info
	document.getElementById("user_detail_context").value = data.context;
  	document.getElementById("user_detail_mailbox").value = data.mailbox;
  	document.getElementById("user_detail_full_name").value = data.full_name;
  	document.getElementById("user_detail_email").value = data.email;
  	document.getElementById("user_detail_pager").value = data.pager;



  	document.getElementById("user_detail_server_email").value = data.server_email;
  	document.getElementById("user_detail_mail_command").value = data.mail_command;
  	document.getElementById("user_detail_from_string").value = data.from_string;
  	document.getElementById("user_detail_attach_message").value = data.attach_message;
  	document.getElementById("user_detail_attachment_format").value = data.attachment_format;
  	document.getElementById("user_detail_delete_message").value = data.delete_message;



  	document.getElementById("user_detail_call_operator").value = data.call_operator;
  	document.getElementById("user_detail_callback").value = data.callback;
  	document.getElementById("user_detail_can_review").value = data.can_review;



  	document.getElementById("user_detail_dialout").value = data.dialout;
  	document.getElementById("user_detail_exit_context").value = data.exit_context;
  	document.getElementById("user_detail_language").value = data.language;



  	document.getElementById("user_detail_max_message_count").value = data.max_message_count;
  	document.getElementById("user_detail_max_message_length").value = data.max_message_length;
  	document.getElementById("user_detail_new_message_count").value = data.new_message_count;
  	document.getElementById("user_detail_old_message_count").value = data.old_message_count;



  	document.getElementById("user_detail_imap_server").value = data.imap_server;
  	document.getElementById("user_detail_imap_port").value = data.imap_port;
  	document.getElementById("user_detail_imap_user").value = data.imap_user;
  	document.getElementById("user_detail_imap_flag").value = data.imap_flag;



  	document.getElementById("user_detail_say_call_id").value = data.say_cid;
  	document.getElementById("user_detail_say_duration_minimum").value = data.say_duration_minimum;
  	document.getElementById("user_detail_say_envelope").value = data.say_envelope;



  	document.getElementById("user_detail_timezone").value = data.timezone;
  	document.getElementById("user_detail_volume_gain").value = data.volume_gain;
  	document.getElementById("user_detail_time_update").value = data.tm_update;

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


// run!
$(document).ready(function() {

	// create tables
  	create_table_user_list();

  	get_user_list()
  	update_table_user_list();

  	console.log('vm_user.js');
});
