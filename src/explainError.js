// src/explainError.js

import { analyzeError } from "./analyzer.js";
import { matchers } from "./matchers/index.js";
import { formatExplanation } from "./formatter.js";

export function explainError(error, context = {}) {
  const err = error instanceof Error ? error : new Error(String(error));
  const analysis = analyzeError(err, context);

  for (const matcher of matchers) {
    try {
      if (typeof matcher.match === 'function' && matcher.match(analysis)) {
        const explanation = typeof matcher.explain === 'function' ? matcher.explain(analysis) : {};
        if (explanation && typeof explanation === 'object') {
          explanation.confidence = analysis.confidence;
        }
        return formatExplanation(explanation, err);
      }
    } catch (e) {
      // ignore matcher errors and continue to fallback
    }
  }

  return formatExplanation(
    {
      title: "Unrecognized error",
      happened: "An unexpected error occurred.",
      causes: [
        "The error did not match known patterns",
        "Custom application logic failed"
      ],
      actions: [
        "Check the stack trace",
        "Log inputs before this error",
        "Add defensive checks"
      ],
      confidence: 10
    },
    err
  );
}
