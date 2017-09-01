/*

Copyright (C) 2017 Nathan Nichols

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL NATHAN NICHOLS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/



function unescapeHTML (unsafe_str) {
    return unsafe_str
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '\"')
      .replace(/\&#39;/g, '\'')
      .replace(/&#x2F/g, '\/')
}


function escapeHTML (unsafe_str) {
    return unsafe_str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\"/g, '&quot;')
      .replace(/\'/g, '&#39;')
      .replace(/\//g, '&#x2F;')
}

console.log("passive_improve_css.js");
var content;
function replace_regex(){
	content = content.replace(/type\s*\=\s*("|')\s*hidden\s*\1\s*;/g,"");   // type=hidden (HTML inputs can have this);
	content = content.replace(/display\s*:\s*none/g,"");    				// display:none ()
	content = content.replace(/visibility\s*:\s*hidden/g,"");				// visibility: hidden
	document.documentElement.innerHTML = "<html>"+content+"</html>";
}

function reveal_css(){
//	content = escapeHTML(document.documentElement.innerHTML);
	content = document.documentElement.innerHTML;
	var a = content.match(/type\s*\=\s*("|')\s*hidden\s*\1\s*;/g);   // type=hidden (HTML inputs can have this);
	var b = content.match(/display\s*:\s*none/g);    				 // display:none 
	var c = content.match(/visibility\s*:\s*hidden/g);				 // visibility: hidden
	
	if(a === null){a = 0;}else{a = a.length;}
	if(b === null){b = 0;}else{b = b.length;}
	if(c === null){c = 0;}else{c = c.length;}
	var to_insert = '<div style="opacity: 0.5; font-size: small; z-index: 2147483647; position: fixed; right: 1%; top: 4%;" id="abc123_main_div"><input id="abc123_reveal_button" value="Click to reveal hidden elements"type="button"></input><br><input id="abc123_rm_buttons" value="remove buttons" type="button"></input></div>';
	document.body.insertAdjacentHTML('afterbegin', to_insert);
	document.getElementById("abc123_reveal_button").addEventListener("click",function(){
		replace_regex();
		document.getElementById("abc123_reveal_button").remove();
	});
	document.getElementById("abc123_rm_buttons").addEventListener("click",function(){
		document.getElementById("abc123_rm_buttons").remove();
		document.getElementById("abc123_reveal_button").remove();
		document.getElementById("abc123_main_div").remove();
	});
	//if(a+b+c >= 1 && window.confirm("Hidden HTML detected, would you like to reveal it?")){

	return 0;	
}

reveal_css();


/*
var a = document.getElementsByTagName("style")[2];
var btn = document.createElement("style");        // Create a <button> element
var t = document.createTextNode("body{display:inline !important;}");       // Create a text node
btn.appendChild(t);                                // Append the text to <button>
a.insertAdjacentElement("beforeBegin",btn);
*/
