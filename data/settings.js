// Poodle attack
pref("security.tls.version.min", 1);

// Disable default browser checking.
pref("browser.shell.checkDefaultBrowser", false);

// Don't disable extensions dropped in to a system
// location, or those owned by the application
pref("extensions.autoDisableScopes", 3);
//pref("extensions.enabledScopes", 15);

// Don't display the one-off addon selection dialog when
// upgrading from a version of Firefox older than 8.0
pref("extensions.shownSelectionUI", true);

// Don't call home for blacklisting
pref("extensions.blocklist.enabled", false);

// Release notes and vendor URLs
pref("app.releaseNotesURL", "http://libreplanet.org/wiki/Group:IceCat/ReleaseNotes");
pref("app.vendorURL", "https://www.gnu.org/software/gnuzilla/");

// Disable plugin installer
pref("plugins.hide_infobar_for_missing_plugin", true);
pref("plugins.hide_infobar_for_outdated_plugin", true);
pref("plugins.notifyMissingFlash", false);

//https://developer.mozilla.org/en-US/docs/Web/API/MediaSource
//pref("media.mediasource.enabled",true);

//Speeding it up
pref("network.http.pipelining", true);
pref("network.http.proxy.pipelining", true);
pref("network.http.pipelining.maxrequests", 10);
pref("nglayout.initialpaint.delay", 0);

// Disable third party cookies
pref("network.cookie.cookieBehavior", 1);

// Extensions can be updated
pref("extensions.update.enabled", true);
// Use LANG environment variable to choose locale
pref("intl.locale.matchOS", true);
// Disable default browser checking.
pref("browser.shell.checkDefaultBrowser", false);
// Prevent EULA dialog to popup on first run
pref("browser.EULA.override", true);

// Default name strings
pref ("distribution.about", "GNU IceCat");
pref ("distribution.id", "gnu");
pref ("distribution.version", "1.0");

// Set useragent to Firefox compatible
//pref("general.useragent.compatMode.firefox",true);
// Spoof the useragent to a generic one
pref("general.useragent.compatMode.firefox",true);
// Spoof the useragent to a generic one
pref("general.useragent.override", "Mozilla/5.0 (Windows NT 6.1; rv:31.0) Gecko/20100101 Firefox/31.0");
pref("general.appname.override", "Netscape");
pref("general.appversion.override", "31.0");
pref("general.buildID.override", "Gecko/20100101");
pref("general.oscpu.override", "Windows NT 6.1");
pref("general.platform.override", "Win32");

// Startup page
//pref ("browser.startup.page" , 3);
//pref ("browser.startup.homepage" , "https://www.gnu.org/software/gnuzilla/");
//pref ("startup.homepage_welcome_url", "https://www.gnu.org/software/gnuzilla/");
pref("startup.homepage_welcome_url", "");
//pref ("startup.homepage_override_url" , "https://www.gnu.org/software/gnuzilla/");
pref("browser.startup.homepage_override.mstone", "ignore");

// Help URL
pref ("app.support.baseURL", "http://libreplanet.org/wiki/Group:IceCat/");
pref ("app.support.inputURL", "https://lists.gnu.org/mailman/listinfo/bug-gnuzilla");
pref ("app.feedback.baseURL", "https://lists.gnu.org/mailman/listinfo/bug-gnuzilla");
pref ("browser.uitour.url", "http://libreplanet.org/wiki/Group:IceCat/Tour");
pref ("plugins.update.url", "https://www.gnu.org/software/gnuzilla/");
pref ("browser.customizemode.tip0.learnMoreUrl", "http://libreplanet.org/wiki/Group:IceCat/Tour");

// Dictionary download preference
pref("browser.dictionaries.download.url", "http://dictionaries.mozdev.org/");
pref("browser.search.searchEnginesURL", "http://mycroft.mozdev.org/");
// Enable Spell Checking In All Text Fields
pref("layout.spellcheckDefault", 2);

// Apturl preferences
pref("network.protocol-handler.app.apt","/usr/bin/apturl");
pref("network.protocol-handler.warn-external.apt",false);
pref("network.protocol-handler.app.apt+http","/usr/bin/apturl");
pref("network.protocol-handler.warn-external.apt+http",false);
pref("network.protocol-handler.external.apt",true);
pref("network.protocol-handler.external.apt+http",true);

