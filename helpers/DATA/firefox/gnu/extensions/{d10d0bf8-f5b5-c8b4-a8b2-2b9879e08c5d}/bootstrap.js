/*
 * This file is part of the Adblock Plus build tools,
 * Copyright (C) 2006-2014 Eyeo GmbH
 *
 * Adblock Plus is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as
 * published by the Free Software Foundation.
 *
 * Adblock Plus is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Adblock Plus.  If not, see <http://www.gnu.org/licenses/>.
 */

const Cc = Components.classes;
const Ci = Components.interfaces;
const Cr = Components.results;
const Cu = Components.utils;

let {Services, atob, btoa, File, TextDecoder, TextEncoder} = Cu.import("resource://gre/modules/Services.jsm", null);
let XMLHttpRequest = Components.Constructor("@mozilla.org/xmlextras/xmlhttprequest;1", "nsIXMLHttpRequest");

let addonData = null;

function startup(params, reason)
{
  addonData = params;
  Services.obs.addObserver(RequireObserver, "adblockplus-require", true);
  onShutdown.add(function() Services.obs.removeObserver(RequireObserver, "adblockplus-require"));

  require("main");
}

function shutdown(params, reason)
{
  let windowNames = ["abp:subscriptionSelection", "abp:composer", "abp:filters"];
  for (let i = 0; i < windowNames.length; i++)
  {
    let enumerator = Services.wm.getEnumerator(windowNames[i]);
    while (enumerator.hasMoreElements())
    {
      let window = enumerator.getNext().QueryInterface(Ci.nsIDOMWindow);
      window.setTimeout("window.close()", 0); // Closing immediately might not work due to modal windows
      try
      {
        window.close();
      } catch(e) {}
    }
  }
  onShutdown.done = true;
  for (let i = shutdownHandlers.length - 1; i >= 0; i --)
  {
    try
    {
      shutdownHandlers[i]();
    }
    catch (e)
    {
      Cu.reportError(e);
    }
  }
  shutdownHandlers = null;

  // Make sure to release our ties to the modules even if the sandbox cannot be
  // released for some reason.
  for (let key in require.scopes)
  {
    let scope = require.scopes[key];
    let list = Object.keys(scope);
    for (let i = 0; i < list.length; i++)
      scope[list[i]] = null;
  }
  require.scopes = null;
  addonData = null;
}

function install(params, reason) {}

function uninstall(params, reason)
{
  const ADDON_UNINSTALL = 6;  // https://developer.mozilla.org/en/Extensions/Bootstrapped_extensions#Reason_constants
  if (reason == ADDON_UNINSTALL)
  {
    // Users often uninstall/reinstall extension to "fix" issues. Clear current
    // version number on uninstall to rerun first-run actions in this scenario.
    Services.prefs.clearUserPref("extensions.adblockplus.currentVersion");
  }
}
let shutdownHandlers = [];
let onShutdown =
{
  done: false,
  add: function(handler)
  {
    if (shutdownHandlers.indexOf(handler) < 0)
      shutdownHandlers.push(handler);
  },
  remove: function(handler)
  {
    let index = shutdownHandlers.indexOf(handler);
    if (index >= 0)
      shutdownHandlers.splice(index, 1);
  }
};

function require(module)
{
  let scopes = require.scopes;
  if (!(module in scopes))
  {
    if (module == "info")
    {
      let applications = {"{a23983c0-fd0e-11dc-95ff-0800200c9a66}": "fennec", "toolkit@mozilla.org": "toolkit", "{ec8030f7-c20a-464f-9b0e-13a3a9e97384}": "firefox", "dlm@emusic.com": "emusic", "{92650c4d-4b8e-4d2a-b7eb-24ecf4f6b63a}": "seamonkey", "{aa3c5121-dab2-40e2-81ca-7ea25febc110}": "fennec2", "{a79fe89b-6662-4ff4-8e88-09950ad4dfde}": "conkeror", "{aa5ca914-c309-495d-91cf-3141bbb04115}": "midbrowser", "songbird@songbirdnest.com": "songbird", "prism@developer.mozilla.org": "prism", "{3550f703-e582-4d05-9a08-453d09bdfdc6}": "thunderbird"};
      let appInfo = Services.appinfo;

      scopes[module] = {};
      scopes[module].exports =
      {
        addonID: addonData.id,
        addonVersion: addonData.version,
        addonRoot: addonData.resourceURI.spec,
        addonName: "adblockplus",
        application: (appInfo.ID in applications ? applications[appInfo.ID] : "other"),
        applicationVersion: appInfo.version,
        platform: "gecko",
        platformVersion: appInfo.platformVersion
      };
    }
    else
    {
      let url = addonData.resourceURI.spec + "lib/" + module + ".js";
      scopes[module] = {
        Cc: Cc,
        Ci: Ci,
        Cr: Cr,
        Cu: Cu,
        atob: atob,
        btoa: btoa,
        File: File,
        require: require,
        
        onShutdown: onShutdown,
        
        XMLHttpRequest: XMLHttpRequest,
        
        exports: {}};
      Services.scriptloader.loadSubScript(url, scopes[module]);
    }
  }
  return scopes[module].exports;
}
require.scopes = {__proto__: null};
Cu.import("resource://gre/modules/XPCOMUtils.jsm");

let RequireObserver =
{
  observe: function(subject, topic, data)
  {
    if (topic == "adblockplus-require")
    {
      subject.wrappedJSObject.exports = require(data);
    }
  },

  QueryInterface: XPCOMUtils.generateQI([Ci.nsISupportsWeakReference, Ci.nsIObserver])
};