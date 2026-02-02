// src/explainError.js

import { analyzeError } from "./analyzer.js";
import { matchers } from "./matchers/index.js";
import { formatExplanation } from "./formatter.js";

export function explainError(error, context = {}) {
  const err = error instanceof Error ? error : new Error(String(error));
  const analysis = analyzeError(err, context);

  const matches = [];

  for (const matcher of matchers) {
    try {
      let isMatch = false;
      try {
        if (typeof matcher.match === 'function') {
           isMatch = matcher.match(analysis);
        }
      } catch (err) {
        continue;
      }

      if (isMatch) {
        let explanation = {};
        try {
          if (typeof matcher.explain === 'function') {
            explanation = matcher.explain(analysis) || {};
          }
        } catch (err) {
          continue;
        }

        if (explanation && typeof explanation === 'object') {
          explanation.confidence = explanation.confidence || analysis.confidence || 0;
          matches.push(explanation);
        }
      }
    } catch (e) {
   
    }
  }

  if (matches.length > 0) {
   
    matches.sort((a, b) => b.confidence - a.confidence);

    if (matches.length === 1) {
      return formatExplanation(matches[0], err);
    }

    // Merge multiple matches
    const combinedExplanation = {
      title: matches.map(m => m.title).join(" / "), // Combine titles
      happened: matches.map(m => m.happened).filter(Boolean).join("\n\nOR\n\n"),
      causes: matches.flatMap(m => m.causes || []),
      actions: matches.flatMap(m => m.actions || []),
      confidence: matches[0].confidence
    };

    
    combinedExplanation.causes = [...new Set(combinedExplanation.causes)];
    combinedExplanation.actions = [...new Set(combinedExplanation.actions)];

    return formatExplanation(combinedExplanation, err);
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
