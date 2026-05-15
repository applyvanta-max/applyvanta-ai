import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { existsSync, readFileSync } from "node:fs";
import { extname, join, normalize, resolve } from "node:path";

const root = resolve(process.cwd());
const envPath = join(root, ".env");

if (existsSync(envPath)) {
  const lines = readFileSync(envPath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const [key, ...valueParts] = trimmed.split("=");
    if (key && !process.env[key]) {
      process.env[key] = valueParts.join("=").replace(/^["']|["']$/g, "");
    }
  }
}

const port = Number(process.env.PORT || 3000);
const openAiModel = process.env.OPENAI_MODEL || "gpt-4o-mini";
const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || "";

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon"
};

const sendJson = (res, status, payload) => {
  res.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store"
  });
  res.end(JSON.stringify(payload));
};

const readRequestJson = (req) =>
  new Promise((resolveBody, rejectBody) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 80000) {
        rejectBody(new Error("Request body is too large."));
        req.destroy();
      }
    });
    req.on("end", () => {
      try {
        resolveBody(body ? JSON.parse(body) : {});
      } catch {
        rejectBody(new Error("Invalid JSON body."));
      }
    });
    req.on("error", rejectBody);
  });

const cleanText = (value, max = 4000) =>
  String(value || "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);

const collectHighlights = (...sources) => {
  const text = sources.map((source) => cleanText(source, 5000).toLowerCase()).join(" ");
  const knownTerms = [
    ["Workday HCM", /workday|hcm/],
    ["Advanced, Matrix, Composite, and BIRT reports", /advanced|matrix|composite|birt/],
    ["calculated fields", /calculated field/],
    ["dashboards", /dashboard/],
    ["HR and Finance reporting", /hr|human resources|finance/],
    ["Prod/Sandbox validation", /prod|sandbox|validation|uat/],
    ["EIB, Prism, and integration support", /eib|prism|integration|core connector|studio|rest|soap/],
    ["Excel analysis", /excel|pivot|vlookup|xlookup/],
    ["stakeholder requirement gathering", /stakeholder|requirement|gathering|business partner/],
    ["healthcare or data-sensitive environments", /healthcare|sensitive|regulated|hipaa|confidential/]
  ];

  const highlights = knownTerms
    .filter(([, pattern]) => pattern.test(text))
    .map(([label]) => label);

  return highlights.length ? highlights.slice(0, 6) : ["role-specific examples", "measurable outcomes", "clear stakeholder communication"];
};

const localCoachReply = ({
  message,
  role,
  company,
  userRole,
  participantRole,
  customPrompt,
  jobDescription,
  resumeText
}) => {
  const topic = cleanText(message, 240) || "the latest question";
  const targetRole = cleanText(role, 80) || "this role";
  const companyName = cleanText(company, 80);
  const userTitle = cleanText(userRole, 100) || targetRole;
  const listener = cleanText(participantRole, 80) || "the interviewer";
  const highlights = collectHighlights(resumeText, jobDescription, customPrompt);
  const highlightLine = highlights.join(", ");
  const lowerTopic = topic.toLowerCase();

  if (/tell\s+(me\s+)?(about|abt)\s+(yourself|your self)|introduce yourself|walk me through your background/.test(lowerTopic)) {
    return [
      `Ready-to-say answer for ${userTitle}${companyName ? ` at ${companyName}` : ""}:`,
      "",
      `Sure. I am a ${userTitle} with a strong focus on turning HR and business reporting needs into accurate, usable Workday outputs. My background includes ${highlightLine}, and I am used to working with stakeholders to understand what they actually need from the data, not just what fields they ask for.`,
      "",
      "In my recent work, I have focused on building reliable reports, validating results across environments, documenting assumptions, and making sure HR or Finance teams can trust the numbers before they use them for decisions. I also pay close attention to data sensitivity, report security, and repeatable testing because those details matter in HR systems.",
      "",
      `For this conversation with ${listener}, I would position myself as someone who can combine Workday reporting depth with clear communication: gather requirements, build the right report or dashboard, validate it with business users, and explain the result in a way the team can act on.`,
      "",
      "Strong closer: I can go deeper into a specific reporting example, calculated field challenge, or stakeholder project if that would be useful."
    ].join("\n");
  }

  if (/workday|report|dashboard|calculated|matrix|composite|birt|eib|prism|integration|data/.test(lowerTopic)) {
    return [
      `Use this STAR answer for ${targetRole}:`,
      "",
      "Situation: In a Workday reporting request, the business needed a reliable way to see HR or Finance data without manually reconciling multiple exports.",
      "",
      "Task: I owned the reporting analysis from requirements through validation. That meant clarifying the audience, identifying the right data sources, building the report logic, and making sure the output matched what stakeholders expected.",
      "",
      `Action: I used my experience with ${highlightLine} to build the report, test the calculated fields, compare results between environments, and review edge cases with the business team. I also documented the assumptions so the report could be maintained later.`,
      "",
      "Result: The team received a cleaner, more repeatable report that reduced manual checking and gave stakeholders more confidence in the data. I would quantify this with the exact time saved, defect reduction, or adoption result from your real project.",
      "",
      "Follow-up: I can also explain the technical design behind the report if you want the Workday details."
    ].join("\n");
  }

  return [
    `Suggested answer for ${targetRole}${companyName ? ` at ${companyName}` : ""}:`,
    "",
    `I would answer this by connecting the question to my actual background in ${highlightLine}.`,
    "",
    "A strong structure would be:",
    "- Start with the business situation and why it mattered.",
    "- Explain what you personally owned.",
    "- Give 2 or 3 concrete actions you took.",
    "- Close with a measurable result, quality improvement, timeline, or stakeholder outcome.",
    "",
    `Ready opening: "A good example is related to ${topic.toLowerCase()}. In that situation, I focused on understanding the business need first, then used my Workday reporting experience to build, validate, and explain a reliable solution."`,
    "",
    "Quick follow-up line: \"I can go deeper on the technical details or the collaboration side, depending on what would be most useful.\""
  ].join("\n");
};

const extractResponseText = (data) => {
  if (typeof data?.output_text === "string" && data.output_text.trim()) {
    return data.output_text.trim();
  }

  const chunks = [];
  for (const item of data?.output || []) {
    for (const content of item?.content || []) {
      if (typeof content?.text === "string") chunks.push(content.text);
    }
  }
  return chunks.join("\n").trim();
};

const createInterviewReply = async (payload) => {
  const message = cleanText(payload.message);
  const transcript = cleanText(payload.transcript);
  const role = cleanText(payload.role, 120) || "Workday HRIS Analyst";
  const company = cleanText(payload.company, 120);
  const userRole = cleanText(payload.userRole, 140);
  const participantRole = cleanText(payload.participantRole, 120);
  const mode = cleanText(payload.mode, 80) || "Interview coach";
  const scenario = cleanText(payload.scenario, 120);
  const responseMode = cleanText(payload.responseMode, 80);
  const customPrompt = cleanText(payload.customPrompt, 3000);
  const jobDescription = cleanText(payload.jobDescription, 2500);
  const resumeName = cleanText(payload.resumeName, 180);
  const resumeText = cleanText(payload.resumeText, 12000);

  if (!message) {
    return { reply: "Type or paste the interviewer's question first, then I can coach the answer.", provider: "local" };
  }

  const localContext = {
    message,
    role,
    company,
    userRole,
    participantRole,
    customPrompt,
    jobDescription,
    resumeText
  };

  if (!process.env.OPENAI_API_KEY) {
    return { reply: localCoachReply(localContext), provider: "local-demo" };
  }

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: openAiModel,
      instructions: [
        "You are ApplyVanta.ai, a visible, consent-based interview coach.",
        "Help candidates prepare and respond clearly. Do not encourage deception, cheating, stealth behavior, or bypassing interview rules.",
        "Use the user's uploaded resume text, job description, scenario, and custom instructions to personalize the answer.",
        "Return concise coaching with a ready-to-say answer, structure notes, and one follow-up suggestion."
      ].join(" "),
      input: [
        {
          role: "user",
          content: [
            `Target role: ${role}`,
            company ? `Company: ${company}` : "Company: not specified.",
            userRole ? `User role: ${userRole}` : "User role: not specified.",
            participantRole ? `Participant role: ${participantRole}` : "Participant role: not specified.",
            `Mode: ${mode}`,
            scenario ? `Scenario: ${scenario}` : "Scenario: not specified.",
            responseMode ? `Response mode: ${responseMode}` : "Response mode: not specified.",
            customPrompt ? `Custom response instructions: ${customPrompt}` : "Custom response instructions: none.",
            resumeName ? `Saved resume file: ${resumeName}` : "Saved resume file: none.",
            resumeText ? `Resume text context: ${resumeText}` : "Resume text context: none extracted yet.",
            jobDescription ? `Job description context: ${jobDescription}` : "Job description context: none.",
            transcript ? `Current transcript: ${transcript}` : "Current transcript: none yet.",
            `Question or user message: ${message}`
          ].join("\n")
        }
      ],
      max_output_tokens: 650
    })
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const detail = data?.error?.message || "The AI provider returned an error.";
    if (/quota|billing|insufficient|credit/i.test(detail)) {
      return {
        reply: [
          localCoachReply(localContext),
          "",
          "Note: live OpenAI replies are paused because the connected API key has no available quota or billing credits."
        ].join("\n"),
        provider: "local-demo",
        warning: detail
      };
    }
    throw new Error(detail);
  }

  return { reply: extractResponseText(data) || localCoachReply(localContext), provider: "openai", model: openAiModel };
};

