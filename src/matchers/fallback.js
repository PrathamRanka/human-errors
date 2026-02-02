export const fallbackMatcher = {
  match: () => true,
  explain: () => ({
    title: "Unrecognized error",
    happened: "An unexpected error occurred during execution.",
    causes: [
      "Custom application logic failed",
      "Unhandled edge case"
    ],
    actions: [
      "Check the stack trace",
      "Log inputs before this error",
      "Add defensive checks"
    ]
  })
};
