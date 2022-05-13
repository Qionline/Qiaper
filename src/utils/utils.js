export function splitUrlDomain(url) {
    const reg = /^http[s]?:\/\/[^/]+/
    if (url.match(reg, "")) {
        return {
            domain: url.match(reg, "")[0],
            path: url.replace(reg, ""),
        }
    }
    return {
        domain: "",
        path: url
    }
}