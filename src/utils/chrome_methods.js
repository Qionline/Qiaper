/*global chrome*/

const dev_methods = {
  ChromeSetLocalStorge: (key, value, cb) => {
    cb()
  },
  // 设置mock list
  ChromeSetMockRequestList: (val, cb) => {
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
  ChromeSetLocalStorge: async (key, value, cb) => {
    const data = {}
    data[key] = value
    await chrome.storage.local.set(data)
    cb()
  },
  // 设置mock list
  ChromeSetMockRequestList: async (val, cb) => {
    await chrome.storage.local.set({ mockRequestList: val })
    cb()
    // 更新inrtercept数据
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true })
    chrome.tabs.sendMessage(tabs[0].id, { action: "UPDATE_MOCK_LIST", value: JSON.parse(val) })
  },
  // 获取tab index (emun: main setting)
  ChromeGetTabIdx: async cb => {
    const res = await chrome.storage.local.get(["tab"])
    cb(res.tab ? res.tab : "main")
  },
  // 获取是否处于创建页面 (emun: / /createRequest)
  ChromeGetPageIdx: async cb => {
    const res = await chrome.storage.local.get(["page"])
    cb(res.page ? res.page : "/")
  },
  // 获取新增request form data
  ChromeGetRequestFormData: async cb => {
    const res = await chrome.storage.local.get(["reqFormData"])
    cb(res.reqFormData ? JSON.parse(res.reqFormData) : {
      method: "GET",
      url: '',
      resp: '{}'
    })
  },
  // 获取mock request list
  ChromeGetMockRequestList: async cb => {
    const res = await chrome.storage.local.get(["mockRequestList"])
    cb(res.mockRequestList ? JSON.parse(res.mockRequestList) : [])
  },
}

const Methods = process.env.REACT_APP_ENV === "dev" ? dev_methods : prod_methods

export default Methods

