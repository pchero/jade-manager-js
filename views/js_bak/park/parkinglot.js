// run!
$(document).ready(function() {

  // add all list
  table_columns = [
    { id: "name", data: "name", title: "Name" },
    { id: "start_space", data: "start_space", title: "Start space" },
    { id: "stop_spcae", data: "stop_spcae", title: "Stop space" },
    { id: "timeout", data: "timeout", title: "Timeout" },
  ];
  table_create("list_table", table_columns, null);

  table_update("list_table", g_park_parkinglots);

  console.log('parkinglot.js');
});
