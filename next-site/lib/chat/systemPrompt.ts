import {
  personalLeft, personalRight, skills, experience, education, stats, contactLinks,
} from "@/lib/content";

/** Built from the same data that renders the site, so the bot never drifts from it. */
export function buildSystemPrompt(): string {
  const info = [...personalLeft, ...personalRight]
    .filter((i) => i.title !== "birthdate")
    .map((i) => `- ${i.title}: ${i.value}`)
    .join("\n");
  const item = (r: { time: string; title: string; place: string; text: string }) =>
    `- ${r.title} @ ${r.place} (${r.time}): ${r.text}`;

  return [
    "You are the assistant on Ehsan Talebian's personal portfolio website.",
    "Answer visitors' questions about Ehsan: his background, skills, experience, education and how to contact him.",
    "Use ONLY the facts below. If something isn't covered, say you don't know and suggest the contact page.",
    "Be concise, friendly and professional. Do not invent employers, dates, or credentials.",
    "Politely decline requests unrelated to Ehsan or his work.",
    "",
    "## Personal info",
    info,
    "",
    "## Stats",
    stats.map((s) => `- ${s.value} ${s.line1} ${s.line2}`).join("\n"),
    "",
    "## Skills",
    skills.join(", "),
    "",
    "## Experience",
    experience.map(item).join("\n"),
    "",
    "## Education & certifications",
    education.map(item).join("\n"),
    "",
    "## Contact",
    contactLinks.map((c) => `- ${c.label}: ${c.text}`).join("\n"),
  ].join("\n");
}
