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
const addonTab = require("addon-tab");
const data = require("sdk/self").data;
const storage = require("settings/storage").librejsStorage;
const scriptsCached = require("script_entries/scripts_cache").scriptsCached;

exports.settingsManager = settingsManager;



let settingsManager = {
  settings_tab: {
    url: data.url("settings/index.html"),
    tabStyle: {
      'background-color': '#898168',
      'background-image': 'none', // important to overwrite bckg when tab is active.
      'font-weight': 'normal',
      'font-size': '1.1em',
      'color': '#444'
    },
    onReady: function (tab) {
      console.debug("populating form");
      var that = this;
      let cache_data = scriptsCached.getCacheForWriting();      
      let worker = tab.attach({contentScriptFile: [data.url('settings/js/pagescript-listener.js'), 
                                                   data.url('settings/js/pagescript-emitter.js')]});
      worker.port.emit("populate-form", cache_data);
      worker.port.on("rules-form-delete", function (hash) {
        try {
          scriptsCached.removeEntryByHash(hash);
        } catch (e) {
          console.log(e, e.lineNumber, e.filename);
        }
        //worker.port.emit("populate-form", scriptsCached.getCacheForWriting());
      });
      worker.port.on("rules-form-delete-all", function () {
        console.log("delete all triggered.");
        scriptsCached.resetCache();
      });
    },
    onActivate: function (tab) {
      // just reload the form.
      console.log("Tab is activated again");
      var that = this;
      let cache_data = scriptsCached.getCacheForWriting();      
      let worker = tab.attach({contentScriptFile: [data.url('settings/js/pagescript-listener.js'), 
                                                   data.url('settings/js/pagescript-emitter.js')]});
      worker.port.emit("populate-form", cache_data);

    }
  },
  

  init: function () {
    // do some first time magic.
    settings.onLoad(function (data) {

    });
  },
  open: function () {
    console.debug("settings tab data url is", this.settings_tab.url);
    addonTab.open(this.settings_tab);
  }
};

exports.settingsManager = settingsManager;
