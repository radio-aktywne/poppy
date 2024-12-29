import { components } from "../../../services/loris";

export type RequestPassthroughStreamInput = {
  codec: components["schemas"]["StreamRequestData"]["codec"];
  format: components["schemas"]["StreamRequestData"]["format"];
  srt: components["schemas"]["StreamRequestData"]["srt"];
  stun?: components["schemas"]["StreamRequestData"]["stun"];
};

export type RequestPassthroughStreamOutput = {
  port: components["schemas"]["StreamResponseData"]["port"];
  stun: components["schemas"]["StreamResponseData"]["stun"];
};
