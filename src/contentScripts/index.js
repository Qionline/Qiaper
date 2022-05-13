/*global chrome*/
import { BASE_GLOBAL_SETTING } from '../utils/constant';
// const extensionGlobals = document.createElement('script')
// extensionGlobals.innerText = `window.QIAPER_EXTENTION_ID = "${chrome.runtime.id}";`
// document.documentElement.appendChild(extensionGlobals)

const interceptScript = document.createElement('script')
interceptScript.src = chrome.runtime.getURL('contentScripts/intercept.js')
document.documentElement.appendChild(interceptScript)

// 注入 mock list
interceptScript.addEventListener('load', async () => {
  const resList = await chrome.storage.local.get(["mockRequestList"])
  const resSetting = await chrome.storage.local.get(["appGlobalSetting"])
  const value = resList.mockRequestList ? JSON.parse(resList.mockRequestList) : []
  const global_setting = resSetting.appGlobalSetting ? JSON.parse(resSetting.appGlobalSetting) : BASE_GLOBAL_SETTING
  postMessage({ action: 'INIT_MOCK_DATA', value, global_setting });
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "UPDATE_MOCK_LIST") {
    postMessage({ action: 'UPDATE_MOCK_LIST', value: request.value });
  }
  else if (request.action === "GET_RESPONSE_DOC") {
    try {
      // 获取接口文档内容
      sendResponse({
        method: 'GET',
        url: '',
        resp: '{}',
        comment: ''
      })
    } catch (error) {
      sendResponse({
        method: 'GET',
        url: '',
        resp: '{}',
        comment: ''
      })
    }
  }
})

