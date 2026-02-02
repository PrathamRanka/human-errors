// Simple Levenshtein distance implementation
function levenshtein(a, b) {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          Math.min(
            matrix[i][j - 1] + 1,   // insertion
            matrix[i - 1][j] + 1    // deletion
          )
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

export const unknownVariableMatcher = {
  match: ({ signals }) => signals.isReferenceError,
  
  explain: ({ message, context }) => {
    // Extract variable name
    // "x is not defined" -> x
    const match = message.match(/^(\S+) is not defined/);
    const variableName = match ? match[1] : "variable";
    
    const causes = [
      "You haven't declared this variable yet",
      "It might be a typo"
    ];

    const actions = [
      "Check where this variable is initialized",
      "Look for spelling mistakes"
    ];

    let confidence = 60;
    
    // Fuzzy matching logic if context variables are provided
    if (context && typeof context === 'object') {
      // Assuming context keys are the variable names available in scope
      // In a real usage, a user might pass: explainError(err, { user: ..., config: ... })
      const potentialMatches = Object.keys(context);
      
      let bestMatch = null;
      let minDistance = Infinity;

      for (const candidate of potentialMatches) {
        const dist = levenshtein(variableName, candidate);
        if (dist < minDistance) {
          minDistance = dist;
          bestMatch = candidate;
        }
      }

      // Heuristic: if distance is small relative to length (e.g. 1 or 2 chars diff)
      if (bestMatch && minDistance <= 2 && minDistance > 0) {
        causes.unshift(`You might have meant '${bestMatch}'`);
        actions.unshift(`Did you mean to use '${bestMatch}'?`);
        confidence = 90; // High confidence we found the typo
      }
    }

    return {
      title: "Unknown Variable",
      happened: `Code tried to access '${variableName}', but it doesn't exist.`,
      causes,
      actions,
      confidence
    };
  }
};
