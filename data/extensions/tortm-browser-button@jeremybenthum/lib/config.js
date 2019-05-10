var config = {};

config.welcome = {
  get version () {return app.storage.read("version")},
  set version (val) {app.storage.write("version", val)}
};

config.addon = {
  "check": "https://check.torproject.org/",
  set state (val) {app.storage.write("state", val)},
  set whitelist (val) {app.storage.write("whitelist", val)},
  get whitelist () {return app.storage.read("whitelist") || ''},
  "github": "https://github.com/jeremy-jr-benthum/tor-button/releases",
  get state () {return app.storage.read("state") !== undefined ? app.storage.read("state") : "OFF"}
};

config.request = function (url, callback) {
  var xhr = new XMLHttpRequest();
  try {
    xhr.onload = function () {xhr.status >= 200 && xhr.status < 304 ? callback("ok") : callback("error")};
    xhr.open("HEAD", url, true);
    xhr.onerror = function () {callback("error")};
    xhr.ontimeout = function () {callback("error")};
    xhr.send('');
  } catch (e) {callback("error")}
};

config.notifications = (function () {
  chrome.notifications.onClosed.addListener(function () {config.notifications.id = ''});
  chrome.notifications.onClicked.addListener(function (id) {if (id === config.notifications.id) app.tab.open(app.homepage() + "#faq")});
  /*  */
  return {
    "id": '',
    "create": function (message) {
      var iconUrl = /Firefox/.test(navigator.userAgent) ? "data/icons/64.png" : chrome.runtime.getURL("data/icons/64.png");
      var o = {"message": message, "type": "basic", "title": "Onion Browser Button", "iconUrl": iconUrl};
      if (config.notifications.id) {
        if (chrome.notifications.update) {
          return chrome.notifications.update(config.notifications.id, o, function () {});
        }
      }
      return chrome.notifications.create(o, function (id) {config.notifications.id = id});
    }
  }
})();
