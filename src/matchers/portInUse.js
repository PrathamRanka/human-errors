export const portInUseMatcher = {
  match: ({ code }) => code === "EADDRINUSE",
  explain: () => ({
    title: "Port already in use",
    happened: "You tried to start the server, but the port is occupied.",
    causes: [
      "Another instance of the server is already running",
      "A different application is using this port"
    ],
    actions: [
      "Find and kill the process using this port",
      "Change the port number in your configuration"
    ]
  })
};
