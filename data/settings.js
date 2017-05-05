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
pref("app.releaseNotesURL", "https://savannah.gnu.org/news/?group=gnuzilla");
pref("app.vendorURL", "https://www.gnu.org/software/gnuzilla/");
pref("app.privacyURL", "http://www.gnu.org/software/gnuzilla/");

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

// disable app updater url
pref("app.update.url", "http://127.0.0.1/");"

// Default name strings
pref ("distribution.about", "GNU IceCat");
pref ("distribution.id", "gnu");
pref ("distribution.version", "1.0");

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
pref("datareporting.healthreport.about.reportUrl", "127.0.0.1");
pref("datareporting.healthreport.documentServerURI", "127.0.0.1");
pref("healthreport.uploadEnabled", false);
pref("social.toast-notifications.enabled", false);
pref("datareporting.policy.dataSubmissionEnabled", false);
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
pref("toolkit.telemetry.unified", false);
// Do not tell what plugins do we have enabled: https://mail.mozilla.org/pipermail/firefox-dev/2013-November/001186.html
pref("plugins.enumerable_names", "");
pref("plugin.state.flash", 0);
// Do not autoupdate search engines
pref("browser.search.update", false);
// Warn when the page tries to redirect or refresh
//pref("accessibility.blockautorefresh", true);
pref("dom.battery.enabled", false);
pref("device.sensors.enabled", false);
pref("camera.control.face_detection.enabled", false);
pref("camera.control.autofocus_moving_callback.enabled", false);
pref("network.http.speculative-parallel-limit", 0);
// No search suggestions
pref("browser.urlbar.userMadeSearchSuggestionsChoice", true);
pref("browser.search.suggest.enabled", false);

// Crypto hardening
// https://gist.github.com/haasn/69e19fc2fe0e25f3cff5
//General settings
pref("security.tls.unrestricted_rc4_fallback", false);
pref("security.tls.insecure_fallback_hosts.use_static_list", false);
pref("security.tls.version.min", 1);
pref("security.ssl.require_safe_negotiation", true);
pref("security.ssl.treat_unsafe_negotiation_as_broken", true);
pref("security.ssl3.rsa_seed_sha", true);
pref("security.OCSP.enabled", 1);
pref("security.OCSP.require", true);

// Disable channel updates
pref("app.update.enabled", false);
pref("app.update.auto", false);

// EME
pref("media.eme.enabled", false);
pref("media.eme.apiVisible", false);

// WebRTC
pref("media.peerconnection.enabled", false);
pref("media.peerconnection.ice.default_address_only", true);

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
pref("identity.mobilepromo.android", "https://f-droid.org/repository/browse/?fdid=org.gnu.icecat&");
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

// Geolocation depends on third party services
pref("geo.enabled", false);
pref("geo.wifi.uri", "");

// I'm feeling Ducky.
pref("keyword.URL", "https://duckduckgo.com/html?t=gnu&q=!+");
pref("browser.search.defaultenginename", "DuckDuckGo");
pref("browser.search.order.extra.duckduckgo", "DuckDuckGo");
pref("browser.search.showOneOffButtons", false);
// US specific default (used as a fallback if the geoSpecificDefaults request fails).
pref("browser.search.defaultenginename.US",      "data:text/plain,browser.search.defaultenginename.US=DuckDuckGo");
pref("browser.search.order.US.1",                "data:text/plain,browser.search.order.US.1=DuckDuckGo");
pref("browser.search.order.US.2",                "data:text/plain,browser.search.order.US.2=Google");
pref("browser.search.order.US.3",                "data:text/plain,browser.search.order.US.3=Yahoo");

// Disable Gecko media plugins: https://wiki.mozilla.org/GeckoMediaPlugins
pref("media.gmp-manager.url", "http://127.0.0.1/");
pref("media.gmp-manager.url.override", "data:text/plain,");
pref("media.gmp-provider.enabled", false);
// Don't install openh264 codec
pref("media.gmp-gmpopenh264.enabled", false);
pref("media.gmp-eme-adobe.enabled", false);

//Disable heartbeat
pref("browser.selfsupport.url", "");

//Disable Link to FireFox Marketplace, currently loaded with non-free "apps"
pref("browser.apps.URL", "");

//Disable Firefox Hello
pref("loop.enabled",false);

// Use old style preferences, that allow javascript to be disabled
pref("browser.preferences.inContent",false);

// Don't download ads for the newtab page
pref("browser.newtabpage.directory.source", "");
pref("browser.newtabpage.directory.ping", "");
pref("browser.newtabpage.introShown", true);

// Disable home snippets
pref("browser.aboutHomeSnippets.updateUrl", "data:text/html");

// Disable hardware acceleration and WebGL
//pref("layers.acceleration.disabled", false);
pref("webgl.disabled", false);
pref("gfx.direct2d.disabled", true);

// Disable SSDP
pref("browser.casting.enabled", false);

//Disable directory service
pref("social.directories", "");

// Disable Pocket integration
pref("browser.pocket.enabled", false);
pref("extensions.pocket.enabled", false);

// Do not require xpi extensions to be signed by Mozilla
pref("xpinstall.signatures.required", false);

// Do not show unicode urls https://www.xudongz.com/blog/2017/idn-phishing/
pref("network.IDN_show_punycode", true);
