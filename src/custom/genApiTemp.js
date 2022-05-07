import { splitUrlDomain } from '@/utils/utils';

const getTemplate = function (path, comment) {
    let str = ''
    if (comment) str += `// ${comment}\n`
    str +=
        `export function ${path.slice(1).replace(/\//g, '_')}(params) {
    return http({
        url: '${path}',
        method: 'get',
        params
    })
}`
    return str
}

const postTemplate = function (path, comment) {
    let str = ''
    if (comment) str += `// ${comment}\n`
    str +=
        `export function ${path.slice(1).replace(/\//g, '_')}(data) {
    return http({
        url: '${path}',
        method: 'post',
        data
    })
}`
    return str
}

/**
 * @param mockItem
 * @returns {String}
*/
export default function (mockItem) {
    const { url, method, resp, comment } = mockItem
    const [domain, path] = splitUrlDomain(url)
    return method === "GET" ? getTemplate(path, comment) : postTemplate(path, comment)
}
