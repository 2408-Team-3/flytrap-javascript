import { logError } from "../logger/logError";
import { logRejection } from "../logger/logRejection";
import { FlytrapError } from "../utils/FlytrapError";

let globalHandlersSet: boolean = false;

export const setUpGlobalErrorHandlers = (): void => {
  if (globalHandlersSet) return;
  globalHandlersSet = true;

  window.addEventListener("error", async (e: ErrorEvent) => {
    const { error } = e;
    if (e.error instanceof FlytrapError) return;
    await logError(error, false);
    // throw error;
  });

  window.addEventListener(
    "unhandledrejection",
    async (e: PromiseRejectionEvent) => {
      const { reason } = e;

      if (reason instanceof Error) {
        if (reason instanceof FlytrapError) return;
        await logError(reason, false);
      } else {
        await logRejection(reason, false);
      }

      // exit???
    },
  );
};
