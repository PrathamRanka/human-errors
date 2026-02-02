import { exactMatchers } from "./exact.js";
import { typeMatchers } from "./type.js";
import { fallbackMatcher } from "./fallback.js";
import { undefinedPropMatcher } from "./undefinedProp.js";
import { jsonParseMatcher } from "./jsonParse.js";
import { portInUseMatcher } from "./portInUse.js";

export const matchers = [
  undefinedPropMatcher,
  jsonParseMatcher,
  portInUseMatcher,
  ...exactMatchers,   
  ...typeMatchers,    
  fallbackMatcher     
];
