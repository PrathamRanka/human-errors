export function formatExplanation(explain, error){
    return 
    `
    ${explain.title}

    What happened
    ${explain.happened}

    Likely causes
    ${explain.causes.map(c => `• ${c}`).join("\n")}

    Try this
    ${explain.actions.map(a => `• ${a}`).join("\n")}

    Original error
    ${error.message || error.code || error}`.trim()
}