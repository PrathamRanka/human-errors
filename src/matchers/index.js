import { exactMatchers } from "./exact.js";
import { typeMatchers } from "./type.js";
import { fallbackMatcher } from "./fallback.js";
import { undefinedPropMatcher } from "./undefinedProp.js";
import { jsonParseMatcher } from "./jsonParse.js";
import { portInUseMatcher } from "./portInUse.js";
import { moduleNotFoundMatcher } from "./moduleNotFound.js";
import { unknownVariableMatcher } from "./unknownVariable.js";
import { permissionDeniedMatcher } from "./permissionDenied.js";
import { missingAwaitMatcher } from "./missingAwait.js";

export const matchers = [
  missingAwaitMatcher,
  permissionDeniedMatcher,
  moduleNotFoundMatcher,
  unknownVariableMatcher,
  undefinedPropMatcher,
  jsonParseMatcher,
  portInUseMatcher,
  ...exactMatchers,   
  ...typeMatchers,    
  fallbackMatcher     
];
