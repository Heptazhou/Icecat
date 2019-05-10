var targetUrl = "https://www.youtube.com/*";
var disable_option = "disable_polymer=true";

function rewriteUrl(req) {
  if (!req.url.includes("disable_polymer"))
    if (req.url.includes("?"))
      return { redirectUrl: req.url + "&" + disable_option};
    else
      return { redirectUrl: req.url + "?" + disable_option};
}

browser.webRequest.onBeforeRequest.addListener(
  rewriteUrl,
  { urls: [targetUrl], types: ["main_frame"]},
  ["blocking"]
);
