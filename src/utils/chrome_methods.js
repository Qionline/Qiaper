/*global chrome*/

// request json temp
const BASE_REQUEST_FORM = {
  method: "GET",
  url: '',
  resp: '{}',
  mock: false
}
// setting json temp
const BASE_GLOBAL_SETTING = {
  mock: true
}

const dev_methods = {
  ChromeSetLocalStorge: (key, value, cb) => {
    cb()
  },
  // 设置mock list
  ChromeSetMockRequestList: (val, cb) => {
    cb()
  },
  // 设置global setting item
  ChromeSetGlobalSetting: (key, val, cb) => {
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
    cb(BASE_REQUEST_FORM)
  },
  // 获取mock request list
  ChromeGetMockRequestList: cb => {
    cb([{
      method: 'GET',
      url: '/test',
      resp: '{}',
      mock: true
    }])
  },
  // 获取配置
  ChromeGetAppGlobalSetting: cb => {
    cb(BASE_GLOBAL_SETTING)
  }
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
  // 设置global setting item
  ChromeSetGlobalSetting: async (key, val, cb) => {
    const res = await chrome.storage.local.get(["appGlobalSetting"])
    const setting = res.appSetting ? JSON.parse(res.appSetting) : BASE_GLOBAL_SETTING
    setting[key] = val
    await chrome.storage.local.set({ appGlobalSetting: JSON.stringify(setting) })
    cb()
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
    cb(res.reqFormData ? JSON.parse(res.reqFormData) : BASE_REQUEST_FORM)
  },
  // 获取mock request list
  ChromeGetMockRequestList: async cb => {
    const res = await chrome.storage.local.get(["mockRequestList"])
    cb(res.mockRequestList ? JSON.parse(res.mockRequestList) : [])
  },
  // 获取配置
  ChromeGetAppGlobalSetting: async cb => {
    const res = await chrome.storage.local.get(["appGlobalSetting"])
    cb(res.appSetting ? JSON.parse(res.appSetting) : BASE_GLOBAL_SETTING)
  },
}

const Methods = process.env.REACT_APP_ENV === "dev" ? dev_methods : prod_methods

export default Methods

