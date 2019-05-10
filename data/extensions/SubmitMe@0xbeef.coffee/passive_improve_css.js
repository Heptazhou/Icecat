/*

Copyright (C) 2017 Nathan Nichols

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL NATHAN NICHOLS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/


var bad = [];

function escapeHTML (unsafe_str) {
    return unsafe_str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\"/g, '&quot;')
      .replace(/\'/g, '&#39;')
      .replace(/\//g, '&#x2F;')
}

function dounhide(){
        for(var i = 0; i < bad.length; i++){
                        bad[i].remove();
                }
}

console.log("passive_improve_css.js");
function reveal_css(){

	var elements = document.getElementsByTagName("style");
	for(var i = 0; i < elements.length; i++){
		var rules = escapeHTML(elements[i].innerText).replace(/\s/g,'');
		var j = rules.indexOf("display");
		if(j != -1){
			//console.log("j:"+j);
			var part = rules.substr(j,j+10);
			//console.log("part:"+part); 
			//console.log("index:"+part.indexOf("none"));
			if(part.indexOf("none") <= 10 && part.indexOf("none") > 0){
				//elements[i].remove();
				bad.push(elements[i]);
				//console.log("^^^^BAD^^^^")
			}

		}
	}
	if(bad.length > 0){
		const insertedDiv = document.createElement('div');
		insertedDiv.innerHTML= '<p id="unhide" class="button white" style="text-decoration:none!important; color:#000!important;  font-size:1em !important; font-family:\'sans-serif\'!important; font-weight:normal !important; background-color:transparent!important; margin:0!important; padding:0!important; font-size:10px!important; line-height:1!important"' +
			'alt="Click to reveal hidden elements in this page">' +
	                '<span>Reveal hidden elements</span>' +
			'</a>';
		insertedDiv.style="position:fixed; bottom:1em; right:1em; opacity:0.8; z-index: 2147483647 !important; border-radius: 3px !important; background-color: #fff !important; padding: 0.5em !important;   box-shadow: 0 0 3px grey !important; font-color:#bbb!important; cursor: pointer!important;";
		insertedDiv.addEventListener("click", dounhide, false);
		document.body.insertBefore(insertedDiv, document.body.firstChild);
	}
}

reveal_css();

/*
var a = document.getElementsByTagName("style")[2];
var btn = document.createElement("style");        // Create a <button> element
var t = document.createTextNode("body{display:inline !important;}");       // Create a text node
btn.appendChild(t);                                // Append the text to <button>
a.insertAdjacentElement("beforeBegin",btn);
*/
