# human-errors ODBA

**Errors for Humans, not Robots.**  
Instantly translate cryptic Node.js errors into simple, actionable explanations with specific "Try this" fixes.

![License](https://img.shields.io/npm/l/human-errors) ![Version](https://img.shields.io/npm/v/human-errors?style=flat-square) ![Stars](https://img.shields.io/github/stars/human-errors?style=social)

---

## Why?

Node.js errors are often technical and unhelpful.

**Before:**

```
Error: MODULE_NOT_FOUND
Error: Cannot find module 'axios'
```

**After `human-errors`:**

```
Missing Module

What happened
Node.js could not find 'axios'.

Likely causes
• The package is not installed
• The path to the file is incorrect

Try this
• Run 'npm install axios'
• Check your package.json dependencies
```

---

## Installation

```bash
npm install human-errors
```

## Usage

Just wrap your error logging with `explainError`.

```javascript
import { explainError } from "human-errors";

try {
  await doSomethingRisky();
} catch (err) {
  // Pass the error object
  console.log(explainError(err));

  // OPTIONAL: Pass context for smarter suggestions (like typo detection)
  // console.log(explainError(err, { userObject, config }));
}
```

## Features

### 🚀 Smart Fixes

- **Missing Dependencies**: Tells you exactly what to `npm install`.
- **Typos**: "Variable `usr` not defined" → "Did you mean `user`?" (fuzzy matching).
- **Missing Await**: Detects when you try to access properties of a Promise that wasn't awaited.
- **Multi-Cause Analysis**: If an error is ambiguous, it combines insights from multiple patterns to cover all bases.
- **JSON Errors**: Explains _why_ your JSON failed (trailing commas, missing quotes).
- **Common Bugs**: Handles `EADDRINUSE`, `EACCES`, `undefined` properties, and more.

### 🎨 Beautiful Output

- Minimal ANSI coloring (Red titles, Green fixes).
- Automatically falls back to plain text if color is not supported.

### 🛡️ Crash-Proof

- Guaranteed to **never** throw an error itself.
- Validates inputs so your error handler doesn't cause _more_ errors.

## Supported Errors (Partial List)

- `MODULE_NOT_FOUND`: Import errors.
- `ReferenceError`: Typos and scope issues.
- `SyntaxError`: Specifically for JSON.parse.
- `EADDRINUSE`: Port conflicts.
- `EACCES` / `EPERM`: Permission issues.
- `TypeError`: Undefined properties (e.g., trying to `.map` undefined).

---

## Contributing

We want to cover every painful error in the Node.js ecosystem. PRs are welcome!
