export const exactMatchers = [
  {
    match: ({ code }) => code === "ECONNREFUSED",
    explain: () => ({
      title: "Connection refused",
      happened: "Your app could not connect to another service.",
      causes: [
        "The service is not running",
        "Incorrect host or port",
        "Network access blocked"
      ],
      actions: [
        "Ensure the service is running",
        "Check connection URL",
        "Try connecting manually"
      ]
    })
  },

  {
    match: ({ code }) => code === "EADDRINUSE",
    explain: () => ({
      title: "Port already in use",
      happened: "Your server tried to start on a port already in use.",
      causes: [
        "Another process is using the port",
        "Server already running"
      ],
      actions: [
        "Stop the other process",
        "Use a different port"
      ]
    })
  },

  {
    match: ({ message }) => message.toLowerCase().includes("jwt"),
    explain: () => ({
      title: "Authentication token error",
      happened: "There was a problem validating a JWT token.",
      causes: [
        "Token is expired",
        "Token is malformed",
        "Secret key mismatch"
      ],
      actions: [
        "Check token expiration",
        "Verify JWT secret",
        "Re-authenticate user"
      ]
    })
  }
];
