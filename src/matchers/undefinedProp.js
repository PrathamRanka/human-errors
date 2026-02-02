export const undefinedPropMatcher = {
  match: ({ signals, message }) => 
    signals.isTypeError && 
    signals.mentionsUndefined && 
    signals.mentionsMap &&
    message.includes("reading 'map'"),
  explain: () => ({
    title: "Not an array",
    happened: "You tried to use .map() on a value that is undefined.",
    causes: [
      "The variable is not initialized",
      "The API response is missing the expected array",
      "You are accessing a nested property that doesn't exist"
    ],
    actions: [
      "Check if the variable is defined before mapping",
      "Use optional chaining: arr?.map()",
      "Ensure the data type is actually an Array"
    ]
  })
};
