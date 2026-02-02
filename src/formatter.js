const RESET = "\x1b[0m";
const RED = "\x1b[31m";
const GREEN = "\x1b[32m";
const GRAY = "\x1b[90m";

const supportsColor =
  typeof process !== "undefined" &&
  process.stdout &&
  process.stdout.isTTY &&
  !process.env.NO_COLOR;

function color(str, code) {
  return supportsColor ? `${code}${str}${RESET}` : str;
}

export function formatExplanation(explain = {}, error = "") {
  const title = explain.title || "Error";
  const happened = explain.happened || "";
  const causes = Array.isArray(explain.causes) ? explain.causes : [];
  const actions = Array.isArray(explain.actions) ? explain.actions : [];
  const original =
    error && (error.message || error.code)
      ? error.message || error.code
      : String(error || "");
  const confidence = explain.confidence || 0;

  let causesHeader = "Likely causes";
  if (confidence >= 80) {
    causesHeader = "Causes";
  } else if (confidence < 40) {
    causesHeader = "Possible causes";
  }

  return `${color(title, RED)}

${color("What happened", GRAY)}
${happened}

${color(causesHeader, GRAY)}
${causes.map((c) => `• ${c}`).join("\n")}

${color("Try this", GREEN)}
${actions.map((a) => `• ${a}`).join("\n")}

${color("Original error", GRAY)}
${original}`.trim();
}
