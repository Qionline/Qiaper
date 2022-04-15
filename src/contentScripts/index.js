/*global chrome*/

// const extensionGlobals = document.createElement('script')
// extensionGlobals.innerText = `window.QIAPER_EXTENTION_ID = "${chrome.runtime.id}";`
// document.documentElement.appendChild(extensionGlobals)

const interceptScript = document.createElement('script')
interceptScript.src = chrome.runtime.getURL('contentScripts/intercept.js')
document.documentElement.appendChild(interceptScript)

// 注入 mock list
interceptScript.addEventListener('load', () => {
  chrome.storage.local.get(["mockRequestList"], function (res) {
    const value = res.mockRequestList ? JSON.parse(res.mockRequestList) : []
    postMessage({ action: 'UPDATE_MOCK_LIST', value });
  })
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "UPDATE_MOCK_LIST") {
    postMessage({ action: 'UPDATE_MOCK_LIST', value: request.value });
  }
})

