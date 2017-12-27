
// run!
$(document).ready(function() {
  console.log('core_system.js started');

  // add all list
  table_columns = [
    { id: "id", data: "id", title: "ID"},
    { id: "ast_version", data: "ast_version", title: "Asterisk version" },
    { id: "ami_version", data: "ami_version", title: "AMI version" },
    { id: "http_enabled", data: "http_enabled", title: "HTTP enabled" },
    { id: "current_calls", data: "current_calls", title: "Current calls" },
    { id: "startup_date", data: "startup_date", title: "Startup date" },
    { id: "startup_time", data: "startup_time", title: "Startup time" },
  ];
  table_create("system_list_table", table_columns, null);

 table_update("system_list_table", g_core_systems);

  console.log('core_system.js');
});
