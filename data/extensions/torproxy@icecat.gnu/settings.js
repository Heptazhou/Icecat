function saveOptions(e) {
    e.preventDefault();
    browser.storage.local.set({
        proxySettings: {
            type: document.querySelector("#type").value,
            host: document.querySelector("#host").value,
            port: document.querySelector("#port").value,
            username: document.querySelector("#username").value,
            password: document.querySelector("#password").value,
            proxyDNS: document.querySelector("#dns").checked
        },
        skipLocal: document.querySelector("#skiplocal").checked
    });
}

function restoreOptions(e) {
    function onGot(item) {
        document.querySelector("#host").value = item.proxySettings.host;
        document.querySelector("#port").value = item.proxySettings.port;
        document.querySelector('#type [value="' + item.proxySettings.type + '"]').selected = true;
        document.querySelector("#username").value = item.proxySettings.username;
        document.querySelector("#password").value = item.proxySettings.password;
        document.querySelector("#dns").checked = item.proxySettings.proxyDNS;
        document.querySelector("#skiplocal").checked = item.skipLocal;
        typeChanged(e);
    }
    function onError(error) {
        console.log(`Error: ${error}`);
    }
    var gettingItem = browser.storage.local.get({ skipLocal: true, proxySettings: {type: 'socks', host: '127.0.0.1', port: 9050, username: '', password: '', proxyDNS: true}});
    gettingItem.then(onGot, onError);
}

function typeChanged(e) {
    var type = document.querySelector("#type").value;
    var dnsDisplay = 'none';
    if(type=="socks"||type=="socks4")
        dnsDisplay = 'table-row';
    else
        document.querySelector("#dns").checked = false;
    document.querySelector("#dnsrow").style.display = dnsDisplay;
    saveOptions(e);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("#type").addEventListener("change", typeChanged);
document.querySelector("#host").addEventListener("blur", saveOptions);
document.querySelector("#port").addEventListener("blur", saveOptions);
document.querySelector("#port").addEventListener("change", saveOptions);
document.querySelector("#username").addEventListener("blur", saveOptions);
document.querySelector("#password").addEventListener("blur", saveOptions);
document.querySelector("#dns").addEventListener("change", saveOptions);
document.querySelector("#skiplocal").addEventListener("change", saveOptions);
