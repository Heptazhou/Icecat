/*
Copyright (C) 2017 Nathan Nichols

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL NATHAN NICHOLS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
function parseURL(a){
	let url = new URL(a);
	var result = Object.create(null);
	for(let i of url.searchParams) {
	    result[i[0]] = i[1];
	}
	return JSON.stringify(result, undefined, 4); 
}

function read_string(a){
	var ret = "no quotes found.";
	var flag = false;
	var ch = "";	
	for(var i = 0; i < a.length; i++){
		ch = a.charAt(i);
		if(ch == '"'){
			if(flag == false){
				ret = "";
				flag = true;
			} else{
				break;
			}
		} else{
			if(flag == true){
				ret += ch;
			}
		}
			
	}
	return ret;
}

var form =  "<div style='margin-left:25%; display:inline-block;'>"+
			"<input type='text' value='Email'></input><br>"+
			"<input type='text' value='First Name'></input><br>"+
			"<input type='text' value='Last Name'></input><br>"+
			"<input type='text' value='Country (2 letter code)'></input><br>"+
			"<input type='text' value='City'></input><br>"+
			"<input type='text' value='State (2 letter code)'></input><br>"+
			"<input type='text' value= 'Zip'></input><br>"+
			"<button id='submit_form' onclick='submit_form'>Sign petition</button><br>"
			"</div>";

// for the newer ones

function submit_form(){
		console.log("clicked");
		//document.getElementsByTagName("button")[1].style = "display:none";
		var this_uid = "";
		var this_oid = "";
		var this_aid = "";
		var this_pid = "";
		var this_eid = "";
		var this_etype = "";
		var msg = "";

		var blocked_scripts = document.getElementsByTagName("script");
		var a; 

		for(var i = 0; i < blocked_scripts.length; i++){
			if(typeof(blocked_scripts[i].dataset) != "undefined" && blocked_scripts[i].dataset["librejsBlockedSrc"].indexOf("/api/widget/petition/") != -1){
				a = blocked_scripts[i];				
				break;
			}
		}

		var script_url = a.dataset["librejsBlockedSrc"];
		var http = new XMLHttpRequest();
		console.log(document.location.host + script_url);
		http.open("GET","https://"+document.location.host + script_url);
		http.onload = function(){
			console.log("response");
			var i = this.responseText.indexOf("org-");
			this_oid = this.responseText.substring(i+4,i+40);
			i = this.responseText.indexOf(".eid= '");
			this_eid = this.responseText.substring(i+7,i+43);
			i = this.responseText.indexOf(".aid= '");
			this_aid = this.responseText.substring(i+7,i+43);
			i = this.responseText.indexOf(".userInteractionId = '");
			this_uid = this.responseText.substring(i+22,i+58);
			i = this.responseText.indexOf(".pid = '");		
			this_pid = this.responseText.substring(i+8,i+44);
			console.log(this_pid);
			i = this.responseText.indexOf(".eType= '");		
			var temp = "";
			var j = 0;
			while(temp != "'"){
				j++;
				temp = this.responseText.charAt(i+8+j);
				if(temp == "'"){
					break;
				}
				this_etype = this_etype + temp;
			}
			var form = document.getElementsByTagName("input");
			 var this_data = {
				 "PersonContact@Email@Value":{
				    "value": form[0].value,
				    "label":"Email Address",
				    "required":true
				 },
				 "PersonCensus@FirstName":{
				    "value": form[1].value,
				    "label":"First Name",
				    "required":true
				 },
				 "PersonCensus@LastName":{
				    "value": form[2].value,
				    "label":"Last Name",
				    "required":true
				 },
				 "Address@Home@Country":{
				    "value":form[3].value,
				    "label":"Country",
				    "required":true
				 },
				 "Address@Home@City":{
				    "value":form[4].value,
				    "label":"City",
				    "required":true
				 },
				 "Address@Home@State":{
				    "value": form[5].value,
				    "label":"State",
				    "required":true
				 },
				 "Address@Home@Zip":{
				    "value":form[6].value,
				    "label":"Zip Code",
				    "required":true
				 },
				 "termsAndConditions":{

				 }
			  };
			var msg = {
				header : {},
				payload : {
					userInteractionId : this_uid,
					pid : this_pid,	// petition ID
					oid : this_oid,	// organization ID
					aid : this_aid, // action ID
					cid : "", // appears to be null
					eid : this_eid, // ???
					eType : this_etype, // string
					data : this_data // form data
				},
				showComment: true,
				showSignature: true
			};
			console.log(msg);
			http2 = new XMLHttpRequest();
			http2.open("POST","https://"+document.location.host+"/api/activity/submission/petition");
			http2.onload = function(){
				//document.body.innerHTML += this.responseText;
				console.log("PETITION SUBMITTED RESPONSE:");
				var r = JSON.parse(this.responseText);
				if(r["errors"] == ""){
					window.alert("[Free Salsa Labs Petitions] \n Petition did not return errors. (Success)");
					document.getElementsByClassName(" sli-element sli-socialShare sli-horizontal")[0].style.display = "inline";
				} else{
					window.alert("[Free Salsa Labs Petitions] \n Petition returned an error:\n" + r["errors"][0] + "\n Please check your information and try again. Note that it may not accept duplicate signatures.");
				}
				console.log(r);
			}
			http2.setRequestHeader("Content-Type", "application/json; charset=utf-8");
			console.log("submitting post")			
			http2.send(JSON.stringify(msg));
		};
		http.send();
		return false;
}

function parseURL(a){
	let url = new URL(a);
	var result = Object.create(null);
    for(let i of url.searchParams) {
        result[i[0]] = i[1];
    }
    //console.log(JSON.stringify(result, undefined, 4));
	return JSON.stringify(result, undefined, 4); 
}
function goTo(url) {
	var a = document.createElement("a");
	if(!a.click) {
		location.href = url;
		return;
	}
	a.setAttribute("href", url);
	a.style.display = "none";
	(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(a);
	a.click();
}
free_salsa_submit = function( e ){
	//console.log("\nFORM SUBMITTED\n")
	var possible_matches = document.getElementById("mainForm").children[0];
	var url = possible_matches.action;
	var required_fields = document.getElementsByName("required")[0].value.split(",");
	var field;
	var form_good = true;
	var form_data = {};
	for(var i = 0; i < required_fields.length; i++){
		if(document.getElementsByName(required_fields[i])[0] !== undefined){
			field = document.getElementsByName(required_fields[i])[0];
			form_data[field.name] = field.value;		
			if(field != ""){
				console.log(field.value);
			}	else{
				form_good = false;
				console.log("[blank]");
			}
		}
	}
	if(!form_good){
		return false; // will cause the form not to submit
	}else{
		var http = new XMLHttpRequest();
		http.open('POST', url, true);
		http.onload = function (){
			//console.log("URL in response to post:");			
			var redirect = document.body.innerHTML.substr(document.body.innerHTML.indexOf("[URL]")+5);	
			//console.log("before redirect:"+document.referrer);
			console.log(redirect)
			//window.location.replace(redirect);
			window.location.href = redirect;
			//console.log("after redirect:"+document.referrer);
			//return;

		};
		http.send(form_data);
		return true;		
	}
}
console.log("loaded");
if(typeof(document.getElementsByClassName("salsa actions")[0]) != "undefined" ){
	// set the onsubmit function of the form to add-on's own free javascript
	window.alert("[Free Salsa Labs Petitions] \nDetected petition is (probably) supported by Free Salsa Labs Petitions.\n");
	var possible_matches = document.getElementById("mainForm").children[0];
	possible_matches.onsubmit = free_salsa_submit;
}

if(document.location.href.indexOf("salsalabs") != -1){

	function reveal_tag(tag){
		var elements = document.getElementsByTagName(tag);
		for(var i = 0; i < elements.length; i++){
			elements[i].style = "display:true";
		}
	}
	// it isn't gonna reveal any styles or scripts
	reveal_tag("div");
	reveal_tag("form");
	var petition_id;
	var possible = document.getElementsByClassName("sli-element");
	for(var i = 0; i < possible.length; i++){
		if(possible[i].attributes["ignite-activity-type"]){
			if(possible[i].attributes["ignite-activity-type"].value == "Petition"){
				petition_id = possible[i].attributes["ignite-activity-id"].value;
				break;
			}
		}

	}
	var poss = document.getElementsByClassName("sli-element sli-socialShare sli-horizontal").length;
	// only want to do this on some petitions........
	if(document.location.href.indexOf("rootsaction") == -1 && poss == 1){
		window.alert("[Free Salsa Labs Petitions] \nDetected petition is supported by Free Salsa Labs Petitions.\n");
		document.body.innerHTML += form;
		document.getElementsByClassName("sli-element sli-socialShare sli-horizontal")[0].style.display = "none";
		document.getElementsByTagName("button")[0].addEventListener("click",submit_form);
	} else{
		window.alert("[Free Salsa Labs Petitions] \nSorry, the detected petition is not supported. \n");
	}
}

if(document.location.href.indexOf("dailykos") != -1 || document.location.href.indexOf("actionnetwork") != -1){

	window.alert("[Free Salsa Labs Petitions] \nDetected petition is supported by Free Salsa Labs Petitions.\n");

	var meta = document.getElementsByTagName("meta");
	var prop = "no property found.";

	var title = "";
	var desc = "";
	var imgsrc = "";

	for(var i = 0; i < meta.length; i++){

		if(meta[i].outerHTML.indexOf("property=") != -1){
			prop = read_string(meta[i].outerHTML.substring(meta[i].outerHTML.indexOf("property="),meta[i].outerHTML.length));
			if(prop == "og:title"){
				title = meta[i].content;
			}
			if(prop == "og:description"){
				desc = meta[i].content;
			}

			if(prop == "og:image"){
				imgsrc = meta[i].content;
			}

		}
	}
	title = "<h1><b>" + title + "</b></h1><br><br>";
	//console.log(title);
	desc = desc.replace(/\n/g, '</br>');
	//console.log(desc);
	imgsrc = '<img src="'+imgsrc+'">';
	//console.log(imgsrc);
	var qs = JSON.parse(parseURL(document.location.href));
	//console.log(qs);

	// Where the content is
	var content = document.getElementsByClassName("container")[0];

	//content.innerHTML = title + imgsrc + "<br><br>"+desc;

	var req = {
		"clear_id":[true,true], // don't know what these mean
		"reload":"true",
		"style":"full",
		"referrer":qs["email_subject"],
		"source":qs["source"],
		"css":"undefined",
		"_":Date.now() + ""
	};

	console.log(req);
	// https://actionnetwork.org/letters/tell-congress-we-need-the-wealthy-and-big-corporations-to-pay-their-fair-share/write

	// URL is where to send the signature once params are built
	var url = document.location.href;
	url = url.substring(0,url.indexOf("?"));

	url += "/write";
	//console.log(url);


	// now get the script so we can get form fields from it
	var script_src = document.getElementsByTagName("script")[2].dataset["librejsBlockedSrc"]; // hope fully doesn't change
	var default_msg_url = script_src.substr(0,script_src.indexOf("?"));
	//console.log(default_msg_url);
	var http = new XMLHttpRequest();
	http.open("get",script_src);
	http.onload = function(){
		//console.log("SCRIPT GET");	
		var find = "place.innerHTML =";
		var start = this.response.indexOf(find) + find.length;
		var form = this.response.substr(start,this.response.length);
		form = form.substr(1,form.indexOf('";')); 	
		form = form.replace(/\\n|\\/g, '');

		content.innerHTML += unescape(form);

	};

	if(document.location.href.indexOf("clear_id=true") == -1){
		//console.log("Remembered person");

		var query = "?format=js&origin=&delivery_id="+qs["delivery_id"]+"&reload=true&style=full";

		var http2 = new XMLHttpRequest();
		http2.open("get",default_msg_url+query);
		http2.onload = function(){
			content.innerHTML = "[Follow up submitted]" + this.response;
			//console.log(this.response.substr(this.response.indexOf("<textarea"),this.response.indexOf("</textarea>")+"</textarea>".length));
		};
		http2.send();
	} else{
		//console.log("It isn't the remembered person");
		http.send(req);
	}

}











