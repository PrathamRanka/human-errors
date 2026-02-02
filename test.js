import { explainError } from "./src/index.js";

try {
  const err = new Error("connect ECONNREFUSED 127.0.0.1:5432");
  err.code = "ECONNREFUSED";
  throw err;
} catch (e) {
  console.log(explainError(e));
}
