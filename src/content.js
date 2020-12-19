const script = document.createElement('script');
script.setAttribute("type", "module");
// eslint-disable-next-line no-undef
script.setAttribute("src", chrome.extension.getURL('main.js'));
document.head.appendChild(script);