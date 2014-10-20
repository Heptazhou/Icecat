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

// Uncomment the following to start debugging, or do it from about:config.
// var name = "extensions.jid1-KtlZuoiikVfFew@jetpack.sdk.console.logLevel";
// require("sdk/preferences/service").set(name, "all");

const jsAnalyzer = require("js_checker/js_checker");

var { ToggleButton } = require('sdk/ui/button/toggle');
const panel = require("sdk/panel");

const pageWorker = require("sdk/page-worker");

const data = require("sdk/self").data;
const httpObserver = require("http_observer/http_request_observer");

const { Cc, Ci } = require("chrome");
const { getMostRecentBrowserWindow } = require('sdk/window/utils'); 
const jetpackID = require("sdk/self").id; 

const tabs = require("sdk/tabs");
//const prefs = require("preferences/preferences");
const simpleStorage = require("sdk/simple-storage");
const addonManage = require("addon_management/install_uninstall");
var removedScripts = require("script_entries/removed_scripts").removedScripts;
var acceptedScripts = require("script_entries/accepted_scripts").acceptedScripts;
const dryRunScripts = require("script_entries/dryrun_scripts").dryRunScripts;

const types = require("js_checker/constant_types");

// manage preference whitelist.
const prefChange = require("addon_management/prefchange");
// set whitelist at startup.
prefChange.init();

var allowedRef = require("http_observer/allowed_referrers").allowedReferrers;

var urlHandler = require("url_handler/url_handler");

var widgetIsOn = false;

const librejsStorage = require("settings/storage").librejsStorage;
// read storage file.
var cachedResult = librejsStorage.init();
librejsStorage.generateCacheFromDB();


var uiInfo = require("ui/ui_info");
var scriptPanel = require("ui/script_panel.js");
const removeHashCallback = require("js_checker/js_checker").removeHashCallback;
var panelContent = function () {

    let panel = this;
    var message, externalEntries, 
    externalScripts, urlTabIndex, tabData;

    tabs.activeTab.attach({
        contentScriptFile: [data.url('third_party/jquery-src.js'),
                            data.url('script_detector/script_detector.js')],
        contentScriptWhen: 'ready',

	    onMessage: function (respData) {
            var url = urlHandler.removeFragment(tabs.activeTab.url);      
            scriptsData = {'removed': removedScripts.getScripts(url),
                           'accepted': acceptedScripts.getScripts(url),
                           'dryRun': dryRunScripts.getScripts(url)};
	        panel.postMessage({'pageURL': url, 
                               'urlData': scriptsData,
                               'isAllowed': allowedRef.urlInAllowedReferrers(url)});
	    }
        
    });

};

// page mod was here.

exports.main = function(options, callbacks) {
    if (options.loadReason === 'enable' || 
	    options.loadReason === 'install') {
	    addonManage.onLoad();
    }
};

var mainPanel = panel.Panel({
    contentURL: data.url('display_panel/content/display-panel.html'),
    width:  800,
    height: 500,
    contentScriptFile: [
        data.url('third_party/jquery-src.js'),
        data.url('display_panel/main_panel.js')
    ],
    onShow: panelContent,
    onHide: removePanelContent
});

var toggleButton = ToggleButton({
    id: 'librejs-toggle-switch',
    label: 'LibreJS',
    icon: {
        '16': './widget/images/librejs.png',
        '32': './widget/images/librejs.png',
        '64': './widget/images/librejs.png'
    },
    contentScriptFile: [data.url('widget/widget.js')],
    contentScriptWhen: 'end',
    panel: mainPanel,
    onChange: handleChange
});

var getWidgetElem = function () {
    let { document } = getMostRecentBrowserWindow(); 
    var name = "widget:" + jetpackID + '-librejs-toggle-switch';
    var widgetElem = document.getElementById(name);
    return widgetElem;
};

function handleChange(state) {
    if (state.checked) {
        mainPanel.show({
            position: toggleButton
        });
    }
}

function removePanelContent() {
    toggleButton.state('window', { checked: false });
}

mainPanel.port.on('complainButtonClicked', function () {
    mainPanel.hide();
});

mainPanel.port.on('allowAllClicked', function (url) {
    url = urlHandler.removeFragment(url);
    allowedRef.addPage(url);
    tabs.activeTab.reload();
});

mainPanel.port.on('disallowAllClicked', function (url) {
    console.debug('url is', url);
    url = urlHandler.removeFragment(url);
    console.debug('before clear, url is in allowedRef', allowedRef.urlInAllowedReferrers(url));
    allowedRef.clearSinglePageEntry(url);
    console.debug('after clear, url is in allowedRef', allowedRef.urlInAllowedReferrers(url));
    mainPanel.hide();
    tabs.activeTab.reload(); 
});

mainPanel.port.on('openInTab', function (text) {
    var str = generateDataURI(text);
    tabs.open(str);
});

var generateDataURI = function (encodedText) {
    return "data:text/html;charset=UTF-8;base64," + encodedText;
};

exports.onUnload = addonManage.onUnload;
exports.onLoad = addonManage.onLoad;

// move to sub-module later
const scriptsCached = require("script_entries/scripts_cache").scriptsCached;
mainPanel.port.on('whitelistByHash', function (hash, url, name, reason) {
    console.debug("hash is", hash);
    url = urlHandler.removeFragment(url);
    /*  var cached_result = scriptsCached.isCached(hash);
        console.log("cached_result is", cached_result);
        if (cached_results) {
        reason = cached_result['reason'];
        }*/
    scriptsCached.addEntryByHash(hash, types.whitelisted(reason), {}, true, url);
});

mainPanel.port.on('removeFromWhitelistByHash', function (hash) {
    scriptsCached.removeEntryByHash(hash);
    removeHashCallback(hash);
});
const settings_tab = require("settings/settings_tab");
var menuitem = require("menuitems").Menuitem({
    id: 'librejs_settings',
    menuid: "menu_ToolsPopup",
    label: "LibreJS",
    onCommand: function() {
        settings_tab.settingsManager.open();
    },
    insertbefore: "menu_pageInfo"
});

mainPanel.port.on('openSesame', function () {
    // open the settings tab.
    settings_tab.settingsManager.open();
});

