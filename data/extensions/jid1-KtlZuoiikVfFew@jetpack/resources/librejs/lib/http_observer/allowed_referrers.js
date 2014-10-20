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

var prefChange = require("addon_management/prefchange");

/**
 * Contains a list of pages that are allowed
 * to execute JavaScript regardless of whether it is
 * nonfree and nontrivial.
 */
exports.allowedReferrers = {

  allowed: {},

  addPage: function (url) {
	  this.allowed[url] = 1;
  },

  urlInAllowedReferrers: function (url) {

	  if (this.allowed[url] === 1) {
	    return true;
	  }
	  // check if whitelisted.
	  return this.urlInWhitelist(url);

  },

  urlInWhitelist: function (url) {
	  var whitelist = prefChange.getWhitelist();
	  var i = 0, le = whitelist.length;

	  for (; i < le; i++) {

	    if (whitelist[i].test(url)) {
		    
		    return true;

	    }

	  }

  },

  clearSinglePageEntry: function (url) {

	  var index = this.allowed[url];

	  if (this.allowed[url] === 1) {
	    delete this.allowed[url];
	  }

  },

  clearAllEntries: function () {
	  this.allowed = {};
  }
};