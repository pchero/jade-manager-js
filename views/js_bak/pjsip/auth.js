// run!
$(document).ready(function() {

  // add all list
  table_columns = [
    { id: "object_name", data: "object_name", title: "Name"},
    { id: "username", data: "username", title: "Username" },
    { id: "auth_type", data: "auth_type", title: "Type" },
    { id: "nonce_lifetime", data: "nonce_lifetime", title: "Nonce lifetime" },
    { id: "realm", data: "realm", title: "Realm" },
    { id: "password", data: "password", title: "Password" },
    { id: "md5_cred", data: "md5_cred", title: "MD5 Credential" },
  ];
  table_create("list_table", table_columns, null);

  table_update("list_table", g_pjsip_auths);

  console.log('auth.js');
});
