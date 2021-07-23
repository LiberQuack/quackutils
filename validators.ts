import * as s from "superstruct";
import isEmail from "is-email";

export const emailValidator = s.define<string>("is-email", isEmail as s.Validator);
export const passwordValidator = s.size(s.string(), 8, Number.POSITIVE_INFINITY);