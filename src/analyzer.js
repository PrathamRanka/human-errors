export function analyzeError(error, context = {}){
    const message = error?.message || "";
    const stack = error?.stack || "";
    const name = error?.name || "Error"
    const code = error?.code
}

return { name, message, stack, code , context,

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
      inUserCode: !stack.includes("node_modules"),

      missingEnv: !process.env.DATABASE_URL
    }
}