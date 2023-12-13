/**
 * Error class for JuiceHooks.
 *
 * @class JuiceHooksError
 * @extends {Error}
 * @param {string} message - Error message.
 * @param {Error} [error] - Internal error. The internal SDK error that caused
 * this error. This is intended for debugging.
 * @param {string} [origin] - Origin of the error. The name of the function that
 * caused this error.
 * @param {string} [clientMessage] - Client message. The message to show to the
 * user. This is intended for the UI.
 *
 * @example
 * ```ts
 * throw new JuiceHooksError("Something went wrong", error, "usePayEthPaymentTerminal");
 * ```
 */
export class JuiceHooksError extends Error {
  public internalError: Error | undefined;
  public _origin: string | undefined;
  public clientMessage: string | undefined;

  constructor(
    message: string,
    error?: Error,
    origin?: string,
    clientMessage?: string
  ) {
    super(message);
    this.name = "JuiceHooksError";
    this.internalError = error;
    this._origin = origin;
    this.clientMessage = clientMessage ?? message;
  }
}
