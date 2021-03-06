import { ISlashOptions, Query } from "../model";
/**
 * The current path of the location.
 * As default slashes are included at the start and end.
 * @param options
 */
export declare function path(options?: Partial<ISlashOptions>): string;
/**
 * Returns the path without the base path.
 * @param options
 */
export declare function pathWithoutBasePath(options?: Partial<ISlashOptions>): string;
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
export declare function basePath(options?: Partial<ISlashOptions>): string;
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
export declare function constructPathWithBasePath(path: string, options?: Partial<ISlashOptions>): string;
/**
 * Removes the start of the path that matches the part.
 * @param path
 * @param part
 */
export declare function stripStart(path: string, part: string): string;
/**
 * Returns the query string.
 */
export declare function queryString(): string;
/**
 * Returns the params for the current path.
 * @returns Params
 */
export declare function query(): Query;
/**
 * Strips the slash from the start and end of a path.
 * @param path
 */
export declare function stripSlash(path: string): string;
/**
 * Ensures the path starts and ends with a slash
 * @param path
 */
export declare function ensureSlash(path: string): string;
/**
 * Makes sure that the start and end slashes are present or not depending on the options.
 * @param path
 * @param start
 * @param end
 */
export declare function slashify(path: string, { start, end }?: Partial<ISlashOptions>): string;
/**
 * Turns a query string into an object.
 * @param {string} queryString (example: ("test=123&hejsa=LOL&wuhuu"))
 * @returns {Query}
 */
export declare function toQuery(queryString: string): Query;
/**
 * Turns a query object into a string query.
 * @param query
 */
export declare function toQueryString(query: Query): string;
