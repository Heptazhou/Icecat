/**
 * Permafrost - Protect your privacy!
 * *
 * Copyright (C) 2012 2013 Loic J. Duros
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

/*jslint indent: 2 */
/*jslint white: false */
/*jslint eqeq: true */
/*jslint plusplus: true*/
/*jslint forin: true */
/*global document: false, self: false */

// listen for a message from the pagescript
document.documentElement.addEventListener("librejs-settings-change", function (event) {
  "use strict";

  switch (event.detail.event) {
    
    case 'rules-form-update':
    self.port.emit('rules-form-update', event.detail.value);
    break;
    
    case 'rules-form-delete':
    //console.log('hash is', event.detail.value);
    self.port.emit('rules-form-delete', event.detail.value);
    break;

    case 'rules-form-delete-all':
    self.port.emit('rules-form-delete-all');
    break;
    
    case 'rules-form-reorder':
    self.port.emit('rules-form-reorder', event.detail.value);
    break;
    
    case 'rules-form-add-empty-row':
    self.port.emit('rules-form-add-empty-row', event.detail.value);
    break;
    
  }

}, false);


