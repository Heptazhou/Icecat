var config = {};

config.url = {
  "tor": "https://check.torproject.org/",
  "ip": "https://webbrowsertools.com/ip-address/",
  "github": "https://github.com/jeremy-jr-benthum/tor-button/releases",
};

config.welcome = {
  set lastupdate (val) {app.storage.write("lastupdate", val)},
  get lastupdate () {return app.storage.read("lastupdate") !== undefined ? app.storage.read("lastupdate") : 0}
};

config.addon = {
  set state (val) {app.storage.write("state", val)},
  set whitelist (val) {app.storage.write("whitelist", val)},
  get whitelist () {return app.storage.read("whitelist") || ''},
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
  chrome.notifications.onClicked.addListener(function (id) {
    if (id === config.notifications.id) app.tab.open(app.homepage() + "#faq");
  });
  /*  */
  return {
    "id": "onion-button-notifications-id",
    "create": function (message) {
      chrome.notifications.create(config.notifications.id, {
        "type": "basic",
        "message": message,
        "title": "Onion Browser Button",
        "iconUrl": /Firefox/.test(navigator.userAgent) ? "data/icons/64.png" : chrome.runtime.getURL("data/icons/64.png")
      }, function () {});
    }
  }
})();