const serveStatic = async (req, res) => {
  const requestUrl = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
  let pathname = decodeURIComponent(requestUrl.pathname);
  if (pathname === "/") pathname = "/index.html";

  const filePath = normalize(join(root, pathname));
  if (!filePath.startsWith(root)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  try {
    const file = await readFile(filePath);
    res.writeHead(200, {
      "content-type": mimeTypes[extname(filePath).toLowerCase()] || "application/octet-stream"
    });
    res.end(file);
  } catch {
    res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    res.end("Not found");
  }
};

const server = createServer(async (req, res) => {
  try {
    if (req.method === "GET" && req.url === "/api/config") {
      sendJson(res, 200, {
        supabaseUrl,
        supabaseAnonKey,
        hasSupabase: Boolean(supabaseUrl && supabaseAnonKey)
      });
      return;
    }

    if (req.method === "POST" && req.url === "/api/interview/reply") {
      const body = await readRequestJson(req);
      const result = await createInterviewReply(body);
      sendJson(res, 200, result);
      return;
    }

    if (req.method === "GET") {
      await serveStatic(req, res);
      return;
    }

    sendJson(res, 405, { error: "Method not allowed" });
  } catch (error) {
    sendJson(res, 500, { error: error.message || "Server error" });
  }
});

server.listen(port, () => {
  console.log(`ApplyVanta.ai demo running at http://localhost:${port}`);
  if (!process.env.OPENAI_API_KEY) {
    console.log("OPENAI_API_KEY is not set, so the app is using local demo replies.");
  }
});
