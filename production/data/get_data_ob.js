
const domain = "http://pchero21.com:8081";

var g_campaigns = TAFFY();
var g_plans = TAFFY();
var g_dlmas = TAFFY();
var g_destinations = TAFFY();
var g_dialings = TAFFY();


/**
 * Get all campaigns info init.
 * @return {[type]} [description]
 */
function get_all_campaigns_init() {
  console.log("Fired get_all_campaigns_init")

  url = domain + "/ob/campaigns/";
  console.log("Query url info. url[" + url + "]");

  resp = jQuery.ajax({
    type: "GET",
    url: url,
    cache: false,
    async: false
  }).responseText;

  data = JSON.parse(resp);
  for(var i = 0; i < data.result.list.length; i++) {
    tmp = g_campaigns({uuid: data.result.list[i].uuid});

    if(tmp.count() == 0) {
      // insert
      g_campaigns.insert(data.result.list[i]);
    }
    else {
      // update
      tmp.update(data.result.list[i]);
    }
  }
}

/**
 * Get
 * @return {[type]} [description]
 */
function get_all_campaigns() {
  console.log("Fired get_all_campaigns.");

  url = domain + "/ob/campaigns/";
  console.log("Query url info. url[" + url + "]");

  // get all campaigns uuid list
  fetch(url)
  .then(resp => resp.json())
  .then(function(data) {
    for(var i = 0; i < data.result.list.length; i++) {
      tmp = g_campaigns({uuid: data.result.list[i].uuid});

      if(tmp.count() == 0) {
        // insert
        g_campaigns.insert(data.result.list[i]);
      }
      else {
        // update
        tmp.update(data.result.list[i]);
      }
    }
  });
}

function get_all_plans_init() {
  console.log("Fired get_all_plans_init")

  url = domain + "/ob/plans/";
  console.log("Query url info. url[" + url + "]");

  resp = jQuery.ajax({
    type: "GET",
    url: url,
    cache: false,
    async: false
  }).responseText;

  data = JSON.parse(resp);
  for(var i = 0; i < data.result.list.length; i++) {
    tmp = g_plans({uuid: data.result.list[i].uuid});

    if(tmp.count() == 0) {
      // insert
      g_plans.insert(data.result.list[i]);
    }
    else {
      // update
      tmp.update(data.result.list[i]);
    }
  }
}

function get_all_plans() {
  console.log("Fired get_all_plans.");

  url = domain + "/ob/plans/";
  console.log("Query url info. url[" + url + "]");

  // get all plans uuid list
  fetch(url)
  .then(resp => resp.json())
  .then(function(data) {
    for(var i = 0; i < data.result.list.length; i++) {
      tmp = g_plans({uuid: data.result.list[i].uuid});

      if(tmp.count() == 0) {
        // insert
        g_plans.insert(data.result.list[i]);
      }
      else {
        // update
        tmp.update(data.result.list[i]);
      }
    }
  });
}

function get_all_dlmas_init() {
  url = domain + "/ob/dlmas/";
  console.log("Query url info. url[" + url + "]");

  resp = jQuery.ajax({
    type: "GET",
    url: url,
    cache: false,
    async: false
  }).responseText;

  data = JSON.parse(resp);
  for(var i = 0; i < data.result.list.length; i++) {
    tmp = g_dlmas({uuid: data.result.list[i].uuid});

    if(tmp.count() == 0) {
      // insert
      g_dlmas.insert(data.result.list[i]);
    }
    else {
      // update
      tmp.update(data.result.list[i]);
    }
  }
}

function get_all_dlmas() {
  console.log("Fired get_all_dlmas.");

  url = domain + "/ob/dlmas/";
  console.log("Query url info. url[" + url + "]");

  // get all data list
  fetch(url)
  .then(resp => resp.json())
  .then(function(data) {
    console.log(data);
    for(var i = 0; i < data.result.list.length; i++) {
      console.log(data.result.list[i].uuid);
      tmp = g_dlmas({uuid: data.result.list[i].uuid});

      if(tmp.count() == 0) {
        // insert
        console.log("insert");
        g_dlmas.insert(data.result.list[i]);
      }
      else {
        // update
        tmp.update(data.result.list[i]);
      }
    }
  });
}

/**
 * Get all destinations info init.
 * @return {[type]} [description]
 */
function get_all_destinations_init() {
  console.log("Fired get_all_destinations_init")

  url = domain + "/ob/destinations/";
  console.log("Query url info. url[" + url + "]");

  resp = jQuery.ajax({
    type: "GET",
    url: url,
    cache: false,
    async: false
  }).responseText;

  data = JSON.parse(resp);
  for(var i = 0; i < data.result.list.length; i++) {
    tmp = g_destinations({uuid: data.result.list[i].uuid});

    if(tmp.count() == 0) {
      // insert
      g_destinations.insert(data.result.list[i]);
    }
    else {
      // update
      tmp.update(data.result.list[i]);
    }
  }
}

/**
 * Get
 * @return {[type]} [description]
 */
function get_all_destinations() {
  console.log("Fired get_all_destinations.");

  url = domain + "/ob/destinations/";
  console.log("Query url info. url[" + url + "]");

  // get all destinations uuid list
  fetch(url)
  .then(resp => resp.json())
  .then(function(data) {
    for(var i = 0; i < data.result.list.length; i++) {
      tmp = g_destinations({uuid: data.result.list[i].uuid});

      if(tmp.count() == 0) {
        // insert
        g_destinations.insert(data.result.list[i]);
      }
      else {
        // update
        tmp.update(data.result.list[i]);
      }
    }
  });
}

/**
 * Get all dialings info init.
 * @return {[type]} [description]
 */
function get_all_dialings_init() {
  console.log("Fired get_all_dialings_init")

  url = domain + "/ob/dialings/";
  console.log("Query url info. url[" + url + "]");

  resp = jQuery.ajax({
    type: "GET",
    url: url,
    cache: false,
    async: false
  }).responseText;

  data = JSON.parse(resp);
  for(var i = 0; i < data.result.list.length; i++) {
    tmp = g_dialings({uuid: data.result.list[i].uuid});

    if(tmp.count() == 0) {
      // insert
      g_dialings.insert(data.result.list[i]);
    }
    else {
      // update
      tmp.update(data.result.list[i]);
    }
  }
}

/**
 * Get
 * @return {[type]} [description]
 */
function get_all_dialings() {
  console.log("Fired get_all_dialings.");

  url = domain + "/ob/dialings/";
  console.log("Query url info. url[" + url + "]");

  // get all dialings uuid list
  fetch(url)
  .then(resp => resp.json())
  .then(function(data) {
    for(var i = 0; i < data.result.list.length; i++) {
      tmp = g_dialings({uuid: data.result.list[i].uuid});

      if(tmp.count() == 0) {
        // insert
        g_dialings.insert(data.result.list[i]);
      }
      else {
        // update
        tmp.update(data.result.list[i]);
      }
    }
  });
}


get_all_campaigns_init();
// setInterval(get_all_campaigns, 3000);

get_all_plans_init();
// setInterval(get_all_plans, 3000);

get_all_dlmas_init();
// setInterval(get_all_dlmas, 3000);

get_all_destinations_init();
// setInterval(get_all_destinations, 3000);

get_all_dialings_init();
// setInterval(get_all_dialings, 3000);
