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

var privacyThreatJs = require('js_checker/privacy_threat_definitions.js');
var patternUtils = require('js_checker/pattern_utils').patternUtils;

exports.privacyCheck = {
  
  checkScriptPrivacyThreat: function (currentScript) {
	  var list = privacyThreatJs.js,
	      i,
	      jsRegexp,
        match,
	      max,
	      check;
	  
	  currentScript = patternUtils.removeWhitespace(currentScript);

	  for (var item in list) {
	    max = list[item].length;

	    for (i = 0; i < max; i++) {
		    if (list[item][i].test(currentScript)) {
		      return true;
		    }
	    }

	  }
  }
  
};