// test.js
import { explainError } from "./src/index.js";

console.log("test.js running");

try {
  throw new Error("random failure");
} catch (e) {
  const result = explainError(e);
  console.log("TYPE:", typeof result);
  console.log(result);
}
