/*global chrome*/

const dev_methods = {
  ChromeSetLocalStorge: (key, value, cb) => {
    cb()
  },
  // 获取tab index (emun: main setting)
  ChromeGetTabIdx: cb => {
    cb("main")
  },
  // 获取是否处于创建页面 (emun: / /createRequest)
  ChromeGetPageIdx: cb => {
    cb('/')
  },
  // 获取新增request form data
  ChromeGetRequestFormData: cb => {
    cb({
      method: "GET",
      url: '/test',
      resp: '{}'
    })
  },
  // 获取mock request list
  ChromeGetMockRequestList: cb => {
    cb([{
      method: 'GET',
      url: '/test',
      resp: '{}'
    }])
  },
}

const prod_methods = {
  ChromeSetLocalStorge: (key, value, cb) => {
    const data = {}
    data[key] = value
    chrome.storage.local.set(data, function () {
      cb()
    })
  },
  ChromeSetMockRequestList: (val, cb) => {
    chrome.storage.local.set({ mockRequestList: val }, function () {
      cb()
      // 更新inrtercept数据
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "UPDATE_MOCK_LIST", value: JSON.parse(val) })
      })
    })
  },
  ChromeGetTabIdx: cb => {
    chrome.storage.local.get(["tab"], function (res) {
      cb(res.tab ? res.tab : "main")
    })
  },
  ChromeGetPageIdx: cb => {
    chrome.storage.local.get(["page"], function (res) {
      cb(res.page ? res.page : "/")
    })
  },
  ChromeGetRequestFormData: cb => {
    chrome.storage.local.get(["reqFormData"], function (res) {
      cb(res.reqFormData ? JSON.parse(res.reqFormData) : {
        method: "GET",
        url: '',
        resp: '{}'
      })
    })
  },
  ChromeGetMockRequestList: cb => {
    chrome.storage.local.get(["mockRequestList"], function (res) {
      cb(res.mockRequestList ? JSON.parse(res.mockRequestList) : [])
    })
  },
}

const Methods = process.env.REACT_APP_ENV === "dev" ? dev_methods : prod_methods

export default Methods

