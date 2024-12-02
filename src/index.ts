/**
 * Entry point for the Flytrap SDK.
 * Provides initialization, error handling, and logging utilities.
 */
import { init } from "./config";
import { captureException } from "./logger/captureException";
import { FlytrapError } from "./utils/FlytrapError";

/**
 * Flytrap SDK main object.
 * - `init`: Initializes the SDK with the required configuration.
 * - `captureException`: Captures and logs exceptions for monitoring.
 * - `FlytrapError`: Custom error class for SDK-related issues.
 */
const flytrap = {
  init,
  captureException,
  FlytrapError,
};

export default flytrap;
