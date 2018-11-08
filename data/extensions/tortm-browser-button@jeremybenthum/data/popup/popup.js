var background = (function () {
  var _tmp = {};
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    for (var id in _tmp) {
      if (_tmp[id] && (typeof _tmp[id] === "function")) {
        if (request.path == 'background-to-popup') {
          if (request.method === id) _tmp[id](request.data);
        }
      }
    }
  });
  /*  */
  return {
    "receive": function (id, callback) {_tmp[id] = callback},
    "send": function (id, data) {chrome.runtime.sendMessage({"path": 'popup-to-background', "method": id, "data": data})}
  }
})();

var load = function () {
  var whitelist = document.getElementById("whitelist");
  document.addEventListener("click", function (e) {
    var id = e.target ? e.target.getAttribute("id") : null;
    if (id && id !== "whitelist") background.send("popup-data", {"name": id});
  });
	/*  */
  whitelist.addEventListener("change", function (e) {
    var value = e.target ? e.target.value : '';
    background.send("popup-data", {"name": "bypassList", "whitelist": value});
  });
  /*  */
  background.send("load");
  window.removeEventListener("load", load, false);
};

window.addEventListener("load", load, false);

background.receive("tor-data", function (e) {
  document.getElementById("status").textContent = e.log;
	document.getElementById("whitelist").value = e.whitelist;
  if (e.id === "CHECK") e.id = "ON";
  if (e.id === "ON" || e.id === "OFF") {
    document.getElementById("ON").removeAttribute("type");
    document.getElementById("OFF").removeAttribute("type");
	  document.getElementById(e.id).setAttribute("type", "active");
  }
});
