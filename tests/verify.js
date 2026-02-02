
import { explainError } from "../src/index.js";
import assert from "assert";

console.log("🔍 Starting Human-Errors Verification...\n");

let passed = 0;
let failed = 0;

function runTest(name, errorObj, context, expectedSnippets = []) {
  try {
    console.log(`Testing: ${name}`);
    const explanation = explainError(errorObj, context);
    
    // Check if checks pass
    let misses = [];
    for (const snippet of expectedSnippets) {
      if (!explanation.includes(snippet)) {
        misses.push(snippet);
      }
    }

    if (misses.length > 0) {
      console.error(`❌ Failed: ${name}`);
      console.error(`   Expected to find: ${misses.join(", ")}`);
      console.error(`   Got:\n${explanation}\n`);
      failed++;
    } else {
      console.log(`✅ Passed`);
      passed++;
    }
  } catch (e) {
    console.error(`❌ Exception in test: ${name}`, e);
    failed++;
  }
}

// 1. Missing Await (Context-based)
runTest(
  "Missing Await (Heuristic)", 
  new TypeError("Cannot read property 'then' of undefined"), 
  { user: Promise.resolve({ name: "John" }) }, 
  ["Missing Await?", "before an async function call"]
);

// 2. Permission Denied
const permsErr = new Error("EACCES: permission denied");
permsErr.code = "EACCES";
runTest(
  "Permission Denied",
  permsErr,
  {},
  ["Permission Denied", "sudo", "chown"]
);

// 3. Unknown Variable (Typo)
const refErr = new ReferenceError("usr is not defined");
runTest(
  "Unknown Variable / Typo",
  refErr,
  { user: "exists" },
  ["Unknown Variable", "Did you mean to use 'user'?"]
);

// 4. Module Not Found
const modErr = new Error("Cannot find module 'react'");
modErr.code = "MODULE_NOT_FOUND";
runTest(
  "Module Not Found",
  modErr,
  {},
  ["Missing Module", "npm install react"]
);

// 5. Multi-Cause Analysis (The Hybrid Beast)
// This error has BOTH EACCES code AND "Cannot find module" message.
const hybridErr = new Error("Cannot find module 'config.json'");
hybridErr.code = "EACCES"; 
runTest(
  "Multi-Cause Analysis",
  hybridErr,
  {},
  [
    "Missing Module", // Highest confidence title
    "Permission Denied", // From EACCES description or "tried to access"
    "npm install", // Module matching action
    "sudo"         // Permission matching action
  ]
);

console.log(`\nResults: ${passed} passed, ${failed} failed.`);
if (failed > 0) process.exit(1);
