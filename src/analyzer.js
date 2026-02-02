// src/analyzer.js

export function analyzeError(error, context = {}) {
  const message = error?.message || "";
  const stack = error?.stack || "";
  const name = error?.name || "Error";
  const code = error?.code;

  let confidence = 0;
  if (code) confidence += 40;
  if (error instanceof TypeError) confidence += 20;
  if (error instanceof SyntaxError) confidence += 30;
  if (message) confidence += 10;
  if (stack.includes("node_modules")) confidence += 10;
  if (confidence > 100) confidence = 100;

  return {
    name,
    message,
    stack,
    code,
    confidence,
    context,

    signals: {
      isTypeError: error instanceof TypeError,
      isReferenceError: error instanceof ReferenceError,
      isSyntaxError: error instanceof SyntaxError,

      mentionsUndefined: message.includes("undefined"),
      mentionsNull: message.includes("null"),
      mentionsMap: message.includes("map"),
      mentionsJWT: message.toLowerCase().includes("jwt"),
      mentionsJSON: message.toLowerCase().includes("json"),

      inNodeModules: stack.includes("node_modules"),
      inUserCode: !stack.includes("node_modules")
    }
  };
}
