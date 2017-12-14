// run!
$(document).ready(function() {

  // add all list
  table_columns = [
    { id: "object_name", data: "object_name", title: "Name"},
    { id: "endpoint_name", data: "endpoint_name", title: "Endpoint" },
    { id: "contacts", data: "contacts", title: "Contacts" },
    { id: "max_contacts", data: "max_contacts", title: "Max contacts" },
    { id: "maximum_expiration", data: "maximum_expiration", title: "Max expiration" },
    { id: "minimum_expiration", data: "minimum_expiration", title: "Min expiration" },
  ];
  table_create("list_table", table_columns, null);

  table_update("list_table", g_pjsip_aors);

  console.log('endpoint.js');
});
