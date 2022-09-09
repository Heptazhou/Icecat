const DEBUG = 0;
const DIRECT_PROXY = {
    type: 'direct'
};
const DEFAULT_PROXY_SETTINGS = {
    type: 'socks',
    host: '127.0.0.1',
    port: 9050,
    username: '',
    password: '',
    proxyDNS: true
};
let proxies = [ DIRECT_PROXY, DIRECT_PROXY ];
var skipLocal = 1;
var pendingRequests = [];
var currentProxy = 0;

function buttonClicked() {
    currentProxy = (currentProxy ? 0 : 1);
    browser.storage.local.set({ currentProxy: currentProxy });
    updateState();
}

function updateState() {
    if(currentProxy==0)
    {
        if (DEBUG)
            console.log('Update state (proxy off)');
        browser.browserAction.setIcon({path: "icons/p1.svg"});
        browser.browserAction.setTitle({title: "Tor Proxy (disabled)"});
    }
    else
    {
        if (DEBUG)
            console.log('Update state (proxy on)');
        browser.browserAction.setIcon({path: "icons/p2.svg"});
        browser.browserAction.setTitle({title: "Tor Proxy (enabled)"});
    }
}

function settingsChanged(settings) {
    if ("proxySettings" in settings)
        proxies[1] = settings.proxySettings.newValue;
    if ("skipLocal" in settings)
        skipLocal = settings.skipLocal.newValue;
}

function completed(requestDetails) {
    if (DEBUG) {
        console.log("completed request: " + requestDetails.requestId);
    }
    var index = pendingRequests.indexOf(requestDetails.requestId);
    if (index > -1) {
        pendingRequests.splice(index, 1);
    }
}

function provideCredentialsSync(requestDetails) {
    if (!requestDetails.isProxy)
        return;
    if (!currentProxy == 1)
        return;
    if (pendingRequests.indexOf(requestDetails.requestId) != -1) {
        //if we've seen the request before, assume bad credentials and give up
        console.log("Bad proxy credentials for request: " + requestDetails.requestId);
        return {cancel:true};
    }
    var credentials = {
        username: proxies[1].username,
        password: proxies[1].password
    }
    pendingRequests.push(requestDetails.requestId);
    if (DEBUG) {
        console.log(`Providing proxy credentials for request: ${requestDetails.requestId} username: ${credentials.username}`);
    }
    return {authCredentials: credentials};
}

function isLocalIPv4(host)
{
    var octets = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/.exec(host);
    if(!octets)
        return false;
    if(octets[1]>255||octets[2]>255||octets[3]>255||octets[4]>255)
        return false;
    if(octets[1]==10||octets[1]==127) //class A or local loopback
        return true;
    if(octets[1]==172&&octets[2]>=16&&octets[2]<=31) //class B
        return true;
    if(octets[1]==192&&octets[2]==168) //class C
        return true;
    return false;
}

function isLocal(host)
{
    if(host.indexOf('.') == -1)
        return true;
    if(host.endsWith(".local"))
        return true;
    if(host=="::1")
        return true;
    return(isLocalIPv4(host));
}

function handleProxyRequest(requestInfo) {
    const url = new URL(requestInfo.url);
    var host = url.hostname;
    var proxyNum = currentProxy;
    if (skipLocal) {
        if(isLocal(host)) {
            if (DEBUG)
                console.log(`Local host detected: ${host}`);
            proxyNum = 0;
        }
    }
    if (DEBUG) {
        console.log(`Proxying: ${url.hostname}`);
        console.log(proxies[proxyNum]);
    }
    return(proxies[proxyNum]);
}

browser.storage.local.get({ currentProxy: 0, skipLocal: true, proxySettings: DEFAULT_PROXY_SETTINGS }, items=>{
    currentProxy = items.currentProxy;
    skipLocal = items.skipLocal;
    proxies[1] = items.proxySettings;
    updateState();
});

browser.storage.onChanged.addListener(settingsChanged);
browser.browserAction.onClicked.addListener(buttonClicked);
browser.proxy.onRequest.addListener(handleProxyRequest, {urls: ["<all_urls>"]});
browser.proxy.onError.addListener(error => {
    console.error(`Proxy error: ${error.message}`);
});
browser.webRequest.onAuthRequired.addListener(
    provideCredentialsSync,
    {urls: ["<all_urls>"]},
    ["blocking"]
);
browser.webRequest.onCompleted.addListener(
    completed,
    {urls: ["<all_urls>"]}
);
browser.webRequest.onErrorOccurred.addListener(
    completed,
    {urls: ["<all_urls>"]}
);
