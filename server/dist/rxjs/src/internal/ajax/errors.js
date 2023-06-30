import { getXHRResponse } from './getXHRResponse';
import { createErrorClass } from '../util/createErrorClass';
/**
 * Thrown when an error occurs during an AJAX request.
 * This is only exported because it is useful for checking to see if an error
 * is an `instanceof AjaxError`. DO NOT create new instances of `AjaxError` with
 * the constructor.
 *
 * @class AjaxError
 * @see {@link ajax}
 */
export const AjaxError = createErrorClass((_super) => function AjaxErrorImpl(message, xhr, request) {
    this.message = message;
    this.name = 'AjaxError';
    this.xhr = xhr;
    this.request = request;
    this.status = xhr.status;
    this.responseType = xhr.responseType;
    let response;
    try {
        // This can throw in IE, because we have to do a JSON.parse of
        // the response in some cases to get the expected response property.
        response = getXHRResponse(xhr);
    }
    catch (err) {
        response = xhr.responseText;
    }
    this.response = response;
});
/**
 * Thrown when an AJAX request times out. Not to be confused with {@link TimeoutError}.
 *
 * This is exported only because it is useful for checking to see if errors are an
 * `instanceof AjaxTimeoutError`. DO NOT use the constructor to create an instance of
 * this type.
 *
 * @class AjaxTimeoutError
 * @see {@link ajax}
 */
export const AjaxTimeoutError = (() => {
    function AjaxTimeoutErrorImpl(xhr, request) {
        AjaxError.call(this, 'ajax timeout', xhr, request);
        this.name = 'AjaxTimeoutError';
        return this;
    }
    AjaxTimeoutErrorImpl.prototype = Object.create(AjaxError.prototype);
    return AjaxTimeoutErrorImpl;
})();
