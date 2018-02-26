/*
Copyright (C) 2017 Nathan Nichols

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL NATHAN NICHOLS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
console.log("blockjs1.js[pay.gov]");

// get this from the manifest.json directly
/*
var block_urls = [
		"*://actionnetwork.org/letters/*",
        "*://www.dailykos.com/*",
		"*://act.rootsaction.org/*",
		"*://rootscation.org/*",
		"*://*.salsalabs.org/*"
];
*/
var block_urls = ["https://www.pay.gov/tcsonline/*"];
function cancel(requestDetails) {
  console.log("[pay.gov]Canceling: " + requestDetails.url);
  return {cancel: true};
}


browser.webRequest.onBeforeRequest.addListener(
	cancel,             // function
	{urls: block_urls, types: ["script"]},
	["blocking"]
);
