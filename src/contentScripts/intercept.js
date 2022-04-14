/*global ah*/

const QIAPER_BLOCK_DATA = {
  mock_list: []
}

function handleMockData(url, { method }) {
  return new Promise((resolve, reject) => {
    // 稍后再替换这段代码
    console.log(`拦截请求 ${method} ${url}`)
    for (let idx = 0; idx < QIAPER_BLOCK_DATA.mock_list.length; idx++) {
      const el = QIAPER_BLOCK_DATA.mock_list[idx];
      if (method.toUpperCase() === el.method && url.split('?')[0] === el.url) {
        resolve(el.resp)
        return
      }
    }
    reject()
  })
}

// 重写xhr
ah.proxy({
  onRequest: (config, handler) =>
    handleMockData(config.url, config)
      .then(({ response }) => {
        return handler.resolve({
          config,
          status: 200,
          headers: [],
          response,
        })
      })
      .catch(() => handler.next(config)),
  onResponse: (response, handler) => {
    handler.resolve(response)
  },
})

// 重写 fetch
if (window.fetch) {
  const f = window.fetch
  window.fetch = function (req, config) {
    return handleMockData(req, config)
      .then(({ response }) => {
        return new Response(response, {
          headers: new Headers([]),
          status: 200,
        })
      })
      .catch(() => f(req, config))
  }
}

// 数据监听
window.addEventListener("message", function (event) {
  const { action, ...data } = event.data;

  // 更新 mock 列表
  if (action === 'UPDATE_MOCK_LIST') {
    console.log('list upload');
    QIAPER_BLOCK_DATA.mock_list = data.value;
  }

}, false);