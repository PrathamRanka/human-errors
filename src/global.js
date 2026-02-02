import { explainError } from "./explainError.js";

/**
 * Initializes a global error handler that intercepts uncaught exceptions
 * and unhandled rejections, printing a human-readable explanation before exiting.
 * 
 * @param {Object} [options] - Configuration options
 * @param {boolean} [options.exitOnException=true] - Whether to exit the process after an uncaught exception
 */
export function initGlobalErrors(options = { exitOnException: true }) {
  process.on("uncaughtException", (error) => {
    console.error(explainError(error));
    if (options.exitOnException) {
      process.exit(1);
    }
  });

  process.on("unhandledRejection", (reason) => {
    console.error(explainError(reason instanceof Error ? reason : new Error(String(reason))));
    if (options.exitOnException) {
        process.exit(1);
    }
  });
}