// Privacy & Freedom Issues
// https://webdevelopmentaid.wordpress.com/2013/10/21/customize-privacy-settings-in-mozilla-firefox-part-1-aboutconfig/
// https://panopticlick.eff.org
// http://ip-check.info
// http://browserspy.dk
// https://wiki.mozilla.org/Fingerprinting
// http://www.browserleaks.com
// http://fingerprint.pet-portal.eu
pref("privacy.donottrackheader.enabled", true);
pref("privacy.donottrackheader.value", 1);
pref("dom.ipc.plugins.flash.subprocess.crashreporter.enabled", false);
pref("browser.safebrowsing.enabled", false);
pref("browser.safebrowsing.malware.enabled", false);
//pref("services.sync.privacyURL", "https://www.gnu.org/software/gnuzilla/");
pref("social.enabled", false);
pref("social.remote-install.enabled", false);
pref("datareporting.healthreport.uploadEnabled", false);
pref("social.toast-notifications.enabled", false);
pref("datareporting.policy.dataSubmissionEnabled", false);
pref("datareporting.healthreport.uploadEnabled", false);
pref("datareporting.healthreport.service.enabled", false);
pref("browser.slowStartup.notificationDisabled", true);
pref("network.http.sendRefererHeader", 2);
pref("network.http.referer.spoofSource", true);
//http://grack.com/blog/2010/01/06/3rd-party-cookies-dom-storage-and-privacy/
//pref("dom.storage.enabled", false);
pref("dom.event.clipboardevents.enabled",false);
pref("network.prefetch-next", false);
pref("network.dns.disablePrefetch", true);
pref("network.http.sendSecureXSiteReferrer", false);
pref("toolkit.telemetry.enabled", false);
// Do not tell what plugins do we have enabled: https://mail.mozilla.org/pipermail/firefox-dev/2013-November/001186.html
pref("plugins.enumerable_names", "");
pref("plugin.state.flash", 1);
// Do not autoupdate search engines
pref("browser.search.update", false);
// Warn when the page tries to redirect or refresh
//pref("accessibility.blockautorefresh", true);

// Disable channel updates
pref("app.update.enabled", false);
pref("app.update.auto", false);

// Services
pref("gecko.handlerService.schemes.mailto.0.name", "");
pref("gecko.handlerService.schemes.mailto.1.name", "");
pref("handlerService.schemes.mailto.1.uriTemplate", "");
pref("gecko.handlerService.schemes.mailto.0.uriTemplate", "");
pref("browser.contentHandlers.types.0.title", "");
pref("browser.contentHandlers.types.0.uri", "");
pref("browser.contentHandlers.types.1.title", "");
pref("browser.contentHandlers.types.1.uri", "");
pref("gecko.handlerService.schemes.webcal.0.name", "");
pref("gecko.handlerService.schemes.webcal.0.uriTemplate", "");
pref("gecko.handlerService.schemes.irc.0.name", "");
pref("gecko.handlerService.schemes.irc.0.uriTemplate", "");
// https://kiwiirc.com/client/irc.247cdn.net/?nick=Your%20Nickname#underwater-hockey

pref("font.default.x-western", "sans-serif");

// Preferences for the Get Add-ons panel
pref ("extensions.webservice.discoverURL", "https://directory.fsf.org/wiki/GNU_IceCat");
pref ("extensions.getAddons.search.url", "https://directory.fsf.org/wiki/GNU_IceCat");

// Mobile
pref("privacy.announcements.enabled", false);
pref("browser.snippets.enabled", false);
pref("browser.snippets.syncPromo.enabled", false);
pref("browser.snippets.geoUrl", "http://127.0.0.1/");
pref("browser.snippets.updateUrl", "http://127.0.0.1/");
pref("browser.snippets.statsUrl", "http://127.0.0.1/");
pref("datareporting.policy.firstRunTime", 0);
pref("datareporting.policy.dataSubmissionPolicyVersion", 2);
pref("browser.webapps.checkForUpdates", 0);
pref("browser.webapps.updateCheckUrl", "http://127.0.0.1/");
pref("app.faqURL", "http://libreplanet.org/wiki/Group:IceCat/FAQ");

// PFS url
pref("pfs.datasource.url", "http://gnuzilla.gnu.org/plugins/PluginFinderService.php?mimetype=%PLUGIN_MIMETYPE%");
pref("pfs.filehint.url", "http://gnuzilla.gnu.org/plugins/PluginFinderService.php?mimetype=%PLUGIN_MIMETYPE%");

// I'm feeling Ducky.
pref("keyword.URL", "https://duckduckgo.com/html?t=gnu&q=!+");
pref("browser.search.defaultenginename", "DuckDuckGo");
pref("browser.search.order.extra.duckduckgo", "DuckDuckGo");
