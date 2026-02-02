# error-overflow

![License](https://img.shields.io/npm/l/error-overflow) ![Version](https://img.shields.io/npm/v/error-overflow?style=flat-square) ![Stars](https://img.shields.io/github/stars/human-errors?style=social)

**Errors for Humans, not Robots.**  
A lightweight (zero-dependency) library that instantly translates cryptic Node.js errors into simple, actionable explanations with specific "Try this" fixes.

---

## What is this?

`error-overflow` intercepts raw Node.js errors—like `MODULE_NOT_FOUND` or confusing `undefined` ValueErrors—and converts them into a beautiful, structured report that tells you **what happened**, **property causes**, and **how to fix it**.

## Why should I care?

Because stack traces are focused on _where_ code broke, not _how_ to fix it.

**Before:**

```text
Error: MODULE_NOT_FOUND
Error: Cannot find module 'axios'
```

**After `error-overflow`:**

```text
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
npm install error-overflow
```

## How do I use it in 30 seconds?

Just wrap your error logging with `explainError`.

```javascript
import { explainError } from "error-overflow";

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
- **Multi-Cause Analysis**: If an error is ambiguous, it combines insights from multiple patterns to cover all bases.
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
