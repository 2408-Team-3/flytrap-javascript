import { init } from "./config";
import { captureException } from "./logger/captureException";
import { FlytrapError } from "./utils/FlytrapError";

const flytrap = {
  init,
  captureException,
  FlytrapError,
}

export default flytrap;