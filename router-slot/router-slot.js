import { GLOBAL_ROUTER_EVENTS_TARGET, ROUTER_SLOT_TAG_NAME } from "./config.js";
import { addListener, constructAbsolutePath, dispatchGlobalRouterEvent, dispatchRouteChangeEvent, ensureAnchorHistory, ensureHistoryEvents, handleRedirect, isRedirectRoute, isResolverRoute, matchRoutes, pathWithoutBasePath, queryParentRouterSlot, removeListeners, resolvePageComponent, shouldNavigate } from "./util/index.js";
const template = document.createElement("template");
template.innerHTML = `<slot></slot>`;
// Patches the history object and ensures the correct events.
ensureHistoryEvents();
// Ensure the anchor tags uses the history API
ensureAnchorHistory();
/**
 * Slot for a node in the router tree.
 * @slot - Default content.
 * @event changestate - Dispatched when the router slot state changes.
 */
export class RouterSlot extends HTMLElement {
    /**
     * Hooks up the element.
     */
    constructor() {
        super();
        /**
         * Listeners on the router.
         */
        this.listeners = [];
        /**
         * The available routes.
         */
        this._routes = [];
        /**
         * The current path routeMatch.
         */
        this._routeMatch = null;
        this.idasd = Math.random();
        this.render = this.render.bind(this);
        // Attach the template
        const shadow = this.attachShadow({ mode: "open" });
        shadow.appendChild(template.content.cloneNode(true));
    }
    get routes() {
        return this._routes;
    }
    set routes(routes) {
        this.clear();
        this.add(routes);
    }
    get parent() {
        return this._parent;
    }
    set parent(router) {
        this.detachListeners();
        this._parent = router;
        this.attachListeners();
    }
    /**
     * The current route.
     */
    get route() {
        return this.match != null ? this.match.route : null;
    }
    /**
     * The current path fragment.
     */
    get fragments() {
        return this.match != null ? this.match.fragments : null;
    }
    get match() {
        return this._routeMatch;
    }
    /**
     * Whether the router is a root router.
     */
    get isRoot() {
        return this.parent == null;
    }
    /**
     * Query the parent router slot when the router slot is connected.
     */
    connectedCallback() {
        this.parent = this.queryParentRouterSlot();
    }
    /**
     * Tears down the element.
     */
    disconnectedCallback() {
        this.detachListeners();
    }
    /**
     * Queries the parent router.
     */
    queryParentRouterSlot() {
        return queryParentRouterSlot(this);
    }
    /**
     * Returns an absolute path relative to the router slot.
     * @param path
     */
    constructAbsolutePath(path) {
        return constructAbsolutePath(this, path);
    }
    /**
     * Adds routes to the router.
     * Navigates automatically if the router slot is the root and is connected.
     * @param routes
     * @param navigate
     */
    add(routes, navigate = this.isRoot && this.isConnected) {
        // Add the routes to the array
        this._routes.push(...routes);
        // Register that the path has changed so the correct route can be loaded.
        if (navigate) {
            this.render().then();
        }
    }
    /**
     * Removes all routes.
     */
    clear() {
        this._routes.length = 0;
    }
    /**
     * Each time the path changes, load the new path.
     */
    async render() {
        // Either choose the parent fragment or the current path if no parent exists.
        // The root router slot will always use the entire path.
        const pathFragment = this.parent != null && this.parent.fragments != null
            ? this.parent.fragments.rest
            : pathWithoutBasePath();
        // Route to the path
        await this.renderPath(pathFragment);
    }
    /**
     * Attaches listeners, either globally or on the parent router.
     */
    attachListeners() {
        // Add listeners that updates the route
        this.listeners.push(this.parent != null
            // Attach child router listeners
            ? addListener(this.parent, "changestate", this.render)
            // Add global listeners.
            : addListener(GLOBAL_ROUTER_EVENTS_TARGET, "changestate", this.render));
    }
    /**
     * Detaches the listeners.
     */
    detachListeners() {
        removeListeners(this.listeners);
    }
    /**
     * Loads a new path based on the routes.
     * Returns true if a navigation was made to a new page.
     */
    async renderPath(path) {
        // Find the corresponding route.
        const match = matchRoutes(this._routes, path);
        // Ensure that a route was found, otherwise we just clear the current state of the route.
        if (match == null) {
            this._routeMatch = null;
            return false;
        }
        const { route } = match;
        const info = { match, slot: this };
        try {
            // Only change route if its a new route.
            const navigate = shouldNavigate(this.match, match);
            if (navigate) {
                // Listen for another push state event. If another push state event happens
                // while we are about to navigate we have to cancel.
                let navigationInvalidated = false;
                const cancelNavigation = () => navigationInvalidated = true;
                const cleanup = addListener(GLOBAL_ROUTER_EVENTS_TARGET, "changestate", cancelNavigation, { once: true });
                // Cleans up and dispatches a global event that a navigation was cancelled.
                const cancel = () => {
                    cleanup();
                    dispatchGlobalRouterEvent("navigationcancel", info);
                    return false;
                };
                // Dispatch globally that a navigation has started
                dispatchGlobalRouterEvent("navigationstart", info);
                // Check whether the guards allow us to go to the new route.
                if (route.guards != null) {
                    for (const guard of route.guards) {
                        if (!(await guard(info))) {
                            return cancel();
                        }
                    }
                }
                // Redirect if necessary
                if (isRedirectRoute(route)) {
                    cleanup();
                    handleRedirect(this, route);
                    return false;
                }
                // Handle custom resolving if necessary
                else if (isResolverRoute(route)) {
                    // The resolve will handle the rest of the navigation. This includes whether or not the navigation
                    // should be cancelled. If the resolve function returns false we cancel the navigation.
                    if ((await route.resolve(info)) === false) {
                        return cancel();
                    }
                }
                // If the component provided is a function (and not a class) call the function to get the promise.
                else {
                    const page = await resolvePageComponent(route, info);
                    // Cancel the navigation if another navigation event was sent while this one was loading
                    if (navigationInvalidated) {
                        return cancel();
                    }
                    // Remove the old page by clearing the slot
                    while (this.firstChild != null) {
                        this.firstChild.parentNode.removeChild(this.firstChild);
                    }
                    // Append the new page
                    this.appendChild(page);
                }
                // Remember to cleanup after the navigation
                cleanup();
            }
            // Store the new route match.
            this._routeMatch = match;
            // Always dispatch the route change event to notify the children that something happened.
            // This is because the child routes might have to change routes further down the tree.
            // The event is dispatched in an animation frame to allow route children to make the initial
            // render first and hook up the new router slot.
            requestAnimationFrame(() => {
                dispatchRouteChangeEvent(this, info);
            });
            // Dispatch globally that a navigation has ended.
            if (navigate) {
                dispatchGlobalRouterEvent("navigationsuccess", info);
                dispatchGlobalRouterEvent("navigationend", info);
            }
            return navigate;
        }
        catch (e) {
            dispatchGlobalRouterEvent("navigationerror", info);
            dispatchGlobalRouterEvent("navigationend", info);
            throw e;
        }
    }
}
window.customElements.define(ROUTER_SLOT_TAG_NAME, RouterSlot);
//# sourceMappingURL=router-slot.js.map
