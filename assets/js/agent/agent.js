// run!
$(document).ready(function() {

  // add all list
  table_columns = [
    { id: "id", data: "id", title: "ID"},
    { id: "name", data: "name", title: "Name" },
    { id: "context", data: "context", title: "Context" },
    { id: "exten", data: "exten", title: "Exten" },
    { id: "account_code", data: "account_code", title: "Account code" },
  ];
  table_create("list_table", table_columns, null);

  table_update("list_table", g_agent_agents);

  console.log('agent.js');
});
