// run!
$(document).ready(function() {

  // add all list
  table_columns = [
    { id: "name", data: "name", title: "Name" },
    { id: "calls", data: "calls", title: "Calls" },
    { id: "completed", data: "completed", title: "Completed" },
    { id: "abandoned", data: "abandoned", title: "Abandoned" },
    { id: "strategy", data: "strategy", title: "Strategy" },
    { id: "tm_update", data: "tm_update", title: "Updateed" },
  ];
  table_create("list_table", table_columns, null);

  table_update("list_table", g_queue_queues);

  g_queue_queues.settings({
    onDBChange:function () {
      table_update("list_table", g_queue_queues); 
    }
  });

  console.log('queue.js');
});
