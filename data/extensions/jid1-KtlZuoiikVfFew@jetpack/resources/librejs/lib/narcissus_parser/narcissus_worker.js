/**
 * GNU LibreJS - A browser add-on to block nonfree nontrivial JavaScript.
 * *
 * Copyright (C) 2011, 2012, 2013, 2014 Loic J. Duros
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see  <http://www.gnu.org/licenses/>.
 *
 */

var data = require("sdk/self").data;
var {Cu} = require("chrome");

var {ChromeWorker} = Cu.import("resource://gre/modules/Services.jsm", null);


var worker = new ChromeWorker(data.url("chrome_worker/narcissus_parser/narcissus_parse.js"));

worker.onmessage = function (e) {

  var jsChecker = require("js_checker/js_checker");

  try {
	  
	  jsChecker.callbackHashResult(e.data.hash, e.data.tree);

  } catch (x) {
    
	  console.debug('error on message', x);
	  jsChecker.callbackHashResult(e.data.hash, false);

  }
  jsChecker = null;
};

exports.parse = function (scriptText, hash) {

  try {
	   // dont display errors for main version.
	   worker.onerror = function (e) {
	     console.debug('error', e.lineno, 'in', e.filename, 'e', e.message, 'full message', e);
       worker.postMessage(JSON.stringify({'hash': hash}));
	   };
	  
	  var obj = {'code': scriptText, 'hash': hash};
	  worker.postMessage(JSON.stringify(obj));
    
  } catch (x) {
	  console.debug('error in lib/narcissus_worker.js', x, x.lineNumber);	  
  }

};

exports.stopWorker = function () {
  console.debug('stopping worker');
  worker.postMessage('stop');
};
