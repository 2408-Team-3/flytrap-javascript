import axios from "axios";
import * as sourceMapSupport from "source-map-support/browser-source-map-support.js";
import { FlytrapError } from "./utils/FlytrapError";
import { LogData, RejectionValue } from "./types/types";
import { responseSchema } from "./types/schemas";
import { ZodError } from "zod";

sourceMapSupport.install();

class Flytrap {
  private projectId: string;
  private apiEndpoint: string;
  private apiKey: string;

  constructor(config: {
    projectId: string;
    apiEndpoint: string;
    apiKey: string;
  }) {
    this.projectId = config.projectId;
    this.apiEndpoint = config.apiEndpoint;
    this.apiKey = config.apiKey;
    this.setupGlobalErrorHandlers();
  }

  public captureException(e: Error): void {
    this.logError(e, true);
  }

  // * --- Private Methods --- * //
  private setupGlobalErrorHandlers(): void {
    window.addEventListener("error", (e: ErrorEvent) =>
      this.handleUncaughtException(e),
    );
    window.addEventListener("unhandledrejection", (e: PromiseRejectionEvent) =>
      this.handleUnhandledRejection(e),
    );
  }

  private handleUncaughtException(e: ErrorEvent): void {
    const { error } = e;
    this.logError(error, false);
  }

  private handleUnhandledRejection(e: PromiseRejectionEvent): void {
    const { reason } = e;

    if (reason instanceof Error) {
      this.logError(reason, false);
    } else {
      this.logRejection(reason, false);
    }
  }

  private async logError(error: Error, handled: boolean): Promise<void> {
    if (!error) return;

    const data: LogData = {
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack,
      },
      handled,
      timestamp: new Date().toISOString(),
      project_id: this.projectId,
    };

    try {
      const response = await axios.post(
        `${this.apiEndpoint}/api/errors`,
        { data },
        { headers: { "x-api-key": this.apiKey } },
      );

      responseSchema.parse(response);
      console.log("[flytrap]", response.status, response.data.message);
    } catch (e) {
      if (e instanceof ZodError) {
        console.error('[flytrap] Response validation error:', e.errors);
      } else {
        console.error('[flytrap] An error occured sending error data.',e);
      }
      
      throw new FlytrapError(
        'An error occurred logging error data.',
        e instanceof Error ? e : new Error(String(e)),
      );
    }
  }

  private async logRejection(
    value: RejectionValue,
    handled: boolean,
  ): Promise<void> {
    const data: LogData = {
      value,
      handled,
      timestamp: new Date().toISOString(),
      project_id: this.projectId,
    };

    try {
      const response = await axios.post(
        `${this.apiEndpoint}/api/errors`,
        { data },
        { headers: { "x-api-key": this.apiKey } },
      );

      responseSchema.parse(response);
      console.log("[flytrap]", response.status, response.data);
    } catch (e) {
      if (e instanceof ZodError) {
        console.error('[flytrap] Response validation error:', e.errors);
      } else {
        console.error('[error sdk] An error occurred sending rejection data.', e);
      }
      
      throw new FlytrapError(
        'An error occurred logging rejection data.',
        e instanceof Error ? e : new Error(String(e)),
      );
    }
  }
}

export default Flytrap;
