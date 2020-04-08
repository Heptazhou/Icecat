var core = {
  "popup": {
    "send": function () {
      tor.icon(tor.id);
      app.popup.send("tor-data", {
        "id": tor.id,
        "log": tor.log,
        "whitelist": config.addon.whitelist
      });
    }
  },
  "apply": {
    "proxy": function (callback) {
      if (tor.id === "OFF") chrome.proxy.settings.set({"scope": "regular", "value": {"mode": "system"}}, callback);
      else chrome.proxy.settings.set({
        "scope": "regular",
        "value":  {
          "mode": "fixed_servers",
          "rules": {
            "bypassList": tor.bypassList,
            "singleProxy": {"scheme": "socks5", "host": "127.0.0.1", "port": 9050}
          }
        }
      }, callback);
    }
  }
};

var tor = {
  "id": "OFF",
  "bypassList": [],
  "log": "Onion Browser Button",
  "stop": function () {
    tor.id = "OFF";
    tor.log = "TOR proxy is disabled";
    core.apply.proxy(core.popup.send);
	},
	"start": function () {
    tor.id = "ON";
    tor.log = "Connected to 127.0.0.1:9050";
    config.notifications.create("TOR is running. Connected to 127.0.0.1:9050");
    tor.bypassList = config.addon.whitelist ? config.addon.whitelist.split(',') : [];
    core.apply.proxy(core.popup.send);
	},
  "once": function (callback) {
    tor.id = "CHECK";
    tor.log = "Checking tor proxy connection...";
    tor.bypassList = config.addon.whitelist ? config.addon.whitelist.split(',') : [];
    core.apply.proxy(function () {window.setTimeout(function () {callback(true)}, 300)});
    core.popup.send();
  },
  "icon": function (state) {
    app.button.icon = {
      "path": {
        "16": "../../data/icons/" + (state ? state + "/" : '') + "16.png",
        "32": "../../data/icons/" + (state ? state + "/" : '') + "32.png",
        "48": "../../data/icons/" + (state ? state + "/" : '') + "48.png",
        "64": "../../data/icons/" + (state ? state + "/" : '') + "64.png"
      }
    };
  },
  "update": function () {
    if (config.addon.state === "ON") {
      tor.once(function () {
        var url = config.url.tor + "?t=" + new Date().getTime() + "&r=" + Math.round(Math.random() * 10000);
        config.request(url, function (e) {
          if (e === "ok") config.addon.state === "ON" ? tor.start() : tor.stop();
          else {
            tor.stop();
            config.notifications.create("TOR is NOT running. Please connect your computer to TOR network and try again.");
          }
        });
      });
    } else tor.stop();
  }
};

app.popup.receive("popup-data", function (e) {
  if (e.name === "reload") app.tab.reload();
  if (e.name === "ip") app.tab.open(config.url.ip);
  if (e.name === "check") app.tab.open(config.url.tor);
  if (e.name === "support") app.tab.open(app.homepage());
  if (e.name === "install") app.tab.open(config.url.github);
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
app.popup.receive("load", core.popup.send);
