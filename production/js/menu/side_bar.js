

function setAttributes(el, attrs) {
  for(var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}


function create_submenu(menu, link) {
  console.log("Fired create_submenu. " + menu + ", " + link);

  a = document.createElement("a");

  setAttributes(a, {"href": link});
  a.appendChild(document.createTextNode(menu));

  link = document.createElement("li");
  
  link.appendChild(a);

  return link;
}


function add_menu(id, menus) {
  console.log("Fired add_menu. " + id + ", " + menus);

  item = document.getElementById(id);

  for(var i in menus) {
    menu = menus[i];

    for(key in menu) {
      value = menu[key];
      submenu = create_submenu(key, value);

      // add child
      // ul.appendChild(submenu);
      item.appendChild(submenu);
    }
  }
}

function add_menu_outbound() {
  console.log("Fired add_menu_outbound.");

  menus = [
    {"Dialing": "ob_dialing.html"}, 
    {"Campaign": "ob_campaign.html"}, 
    {"Plan": "ob_plan.html"},
    {"Destination": "ob_destination.html"},
    {"Dial list master": "ob_dlma.html"},
    {"Dial list": "ob_dial_list.html"}
  ];

  add_menu("menu_outbound", menus);
}

add_menu_outbound();
