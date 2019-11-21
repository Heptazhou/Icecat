if (/Firefox/.test(navigator.userAgent)) {
  chrome.proxy = {"settings": {}};
  chrome.proxy.convert = {
    "to": ({value}) => {
      const mode = value.mode;
      const settings = {
        "autoLogin": value.noPrompt,
        "proxyDNS": value.remoteDNS,
        "autoConfigUrl": mode === 'pac_script' ? value.pacScript.url : '',
        "socksVersion": mode === 'fixed_servers' && value.rules.singleProxy.scheme === 'socks5' ? 5 : 4,
        "passthrough": mode === 'fixed_servers' && value.rules.bypassList && value.rules.bypassList.length ? value.rules.bypassList.join(', ') : '',
        "proxyType": {'direct': 'none', 'system': 'system', 'auto_detect': 'autoDetect', 'fixed_servers': 'manual', 'pac_script': 'autoConfig'}[mode]
      };
      /*  */
      if (mode === 'fixed_servers') {
        const rules = value.rules;
        const url = ({host, port, scheme}) => {return host && port ? (scheme === "https" ? "https://" : '') + (host.trim().replace(/.*:\/\//, '') + ':' + port) : ''};
        if (rules.singleProxy.scheme.startsWith('socks')) {
          settings.http = settings.ssl = settings.ftp = '';
          settings.socks = url(rules.singleProxy);
        } else settings.ssl = settings.ftp = settings.http = url(rules.singleProxy);
      }
      /*  */
      return {"value": settings};
    },
    "from": ({value}) => {
      const config = {"value": {"remoteDNS": value.proxyDNS, "noPrompt": value.autoLogin}};
      config.value.mode = {'none': 'direct', 'system': 'system', 'autoDetect': 'auto_detect', 'manual': 'fixed_servers', 'autoConfig': 'pac_script'}[value.proxyType];
      if (value.proxyType === 'autoConfig' || value.proxyType === 'manual') config.value.rules = {};
      /*  */
      if (value.proxyType === 'autoConfig') config.value.pacScript = {"url": value.autoConfigUrl};
      else if (value.proxyType === 'manual') {
        config.value.rules.bypassList = value.passthrough ? value.passthrough.split(', ') : [];
        const type = url => {return value.socks ? 'socks' + value.socksVersion : (url.startsWith('https://') ? 'https' : 'http')};
        const parse = url => {
          const scheme = type(url);
          const [host, port] = url.split('://')[0].split(':');
          return {scheme, host, "port": Number(port)};
        };
        /*  */
        config.value.rules.singleProxy = parse(value.http || value.socks);
      }
      /*  */
      return config;
    }
  };
  /*  */
  chrome.proxy.settings.clear = (o, callback) => browser.proxy.settings.clear(o).then(callback);
  chrome.proxy.settings.get = (o, callback) => browser.proxy.settings.get(o).then(e => callback(chrome.proxy.convert.from(e)));
  chrome.proxy.settings.set = async(o, callback = function () {}) => {
    const settings = chrome.proxy.convert.to(o);
    await browser.proxy.settings.clear({});
    browser.proxy.settings.set(settings);
    callback();
  };
}
