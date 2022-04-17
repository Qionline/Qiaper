import { proxy } from "ajax-hook";

const QIAPER_BLOCK_DATA = {
  mock_list: [],
  isInit: false
}

function handleMockData(url, { method }) {
  return new Promise((resolve, reject) => {

    function sendMsg() {
      if (QIAPER_BLOCK_DATA.isInit) {
        // console.log(`拦截请求 ${method} ${url}`)
        for (let idx = 0; idx < QIAPER_BLOCK_DATA.mock_list.length; idx++) {
          const el = QIAPER_BLOCK_DATA.mock_list[idx];
          if (method.toUpperCase() === el.method && url.split('?')[0] === el.url) {
            resolve(el.resp)
            return
          }
        }
        reject()
        return
      }
      setTimeout(() => {
        sendMsg()
      }, 100);
    }

    if (!method) {
      reject()
    }

    sendMsg()
  })
}

// 重写xhr
proxy({
  onRequest: (config, handler) =>
    handleMockData(config.url, config)
      .then((response) => {
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
      .then((response) => {
        const headers = new Headers()
        headers.append('Content-Type', 'application/json; charset=utf-8');
        const stream = new ReadableStream({
          start(controller) {
            controller.enqueue(new TextEncoder().encode(response));
            controller.close();
          }
        });
        return new Response(stream, {
          headers: config.headers,
          status: 200,
        })
      })
      .catch((err) => {
        return f(req, config)
      })
  }
}

// 数据监听
window.addEventListener("message", function (event) {
  const { action, ...data } = event.data;

  // 更新 mock 列表
  if (action === 'UPDATE_MOCK_LIST') {
    QIAPER_BLOCK_DATA.mock_list = data.value;
    QIAPER_BLOCK_DATA.isInit = true;
  }

}, false);