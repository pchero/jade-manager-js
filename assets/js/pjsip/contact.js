// run!
$(document).ready(function() {

  // add all list
  table_columns = [
    { id: "uri", data: "uri", title: "URI"},
    { id: "endpoint_name", data: "endpoint_name", title: "Endpoint" },
    { id: "aor", data: "aor", title: "AOR" },
    { id: "status", data: "status", title: "Status" },
    { id: "round_trip_usec", data: "round_trip_usec", title: "Round trip usec" },
  ];
  table_create("list_table", table_columns, null);

  table_update("list_table", g_pjsip_contacts);

  console.log('endpoint.js');
});
