/**
 * Evaluates an expression with undefined-safety.
 *
 * If the expression evaluates successfully, its result will be returned.
 *
 * If the expression fails due to a {@link TypeError} (such as when a property or method is missing or undefined) or the
 * expression evaluates to undefined, a default value will be returned. If not specified, this will be undefined.
 *
 * If an exception occurs which is not a {@link TypeError}, it will be rethrown normally.
 *
 * @param exp An expression to evaluate.
 * @param defaultVal Default value to return.
 */
export function safe<T>(exp: () => T, defaultVal?: T): T|undefined {
    try {
        const result: T = exp(); // expression resolved successfully, nothing to worry about here
        if (typeof result === "undefined") {
            return defaultVal;
        } else {
            return result;
        }
    } catch (ex) { // expression failed
        if ("constructor" in ex &&
                "name" in ex.constructor &&
                ex.constructor.name === "TypeError") { // missing param or invalid param, return undefined
            return defaultVal;
        } else { // error was some other valid error, throw that for the expression
            throw ex;
        }
    }
}
