# human-errors

![License](https://img.shields.io/npm/l/human-errors) ![Version](https://img.shields.io/npm/v/human-errors?style=flat-square) ![Stars](https://img.shields.io/github/stars/human-errors?style=social)

## What is this?

**Errors for Humans, not Robots.**  
A lightweight library that instantly translates cryptic Node.js errors into simple, actionable explanations with specific "Try this" fixes.

## Why should I care?

Node.js errors are often technical and unhelpful. `human-errors` fixes that.

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

## How do I install it?

```bash
npm install human-errors
```

## How do I use it in 30 seconds?

Just wrap your error logging with `explainError`.

```javascript
import { explainError } from "human-errors";

try {
  await doSomethingRisky();
} catch (err) {
  // 1. Pass the error object
  console.log(explainError(err));

  // 2. (Optional) Pass context for smarter suggestions (like typo detection)
  // console.log(explainError(err, { userObject, config }));
}
```

## What exactly does it expose?

It exports a single main function `explainError(error, context)` that runs your error through a suite of specific matchers:

- **Missing Dependencies**: Tells you exactly what to `npm install`.
- **Typos**: "Variable `usr` not defined" → "Did you mean `user`?" (fuzzy matching).
- **Missing Await**: Detects when you try to access properties of a Promise that wasn't awaited.
- **Multi-Cause Analysis**: If an error is ambiguous, it combines insights from multiple patterns.
- **JSON Errors**: Explains _why_ your JSON failed (trailing commas, missing quotes).
- **Common Bugs**: Handles `EADDRINUSE`, `EACCES`, `undefined` properties, and more.

## Will it break my app?

**No.** It is designed to be **safe and crash-proof**:

- It guarantees to **never** throw an error itself.
- If it fails to match an error, it falls back to a safe "Unrecognized error" generic message.
- It validates inputs so your error handler doesn't cause _more_ errors.

## Can I contribute?

Yes! We want to cover every painful error in the Node.js ecosystem. PRs are welcome.

## Is this maintained?

Yes. This project is actively maintained.
