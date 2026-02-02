import { analyzeError } from "./analyzer.js";
import { matchers } from "./matchers/index.js";
import { formatExplanation } from "./formatter.js";

export function explainError(error, context = {}) {
  const signals = analyzeError(error, context);

  for (const matcher of matchers) {
    if (matcher.match(signals)) {
      const explanation = matcher.explain(signals);
      return formatExplanation(explanation, error);
    }
  }

  // absolute fallback (should rarely hit)
  return formatExplanation(
    {
      title: "Unknown error",
      happened: "An unexpected error occurred.",
      causes: ["The error could not be classified"],
      actions: ["Check the stack trace", "Log surrounding values"]
    },
    error
  );
}
