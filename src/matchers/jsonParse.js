export const jsonParseMatcher = {
  match: ({ signals }) => signals.mentionsJSON && signals.isSyntaxError,
  explain: () => ({
    title: "Invalid JSON syntax",
    happened: "The application tried to parse a malformed JSON string.",
    causes: [
      "Missing or extra commas (e.g. at the end of a list)",
      "Unescaped characters in strings",
      "Missing quotes around keys"
    ],
    actions: [
      "Validate your JSON syntax",
      "Check for trailing commas",
      "Ensure all keys are double-quoted"
    ]
  })
};
