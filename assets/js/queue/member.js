// run!
$(document).ready(function() {

  // add all list
  table_columns = [
    { id: "name", data: "name", title: "Name" },
    { id: "queue_name", data: "queue_name", title: "Queue name" },
    { id: "location", data: "location", title: "Location" },
    { id: "membership", data: "membership", title: "membership" },
    { id: "calls_taken", data: "calls_taken", title: "Calls taken" },
    { id: "penalty", data: "penalty", title: "Penalty" },
  ];
  table_create("list_table", table_columns, null);

  table_update("list_table", g_queue_members);

  g_queue_members.settings({
    onDBChange:function () {
      table_update("list_table", g_queue_members); 
    }
  });

  console.log('member.js');
});
