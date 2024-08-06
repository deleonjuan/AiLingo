import { type CoreMessage } from "ai";

export interface IControllerProps {
  messages?: CoreMessage[] | undefined;
  headers?: any;
}
