// run!
$(document).ready(function() {

  // add all list
  table_columns = [
    { id: "parkee_unique_id", data: "parkee_unique_id", title: "Unique id" },
    { id: "parkee_channel", data: "parkee_channel", title: "Channel" },
    { id: "parkee_channel_state", data: "parkee_channel_state", title: "State" },
    { id: "parkee_channel_state_desc", data: "parkee_channel_state_desc", title: "State desc" },

    { id: "parkee_context", data: "parkee_context", title: "Context" },
    { id: "parkee_exten", data: "parkee_exten", title: "Exten" },
    { id: "parkee_priority", data: "parkee_priority", title: "Priority" },
  ];
  table_create("list_table", table_columns, null);

  table_update("list_table", g_park_parkedcalls);

  g_park_parkedcalls.settings({
    onDBChange:function () {
      table_update("list_table", g_park_parkedcalls); 
    }
  });

  console.log('parkedcall.js');
});
