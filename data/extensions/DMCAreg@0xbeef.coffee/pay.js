/*
Copyright (C) 2017 Nathan Nichols

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL NATHAN NICHOLS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
console.log("pay.js");

function get_domain(url){
	var domain = url.replace('http://','').replace('https://','').split(/[/?#]/)[0];
	if(url.indexOf("http://") == 0){
		domain = "http://" + domain;
	}
	else if(url.indexOf("https://") == 0){
		domain = "https://" + domain;
	}
	domain = domain + "/";
	domain = domain.replace(/ /g,"");
	return domain;
}

if(document.location.href.indexOf("pay.gov/tcsonline/") != -1){
	document.getElementsByClassName("text")[0].remove();
	console.log("detected payment page.");

	if(	document.getElementsByClassName("redbuttontext") !== null){
		document.getElementsByClassName("redbuttontext")[0].remove();
	}


	document.getElementById("hiddenContinueButton").style.display = "";
	document.getElementById("statesCAN").remove();
	document.getElementById("statesUSA").remove();
	document.getElementById("stateText").value = "2 letter code";
}

if(get_domain(document.location.href) == "https://dmca.copyright.gov/"){
	var form = document.getElementById("file");
	if(form !== null){
		console.log("upload page detected");
		document.getElementById("btnUpload").disabled = false;
	}


}

