export const moduleNotFoundMatcher = {
  match: ({ code, message }) => 
    code === 'MODULE_NOT_FOUND' || 
    message.includes("Cannot find module"),
  
  explain: ({ message }) => {
    // Extract module name
    // Example: "Cannot find module 'axios'" -> 'axios'
    const match = message.match(/'([^']+)'/);
    const moduleName = match ? match[1] : "the module";
    const isRelative = moduleName.startsWith('.') || moduleName.startsWith('/');

    const causes = [
      "The package is not installed",
      "The path to the file is incorrect"
    ];
    
    const actions = [];

    if (isRelative) {
      actions.push(`Check if the file '${moduleName}' actually exists`);
      actions.push("Check for typos in the file path");
    } else {
      actions.push(`Run 'npm install ${moduleName}'`);
      actions.push("Check your package.json dependencies");
    }

    return {
      title: "Missing Module",
      happened: `Node.js could not find '${moduleName}'.`,
      causes,
      actions,
      confidence: 100 // Very high confidence for this specific error
    };
  }
};
