export function splitUrlDomain(url) {
    const reg = /^http[s]?:\/\/[^/]+/
    if (url.match(reg, "")) {
        return [
            url.match(reg, "")[0],
            url.replace(reg, ""),
        ]
    }
    return [
        "",
        url
    ]
}