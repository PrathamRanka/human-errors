export function formatExplanation(explain = {}, error = '') {
  const title = explain.title || "Error";
  const happened = explain.happened || "";
  const causes = Array.isArray(explain.causes) ? explain.causes : [];
  const actions = Array.isArray(explain.actions) ? explain.actions : [];
  const original = error && (error.message || error.code) ? (error.message || error.code) : String(error || "");

  return `${title}

What happened
${happened}

Likely causes
${causes.map(c => `• ${c}`).join("\n")}

Try this
${actions.map(a => `• ${a}`).join("\n")}

Original error
${original}`.trim();
}