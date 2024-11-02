import axios from "axios";
import * as sourceMapSupport from "source-map-support/browser-source-map-support.js";
import { FlytrapError } from "./utils/FlytrapError";

sourceMapSupport.install();

interface ErrorData {
  name: string;
  message: string;
  stack: string | undefined;
}

type RejectionValue = string | number | object | null;

interface LogData {
  error?: ErrorData;
  value?: RejectionValue;
  handled: boolean;
  timestamp: string;
  project_id: string;
}

class Flytrap {
  private projectId: string;
  private apiEndpoint: string;
  private publicApiKey: string;

  constructor(config: {
    projectId: string;
    apiEndpoint: string;
    publicKey: string;
  }) {
    this.projectId = config.projectId;
    this.apiEndpoint = config.apiEndpoint;
    this.publicApiKey = config.publicKey;
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
      const response = await axios.post(`${this.apiEndpoint}/api/errors`, {
        data,
      });
      console.log("[flytrap]", response.status, response.data.message);
    } catch (e) {
      console.error(e);
      throw new FlytrapError(
        "An error occured logging error data.",
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
      const response = await axios.post(`${this.apiEndpoint}/api/errors`, {
        data,
      });
      console.log("[flytrap]", response.status, response.data);
    } catch (e) {
      console.error(e);
      throw new FlytrapError(
        "An error occured logging error data.",
        e instanceof Error ? e : new Error(String(e)),
      );
    }
  }
}

export default Flytrap;
