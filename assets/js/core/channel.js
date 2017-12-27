// run!
$(document).ready(function() {

  // add all list
  table_columns = [
    { id: "unique_id", data: "unique_id", title: "Unique id"},
    { id: "channel", data: "channel", title: "Channel"},
    { id: "channel_state", data: "channel_state", title: "Channel state" },
    { id: "channel_state_desc", data: "channel_state_desc", title: "Channel state desc" },
    { id: "exten", data: "exten", title: "Exten" },
    { id: "context", data: "context", title: "Context" },
    { id: "caller_id_name", data: "caller_id_name", title: "Caller id name" },
    { id: "caller_id_num", data: "caller_id_num", title: "Caller id number" },
  ];
  table_create("list_table", table_columns, null);

  table_update("list_table", g_core_channels);

  g_core_channels.settings({
    onDBChange:function () {
      table_update("list_table", g_core_channels); 
    }
  });

  console.log('channel.js');
});
