import * as sourceMapSupport from 'source-map-support/browser-source-map-support.js';
sourceMapSupport.install();

class Flytrap {
  private projectId: string;
  private apiEndpoint: string;
  private publicApiKey: string;

  constructor(config: { projectId: string; apiEndpoint: string; publicKey: string }) {
    this.projectId = config.projectId;
    this.apiEndpoint = config.apiEndpoint;
    this.publicApiKey = config.publicKey;
  }

  // * --- Private Methods --- * //
  private setupGlobalErrorHandlers(): void {
    window.addEventListener('error', (e: ErrorEvent) => this.handleUncaughtException(e));
    window.addEventListener('unhandledrejection', (e: PromiseRejectionEvent) => this.handleUnhandledRejection(e));
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


}