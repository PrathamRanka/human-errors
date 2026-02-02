import { exactMatchers } from "./exact.js";
import { typeMatchers } from "./type.js";
import { fallbackMatcher } from "./fallback.js";

export const matchers = [
  ...exactMatchers,   
  ...typeMatchers,    
  fallbackMatcher     
];
