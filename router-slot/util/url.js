const $anchor = document.createElement("a");
/**
 * The current path of the location.
 * As default slashes are included at the start and end.
 * @param options
 */
export function path(options = {}) {
    return slashify(window.location.pathname, options);
}
/**
 * Returns the path without the base path.
 * @param options
 */
export function pathWithoutBasePath(options = {}) {
    return slashify(stripStart(path(), basePath()), options);
}
/**
 * Returns the base path as defined in the <base> tag in the head in a reliable way.
 * If eg. <base href="/web-router/"> is defined this function will return "/web-router/".
 *
 * An alternative would be to use regex on document.baseURI,
 * but that will be unreliable in some cases because it
 * doesn't use the built in HTMLHyperlinkElementUtils.
 *
 * To make this method more performant we could cache the anchor element.
 * As default it will return the base path with slashes in front and at the end.
 */
export function basePath(options = {}) {
    return constructPathWithBasePath(".", options);
}
/**
 * Creates an URL using the built in HTMLHyperlinkElementUtils.
 * An alternative would be to use regex on document.baseURI,
 * but that will be unreliable in some cases because it
 * doesn't use the built in HTMLHyperlinkElementUtils.
 *
 * As default it will return the base path with slashes in front and at the end.
 * @param path
 * @param options
 */
export function constructPathWithBasePath(path, options = {}) {
    $anchor.href = path;
    return slashify($anchor.pathname, options);
}
/**
 * Removes the start of the path that matches the part.
 * @param path
 * @param part
 */
export function stripStart(path, part) {
    return path.replace(new RegExp(`^${part}`), "");
}
/**
 * Returns the query string.
 */
export function queryString() {
    return window.location.search;
}
/**
 * Returns the params for the current path.
 * @returns Params
 */
export function query() {
    return toQuery(queryString().substr(1));
}
/**
 * Strips the slash from the start and end of a path.
 * @param path
 */
export function stripSlash(path) {
    return slashify(path, { start: false, end: false });
}
/**
 * Ensures the path starts and ends with a slash
 * @param path
 */
export function ensureSlash(path) {
    return slashify(path, { start: true, end: true });
}
/**
 * Makes sure that the start and end slashes are present or not depending on the options.
 * @param path
 * @param start
 * @param end
 */
export function slashify(path, { start = true, end = true } = {}) {
    path = start && !path.startsWith("/") ? `/${path}` : (!start && path.startsWith("/") ? path.slice(1) : path);
    return end && !path.endsWith("/") ? `${path}/` : (!end && path.endsWith("/") ? path.slice(0, path.length - 1) : path);
}
/**
 * Turns a query string into an object.
 * @param {string} queryString (example: ("test=123&hejsa=LOL&wuhuu"))
 * @returns {Query}
 */
export function toQuery(queryString) {
    // If the query does not contain anything, return an empty object.
    if (queryString.length === 0) {
        return {};
    }
    // Grab the atoms (["test=123", "hejsa=LOL", "wuhuu"])
    const atoms = queryString.split("&");
    // Split by the values ([["test", "123"], ["hejsa", "LOL"], ["wuhuu"]])
    const arrayMap = atoms.map(atom => atom.split("="));
    // Assign the values to an object ({ test: "123", hejsa: "LOL", wuhuu: "" })
    return Object.assign({}, ...arrayMap.map(arr => ({
        [decodeURIComponent(arr[0])]: (arr.length > 1 ? decodeURIComponent(arr[1]) : "")
    })));
}
/**
 * Turns a query object into a string query.
 * @param query
 */
export function toQueryString(query) {
    return Object.entries(query)
        .map(([key, value]) => `${key}${value != "" ? `=${encodeURIComponent(value)}` : ""}`)
        .join("&");
}
//# sourceMappingURL=url.js.map