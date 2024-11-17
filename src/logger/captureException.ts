import { logError } from './logError';

export const captureException = (error: Error, handled: boolean = true): void => {
  if (!error) return;
  logError(error, handled);
}
