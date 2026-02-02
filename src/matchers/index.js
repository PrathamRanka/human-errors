import { exactMatchers } from "./exact.js";
import { typeMatchers } from "./type.js";
import { fallbackMatcher } from "./fallback.js";
import { undefinedPropMatcher } from "./undefinedProp.js";
import { jsonParseMatcher } from "./jsonParse.js";
import { portInUseMatcher } from "./portInUse.js";
import { moduleNotFoundMatcher } from "./moduleNotFound.js";
import { unknownVariableMatcher } from "./unknownVariable.js";

export const matchers = [
  moduleNotFoundMatcher,
  unknownVariableMatcher,
  undefinedPropMatcher,
  jsonParseMatcher,
  portInUseMatcher,
  ...exactMatchers,   
  ...typeMatchers,    
  fallbackMatcher     
];
