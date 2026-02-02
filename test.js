import { explainError } from "./src/index.js";

try {
  throw new Error("random failure");
} catch (e) {
  const result = explainError(e);
  console.log(result);
}
