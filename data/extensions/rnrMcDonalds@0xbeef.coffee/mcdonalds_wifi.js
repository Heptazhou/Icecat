//http://nmd.mcd12632.msp.wayport.net/index.adp?MacAddr=E0%3a06%3aE6%3a68%3aAF%3a55&IpAddr=192.168.5.94&Ip6Addr=&vsgpId=&vsgId=75381&UserAgent=&ProxyHost=&TunnelIfId=174423&VlanId=20&origDest=http%3a%2f%2fhttpstat.us%2f

console.log("Rock and roll McDonalds detected the McDonald's captive portal.")
var form = document.getElementsByTagName("form");
var entries = form[0].getElementsByTagName("input");
var data = new FormData();
captive_portal_url = "wayport.net"
if ("undefined" === typeof(document.getElementsByTagName("form")[0].action)) {
	console.log("no form found.")    
} else{
	document.body.style.border = "5px solid red";	
	post_url = document.getElementsByTagName("form")[0].action;
	var dest = "";
	for(var i = 0; i < entries.length; i++){
		console.log(entries[i].name + ":" + entries[i].value);

		if(entries[i].name == "origDest"){
				dest = entries[i].name;
		        entries[i].value = "http://www.wikipedia.org";
		}
		// Seems like this should be set to 1, not sure if required though
		if(entries[i].name == "connect"){
		        entries[i].value = "1";
		}
	
		data.append(entries[i].name,entries[i].value);

	}
	var http = new XMLHttpRequest();
	//auth_url = document.URL.substring(0,document.URL.indexOf(captive_portal_url)+captive_portal_url.length);
	//auth_url += post_url;
	console.log(data);
	console.log(post_url);
	var xhr = new XMLHttpRequest();
	xhr.open('POST', post_url, true);
	xhr.onload = function () {
		// do something to response
		console.log(this.responseText);
		document.body = this.responseText;
	};
	xhr.send(data);
	alert("[Rock and Roll McDonalds]: Authenticated to McDonald's Wi-fi.")
}
