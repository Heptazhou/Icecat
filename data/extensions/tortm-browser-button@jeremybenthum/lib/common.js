window.setTimeout(function () {
  var version = config.welcome.version;
  if (!version) {
//    app.tab.open(app.homepage() + "?v=" + app.version() + "&type=install");
    config.welcome.version = app.version();
  }
}, 3000);

var popupsend = function () {
  tor.icon(tor.id);
  app.popup.send("tor-data", {
    "id": tor.id,
    "log": tor.log,
    "whitelist": config.addon.whitelist
  });
};

var setproxy = function (callback) {
  if (tor.id === "OFF") chrome.proxy.settings.set({"scope": "regular", "value": {"proxyType":"system", "mode": "system"}}, callback);
  else chrome.proxy.settings.set({
    "scope": "regular",
    "value":  {
      "proxyDNS":true,
      "autoConfigUrl":"",
      "socksVersion":5,
      "passthrough":"",
      "proxyType":"manual",
      "ftp":"",
      "ssl":"",
      "http":"",
      "socks":"127.0.0.1:9050"
    }
  }, callback);
};

var tor = {
  "id": "OFF",
  "bypassList": [],
  "log": "Tor Browser Button",
  "update": function () {
    if (config.addon.state === "ON") {
      tor.once(function () {
        var url = config.addon.check + "?t=" + new Date().getTime() + "&r=" + Math.round(Math.random() * 10000);
        config.request(url, function (e) {
          if (e === "ok") config.addon.state === "ON" ? tor.start() : tor.stop();
          else {
            tor.stop();
            config.notifications.create("TOR is NOT running. Please connect your computer to TOR network and try again.");
          }
        });
      });
    } else tor.stop();
  },
  "stop": function () {
    tor.id = "OFF";
    tor.log = "TOR proxy is disabled";
    setproxy(popupsend);
	},
	"start": function () {
    tor.id = "ON";
    tor.log = "Connected to 127.0.0.1:9050";
    config.notifications.create("TOR is running. Connected to 127.0.0.1:9050");
    tor.bypassList = config.addon.whitelist ? config.addon.whitelist.split(',') : [];
    setproxy(popupsend);
	},
  "once": function (callback) {
    tor.id = "CHECK";
    tor.log = "Checking tor proxy connection...";
    tor.bypassList = config.addon.whitelist ? config.addon.whitelist.split(',') : [];
    setproxy(function () {window.setTimeout(function () {callback(true)}, 300)});
    popupsend();
  },
  "icon": function (state) {
    app.button.icon = {
      "path": {
        "16": '../../data/icons/' + state + '/16.png',
        "32": '../../data/icons/' + state + '/32.png',
        "48": '../../data/icons/' + state + '/48.png',
        "64": '../../data/icons/' + state + '/64.png'
      }
    };
  }
};

app.popup.receive("popup-data", function (e) {
  if (e.name === "reload") app.tab.reload();
  if (e.name === "support") app.tab.open(app.homepage());
  if (e.name === "check") app.tab.open(config.addon.check);
  if (e.name === "install") app.tab.open(config.addon.github);
  if (e.name === "bypassList") {
    config.addon.whitelist = e.whitelist;
    tor.update();
  }
  if (e.name === "ON" || e.name === "OFF") {
    config.addon.state = e.name;
    tor.update();
  }
});

window.setTimeout(tor.update, 0);
app.popup.receive("load", popupsend);
