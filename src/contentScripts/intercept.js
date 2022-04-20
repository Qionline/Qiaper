import { proxy } from "ajax-hook";

const QIAPER_BLOCK_DATA = {
  global_setting: {
    mock: true
  },
  mock_list: [],
  is_init: false,
}

function handleMockData(url, { method }) {
  return new Promise((resolve, reject) => {

    function sendMsg() {
      if (QIAPER_BLOCK_DATA.is_init) {
        console.log(`拦截请求 ${method} ${url}`)
        if (!QIAPER_BLOCK_DATA.global_setting.mock) {
          reject()
          return
        }
        for (let idx = 0; idx < QIAPER_BLOCK_DATA.mock_list.length; idx++) {
          const el = QIAPER_BLOCK_DATA.mock_list[idx];
          if (el.mock && method.toUpperCase() === el.method && url.split('?')[0] === el.url) {
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

const QIAPER_BLOCK_REQUEST = {
  baseFetch: window.fetch,
  baseXHR: window.XMLHttpRequest,

  setXhr() {
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
  },
  setFetch() {
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
  }
}

QIAPER_BLOCK_REQUEST.setXhr()

QIAPER_BLOCK_REQUEST.setFetch()

// 数据监听
window.addEventListener("message", function (event) {
  const { action, ...data } = event.data;
  // 初始化
  if (action === 'INIT_MOCK_DATA') {
    // 未开启全局mock，则注销xhr、fetch
    if (!data?.global_setting?.mock) {
      QIAPER_BLOCK_DATA.global_setting = data.global_setting;
      window.fetch = QIAPER_BLOCK_REQUEST.baseFetch
      window.XMLHttpRequest = QIAPER_BLOCK_REQUEST.baseXHR
    }
    QIAPER_BLOCK_DATA.mock_list = data.value;
    QIAPER_BLOCK_DATA.is_init = true;
  }
  // 更新 mock 列表
  else if (action === 'UPDATE_MOCK_LIST') {
    QIAPER_BLOCK_DATA.mock_list = data.value;
  }

}, false);