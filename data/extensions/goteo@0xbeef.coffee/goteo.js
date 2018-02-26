/*
Copyright (C) 2017 Nathan Nichols

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL NATHAN NICHOLS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
function update_currency(){
	var curr = document.getElementById("currency_select").selectedOptions[0].innerHTML;
	var value = document.getElementsByName("Importe")[0].value;
	value = value.substr(0,value.length-2) + "," + value.substr(value.length-2,value.length)+" "+curr;
	document.getElementById("imp").innerText = value;
	var currency = document.getElementsByName("TipoMoneda")[0];
	currency.value = document.getElementById("currency_select").value;		
}


if(document.domain.indexOf("goteo.org") == -1){

	var currency_options = '<div class="box mgt"><div class="izq"><label class="bloque">Currency/moneda:</label><select id="currency_select"><option value="978">EUR</option></select></div></div>';
	document.getElementById("pago_tarjeta").insertAdjacentHTML("beforeend",currency_options);
	document.getElementById("currency_select").addEventListener("change", update_currency);

	// Generate correct year options
	var d = new Date();
	var n = d.getFullYear();
	var opts = "";

	for(var i = 0; i < 15; i++){
		var cy = n+i;
		opts += "<option value='"+cy+"'>"+cy+"</option>\n";
	}

	document.getElementsByName("elanyo")[0].insertAdjacentHTML("afterbegin",opts);
	document.body.insertAdjacentHTML("afterbegin","<h1>3rd party Javascript activated because you downloaded an add-on to use this page with free Javascript. If you are not running LibreJS, disable this add-on or reload with it enabled.</h1>");
	document.getElementsByTagName("h1")[0].style.display = "inline";
	document.getElementsByTagName("h1")[0].style.color = "red";

	document.getElementById("visa").children[0];
	document.getElementById("tarjetero").children[0];
	document.getElementById("masterpass").children[0];


	var a = document.getElementsByClassName("izq divizq")[0];
	a.addEventListener("click",function(){
		if(document.getElementById("visa").children[0].checked){
			document.getElementById("pago_tarjeta").style.display = "block";
			document.getElementById("pago_tarjetero").style.display = "none";
			document.getElementById("pago_masterpass").style.display = "none";
		}
		if(document.getElementById("tarjetero").children[0].checked){
			document.getElementById("pago_tarjeta").style.display = "none";
			document.getElementById("pago_tarjetero").style.display = "block";
			document.getElementById("pago_masterpass").style.display = "none";
		}
		if(document.getElementById("masterpass").children[0].checked){
			document.getElementById("pago_tarjeta").style.display = "none";
			document.getElementById("pago_tarjetero").style.display = "none";
			document.getElementById("pago_masterpass").style.display = "block";
		}	
	});

	a.click();

	document.getElementById("pagar").addEventListener("click",function(){
		// Read the inputs and set the form values:
		// expire date
		var expire = document.getElementsByName("Caducidad")[0];
		expire.value = document.getElementsByName("elanyo")[0].value+document.getElementsByName("elmes")[0].value;
		// currency code
		var currency = document.getElementsByName("TipoMoneda")[0];
		currency.value = document.getElementById("currency_select").value;		

		document.getElementsByTagName("form")[0].submit();
	});

	var num_op = document.getElementsByName("Num_operacion")[0].value;
	document.getElementById("numoperacion").innerText = num_op;
	document.getElementById("CSC").style.display = "none";
	document.getElementById("mc_S_ico").style.display = "none";
	document.getElementById("visa_S_ico").style.display = "none";
	document.getElementById("mc_S_ico").style.display = "none";
	document.getElementById("amex_ico").style.display = "none";

	var value = document.getElementsByName("Importe")[0].value;
	value = value.substr(0,value.length-2) + "," + value.substr(value.length-2,value.length) + " EUR";
	document.getElementById("imp").innerText = value;
} else{
	console.log("goteo");
	// this needs to happen twice for some reason
	var dropdown = document.getElementsByClassName("dropdown-menu language-dropbox");
	var a = [];
	for(var i = 0; i < dropdown.length; i++){
		a.push(dropdown[i])
	}
	for(var i = 0; i < a.length; i++){
		a[i].className = "";
	}
}

















