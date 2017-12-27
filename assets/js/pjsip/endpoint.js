// run!
$(document).ready(function() {

  // add all list
  table_columns = [
    { id: "object_name", data: "object_name", title: "Name"},
    { id: "aors", data: "aors", title: "AOR" },
    { id: "auth", data: "auth", title: "Auth" },
    { id: "transport", data: "transport", title: "Transport" },
    { id: "context", data: "context", title: "Context" },
    { id: "webrtc", data: "webrtc", title: "WebRTC" },
    { id: "incoming_mwi_mailbox", data: "incoming_mwi_mailbox", title: "Mailbox" },
  ];
  table_create("list_table", table_columns, null);

  table_update("list_table", g_pjsip_endpoints);

  console.log('endpoint.js');
});
