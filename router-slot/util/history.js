import { GLOBAL_ROUTER_EVENTS_TARGET, HISTORY_PATCH_NATIVE_KEY } from "../config.js";
import { dispatchGlobalRouterEvent } from "./events.js";
// Mapping a history functions to the events they are going to dispatch.
export const historyPatches = [
    ["pushState", ["pushstate", "changestate"]],
    ["replaceState", ["replacestate", "changestate"]],
    ["forward", ["pushstate", "changestate"]],
    ["go", ["pushstate", "changestate"]],
    // We need to handle the popstate a little differently when it comes to the change state event.
    ["back", ["popstate"]],
];
/**
 * Patches the history object by ensuring correct events are dispatches when the history changes.
 */
export function ensureHistoryEvents() {
    for (const [name, events] of historyPatches) {
        for (const event of events) {
            attachCallback(history, name, () => dispatchGlobalRouterEvent(event));
        }
    }
    // The popstate is the only event natively dispatched when using the hardware buttons.
    // Therefore we need to handle this case a little different. To ensure the changestate event
    // is fired also when the hardware back button is used, we make sure to listen for the popstate
    // event and dispatch a change state event right after. The reason for the setTimeout is because we
    // want the popstate event to bubble up before the changestate event is dispatched.
    window.addEventListener("popstate", (e) => {
        // Check if the state should be allowed to change
        if (shouldCancelChangeState()) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }
        // Dispatch the global router event to change the routes after the popstate has bubbled up
        setTimeout(() => dispatchGlobalRouterEvent("changestate"), 0);
    });
}
/**
 * Attaches a callback after the function on the object has been invoked.
 * Stores the original function at the _name.
 * @param obj
 * @param name
 * @param cb
 */
export function attachCallback(obj, name, cb) {
    const func = obj[name];
    saveNativeFunction(obj, name, func);
    obj[name] = (...args) => {
        // Check if the state should be allowed to change
        if (shouldCancelChangeState())
            return;
        // Navigate
        func.apply(obj, args);
        cb(args);
    };
}
/**
 * Saves the native function on the history object.
 * @param obj
 * @param name
 * @param func
 */
export function saveNativeFunction(obj, name, func) {
    // Ensure that the native object exists.
    if (obj[HISTORY_PATCH_NATIVE_KEY] == null) {
        obj[HISTORY_PATCH_NATIVE_KEY] = {};
    }
    // Save the native function.
    obj[HISTORY_PATCH_NATIVE_KEY][`${name}`] = func.bind(obj);
}
/**
 * Dispatches and event and returns whether the state change should be cancelled.
 * The state will be considered as cancelled if the "willChangeState" event was cancelled.
 */
function shouldCancelChangeState() {
    return !GLOBAL_ROUTER_EVENTS_TARGET.dispatchEvent(new CustomEvent("willchangestate", { cancelable: true }));
}
//# sourceMappingURL=history.js.map
