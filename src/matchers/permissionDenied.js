export const permissionDeniedMatcher = {
  match: ({ code }) => code === "EACCES" || code === "EPERM",
  explain: () => ({
    title: "Permission Denied",
    happened: "You do not have the permissions required to perform this operation.",
    causes: [
      "The file or directory is owned by 'root' or another user",
      "The operating system blocked the write request"
    ],
    actions: [
      "Run the command again with 'sudo' (Unix) or as Administrator (Windows)",
      "Check file permissions using 'ls -l'",
      "Change ownership of the directory using 'chown'"
    ]
  })
};
