var app = {};

app.button = {set icon (o) {chrome.browserAction.setIcon(o)}};
app.version = function () {return chrome.runtime.getManifest().version};
app.homepage = function () {return chrome.runtime.getManifest().homepage_url};
chrome.runtime.setUninstallURL(app.homepage() + "?v=" + app.version() + "&type=uninstall", function () {});

app.tab = {
  "reload": function (url) {chrome.tabs.reload(function () {})},
  "open": function (url) {chrome.tabs.create({"url": url, "active": true})}
};

chrome.runtime.onInstalled.addListener(function (e) {
  window.setTimeout(function () {
    var previous = e.previousVersion !== undefined && e.previousVersion !== app.version();
    var doupdate = previous && parseInt((Date.now() - config.welcome.lastupdate) / (24 * 3600 * 1000)) > 45;
    if (e.reason === "install" || (e.reason === "update" && doupdate)) {
      var parameter = (e.previousVersion ? "&p=" + e.previousVersion : '') + "&type=" + e.reason;
//      app.tab.open(app.homepage() + "?v=" + app.version() + parameter);
      config.welcome.lastupdate = Date.now();
    }
  }, 3000);
});

app.storage = (function () {
  var objs = {};
  window.setTimeout(function () {
    chrome.storage.local.get(null, function (o) {
      objs = o;
      var script = document.createElement("script");
      script.src = "../common.js";
      document.body.appendChild(script);
    });
  }, 300);
  /*  */
  return {
    "read": function (id) {return objs[id]},
    "write": function (id, data) {
      var tmp = {};
      tmp[id] = data;
      objs[id] = data;
      chrome.storage.local.set(tmp, function () {});
    }
  }
})();

app.popup = (function () {
  var tmp = {};
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    for (var id in tmp) {
      if (tmp[id] && (typeof tmp[id] === "function")) {
        if (request.path === 'popup-to-background') {
          if (request.method === id) tmp[id](request.data);
        }
      }
    }
  });
  /*  */
  return {
    "receive": function (id, callback) {tmp[id] = callback},
    "send": function (id, data, tabId) {
      chrome.runtime.sendMessage({"path": 'background-to-popup', "method": id, "data": data});
    }
  }
})();
