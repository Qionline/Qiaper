/*global chrome*/
chrome.runtime.onMessage.addListener(msg => {
    if (msg.type === 'ajaxInterceptor' && msg.to === 'background') {

    }
});