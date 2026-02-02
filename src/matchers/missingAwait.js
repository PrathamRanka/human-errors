export const missingAwaitMatcher = {
  match: ({ signals, message, context }) => {
    // 1. Direct detection via context if user passed it
    if (context) {
      const values = Object.values(context);
      for (const val of values) {
        if (val && typeof val.then === 'function' && message.includes("undefined")) {
          // Heuristic: Error mentions undefined, and one of the context vars is a Promise.
          // Very simplified check.
          return true;
        }
      }
    }
    
    // 2. String heuristics
    // "Cannot read property '... ' of Promise" (rare in V8, but possible in some envs)
    // Or if the variable name implies async (e.g. 'userPromise') and error is undefined property
    if (signals.mentionsUndefined && /promise/i.test(message)) {
      return true;
    }

    return false;
  },
  explain: () => ({
    title: "Missing Await?",
    happened: "You might be trying to access properties on a Promise object instead of its result.",
    causes: [
      "You forgot to add 'await' before an async function call",
      "You didn't use .then() to handle the result"
    ],
    actions: [
      "Add 'await' before the function call: const data = await fetchData()",
      "Check if the function returns a Promise"
    ],
    confidence: 50 // Medium confidence as this is heuristic-based
  })
};
