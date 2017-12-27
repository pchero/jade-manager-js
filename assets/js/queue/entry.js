// run!
$(document).ready(function() {

  // add all list
  table_columns = [
    { id: "channel", data: "channel", title: "Channel" },
    { id: "queue_name", data: "queue_name", title: "Queue name" },
    { id: "wait", data: "wait", title: "Wait" },
    { id: "position", data: "position", title: "Position" },
  ];
  table_create("list_table", table_columns, null);

  table_update("list_table", g_queue_entries);

  console.log('entry.js');
});
