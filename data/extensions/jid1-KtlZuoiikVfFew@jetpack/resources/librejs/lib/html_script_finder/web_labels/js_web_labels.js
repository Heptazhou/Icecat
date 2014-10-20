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

// node.js url module. Makes it easier to resole 
// urls in that datauri loaded dom
var urlHandler = require("url_handler/url_handler");
var {Cc, Ci, Cu, Cm, Cr} = require("chrome");

var data = require("sdk/self").data;

// license definitions, we are using canonical urls and license
// identifiers.
var licenses = require('js_checker/license_definitions').licenses;

var getLicenseList = require('html_script_finder/web_labels/find_js_labels').getLicenseList;
const types = require("js_checker/constant_types");

const addToCache = require("html_script_finder/web_labels/script_hash_worker").addToCache;

// keep web labels in memory so that they can be checked even when they
// are embedded dynamically.
var jsWebLabelEntries = {};

// store the url to js web labels already visited during this session
var jsLabelsPageVisited = {}; 

var WebLabelFinder = function () {
    this.dom = null;
    this.pageURL = null;
    this.jslicenseURL = null;
    this.pageContent = null;
    this.licenseList = null;
    this.callback = null;
};

WebLabelFinder.prototype.init = function(dom, pageURL, callback) {
    var that = this;
    this.pageURL = pageURL;
    this.dom = dom;
    this.callback = function (a) { 
        if (typeof a == 'undefined') {
            a = null;
        }

        // rewrite callback as soon as it is triggered once.
        that.callback = function () { 
            console.debug("Callback already called");
        };

        callback(a);
    };
    this.findJavaScriptLicenses();
    this.pageContent = '';
    this.jslicenseURL = '';
};

WebLabelFinder.prototype.findJavaScriptLicenses = function () {
    this.searchForJsLink();

    if (this.jslicenseURL && !(jsLabelsPageVisited[this.jslicenseURL])) {
        // get content from license page.
        console.debug('called fetch license page for', this.jslicenseURL);
        this.pageContent = this.fetchLicensePage();
    }
    else {
        console.debug(this.jslicenseURL, "already visited");
        this.callback();
    }
};

WebLabelFinder.prototype.searchForJsLink = function() {
    console.debug('triggered searchForJsLink');
    if (this.dom) {
        var linkTags = this.dom.getElementsByTagName('a'),
            i = 0,
            len = linkTags.length,
            path;

        // loop through all a tags.
        for (; i < len; i++) {
            if (linkTags[i].hasAttribute('rel') &&
                    linkTags[i].getAttribute('rel') === 'jslicense') {
                        return this.formatURL(linkTags[i]);
                    }
        }
    }
    // no js web labels were found. call back.
    this.callback();
};

WebLabelFinder.prototype.formatURL = function(link) {
    this.jslicenseURL = urlHandler.resolve(this.pageURL, link.href);
    this.jslicenseURL = urlHandler.addFragment(this.jslicenseURL, 'librejs=true');
    console.debug('license URL found', this.jslicenseURL);
};

WebLabelFinder.prototype.fetchLicensePage = function() {
    var that = this;
    try {

        var req =  Cc["@mozilla.org/xmlextras/xmlhttprequest;1"].createInstance();

        req.onload = function() {
            console.debug("Fetching License!");
            console.debug("URL is ", this._url);

            that.licenseList = getLicenseList(this.responseXML);
            console.debug("the license list", that.licenseList);
            that.matchListWithDefs(this._url);

            // add these entries to the global
            // object for dynamically embedded scripts.
            jsWebLabelEntries[that.pageURL] = that.licenseList;
            jsLabelsPageVisited[req._url] = 1;

        };
        console.debug(this.jslicenseURL);
        req.open('GET', this.jslicenseURL, true);
        req._url = this.jslicenseURL;
        req.responseType = "document";
        req.send();

    } catch (e) {
        console.debug(e, e.lineNumber, e.fileName, this.jslicenseURL);
        this.callback({});
    }

};

WebLabelFinder.prototype.matchListWithDefs = function(jslicenseURL) {
    var i = 0, 
        len = this.licenseList.length,
        lic,
        licDef,
        urlLength,
        iUrl, 
        licArray = null, 
        license, script;
    var cacheCalls = 0;
    list_check = {};
    // nested loop.
    cacheCalls = 0;
    var callback = function (url) {
        cacheCalls++;
        list_check[url] = 1;
        if (cacheCalls == Object.keys(list_check).length) {
            console.debug("triggering callback duh");
            // return array to requester object
            callback = false;
            that.callback(that.licenseList);
        }
    };
    require("sdk/timers").setTimeout(function () {
        // callback after 60 seconds if it's still not returned.
        // using this as a safeguard.
        // return array to requester object
        if (callback !== false) {
            that.callback(that.licenseList);
            console.debug(list_check);
        }
    }, 15000);

    for (; i < len; i++) {
        lic = this.licenseList[i];
        var that = this;
        for (license in licenses) {
            licDef = licenses[license];
            if (licDef.canonicalUrl !== undefined) {
                if (typeof licDef.canonicalUrl == 'string') {
                    // this is a string. make it an array.
                    licArray = [licDef.canonicalUrl];
                }  else {
                    licArray = licDef.canonicalUrl;
                }

                urlLength = licArray.length;

                for (iUrl = 0; iUrl < urlLength; iUrl++) {
                    if (urlHandler.removeFragment(licArray[iUrl]) === urlHandler.removeFragment(lic.licenseUrl)) {
                        if (!require("sdk/url").isValidURI(lic.fileUrl)) {
                            console.debug(lic.fileUrl, " is not a valid URL");
                            callback();
                        }
                        lic.free = true;
                        var notif = require("ui/notification").createNotification(lic.fileUrl).notification;
                        console.debug("about TO ADD TO XHR: ", lic.fileUrl);
                        list_check[lic.fileUrl] = 0;
                        addToCache(lic, 0, jslicenseURL, callback);
                    }
                }
            }
        }
    }
};

exports.WebLabelFinder = WebLabelFinder;

// store the web labels harvested across webpages (single session).
exports.jsWebLabelEntries = jsWebLabelEntries;
