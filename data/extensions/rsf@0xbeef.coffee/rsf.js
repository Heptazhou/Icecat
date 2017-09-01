/*
Copyright (C) 2017 Nathan Nichols

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL NATHAN NICHOLS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

function broken_page(){
	if(document.getElementsByClassName("col-md-4 petition-wrap")[0] === undefined){
		return 0;	
	}	
	var iframe_src = document.getElementsByTagName("iframe")[0].src.replace(/[\s\S]+%20/g,"");
	document.getElementsByClassName("col-md-4 petition-wrap")[0].insertAdjacentHTML("afterbegin",'<h2 style="background-color: #00ffff;"><a href="'+iframe_src+'">Click here to sign the petition</a><h2>');
	document.getElementsByTagName("iframe")[0].remove();
}

function petition_page(){
	document.getElementsByTagName("form")[0].insertAdjacentHTML("beforeend",document.getElementById("ajax-view-state-page-container").innerHTML);
	console.log("inserted info");
}

if(document.location.href.match("rsf.secure.force.com/petition") !== null){
	console.log("petition");// the page in the iframe
	petition_page();
} else{
	console.log("other page");
	broken_page();// the one with the iframe that is a 404
}

