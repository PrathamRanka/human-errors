export const typeMatchers = [
  {
    match: ({ signals }) =>
      signals.isTypeError && signals.mentionsUndefined,
    explain: () => ({
      title: "Used an undefined value",
      happened: "Your code tried to use a value that is undefined.",
      causes: [
        "API response was empty",
        "Variable was never initialized",
        "Missing await in async function"
      ],
      actions: [
        "Log the variable before using it",
        "Add null/undefined checks",
        "Check async calls"
      ]
    })
  },

  {
    match: ({ signals }) => signals.isSyntaxError,
    explain: () => ({
      title: "Syntax error",
      happened: "JavaScript could not parse your code.",
      causes: [
        "Missing bracket or comma",
        "Invalid syntax"
      ],
      actions: [
        "Check the line mentioned in the error",
        "Run a formatter or linter"
      ]
    })
  },

  {
    match: ({ signals }) => signals.mentionsJSON,
    explain: () => ({
      title: "Invalid JSON",
      happened: "Failed to parse JSON data.",
      causes: [
        "Malformed JSON",
        "Unexpected trailing comma",
        "Invalid response from API"
      ],
      actions: [
        "Log the raw JSON",
        "Validate JSON format",
        "Check API response"
      ]
    })
  }
];
