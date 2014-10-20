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

/**
 * This file works in conjunction with lib/html_script_finder/js_web_labels.js
 * to find mentions of external JavaScript files and their license information.
 * This allows the dom_handler to allow them by default.
 */

// find table.
exports.getLicenseList = function (document) {

  var tbl = document.getElementById("jslicense-labels1"),
      jsList = [],
      i = 0,
      le,
      rows,
      link,
      fileCell,
      licenseCell,
      sourceCell,
      row;


  if (tbl) {

    try {
      rows = tbl.getElementsByTagName("tr");
      le = rows.length;
      var mockElem = {textContent: "Unknown", href: "Unknown" };
      // loop through rows, and add each valid element to 
      // the array.
      for (; i < le; i++) {

	      row = rows[i].getElementsByTagName('td');

        if (row[0] && row[0].getElementsByTagName('a')[0]) {
	        fileCell = row[0].getElementsByTagName('a')[0];
        } else {
          fileCell = mockElem;
        }

        if (row[1] && row[1].getElementsByTagName('a')[0]) {
	        licenseCell = row[1].getElementsByTagName('a')[0];
        } else {
          licenseCell = mockElem;
        }

        if (row[2] && row[2].getElementsByTagName('a')[0]) {
	        sourceCell = row[2].getElementsByTagName('a')[0];
        } else {
          sourceCell = mockElem;
        }
        if (fileCell.href != 'Unknown') {
	        jsList.push({
	          
	          'fileName': fileCell.textContent,
	          'fileUrl': fileCell.href,
	          'fileHash': null, // we'll fill this with value when needed to compare script.

	          'licenseName': licenseCell.textContent,
	          'licenseUrl': licenseCell.href, // this will now be a magnet link, most likely.
	          
	          'sourceName': sourceCell.textContent,
	          'sourceUrl': sourceCell.href
	        });
        }
	      
      }
    } catch (e) {
      console.debug("Error fetching JS Web Label licenses", e, 
                        e.lineNumber, e.fileName, "index is", i);
    }
  }

  return jsList;

};
