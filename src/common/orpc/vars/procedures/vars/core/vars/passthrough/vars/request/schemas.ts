import {
  StreamStreamRequestSchema,
  StreamStreamResponseSchema,
} from "../../../../../../../../../apis/loris/schemas";

export const Schemas = {
  Input: StreamStreamRequestSchema.shape.body,
  Output: StreamStreamResponseSchema,
};
