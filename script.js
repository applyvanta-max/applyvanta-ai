document.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) {
    window.lucide.createIcons();
  } else {
    const icons = {
      menu: "<path d='M4 7h16M4 12h16M4 17h16'/>",
      plus: "<path d='M12 5v14M5 12h14'/>",
      check: "<path d='M20 6 9 17l-5-5'/>",
      sparkles: "<path d='m12 3 1.7 5.2L19 10l-5.3 1.8L12 17l-1.7-5.2L5 10l5.3-1.8L12 3Z'/><path d='M19 16v4M17 18h4M5 4v3M3.5 5.5h3'/>",
      calendar: "<rect x='3' y='4' width='18' height='17' rx='2'/><path d='M8 2v4M16 2v4M3 10h18'/><path d='m9 15 2 2 4-4'/>",
      briefcase: "<rect x='3' y='7' width='18' height='13' rx='2'/><path d='M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18'/>",
      rocket: "<path d='M5 15c-1 1-2 4-2 6 2 0 5-1 6-2'/><path d='M15 9 9 15l-4-4 6-6c3-3 7-3 9-3 0 2 0 6-3 9l-6 6-4-4'/><circle cx='15' cy='9' r='1'/>",
      graduation: "<path d='M22 10 12 5 2 10l10 5 10-5Z'/><path d='M6 12v5c3 2 9 2 12 0v-5'/><path d='M22 10v6'/>",
      users: "<path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2'/><circle cx='9' cy='7' r='4'/><path d='M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8'/>",
      send: "<path d='m22 2-7 20-4-9-9-4 20-7Z'/><path d='M22 2 11 13'/>",
      search: "<circle cx='11' cy='11' r='7'/><path d='m21 21-5-5'/>",
      globe: "<circle cx='12' cy='12' r='10'/><path d='M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20'/>",
      list: "<path d='M9 6h12M9 12h12M9 18h12'/><path d='m3 6 1 1 2-2M3 12l1 1 2-2M3 18l1 1 2-2'/>",
      target: "<circle cx='12' cy='12' r='9'/><circle cx='12' cy='12' r='5'/><circle cx='12' cy='12' r='1'/>",
      phone: "<path d='M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z'/>",
      mail: "<rect x='3' y='5' width='18' height='14' rx='2'/><path d='m3 7 9 6 9-6'/>",
      shield: "<path d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z'/><path d='m9 12 2 2 4-4'/>",
      default: "<rect x='4' y='4' width='16' height='16' rx='4'/><path d='m8 12 3 3 5-6'/>"
    };

    const pick = (name) => {
      if (name.includes("calendar")) return icons.calendar;
      if (name.includes("briefcase") || name.includes("building")) return icons.briefcase;
      if (name.includes("graduation") || name.includes("school")) return icons.graduation;
      if (name.includes("user")) return icons.users;
      if (name.includes("send")) return icons.send;
      if (name.includes("search") || name.includes("scan")) return icons.search;
      if (name.includes("globe") || name.includes("linkedin")) return icons.globe;
      if (name.includes("list") || name.includes("clipboard")) return icons.list;
      if (name.includes("target") || name.includes("crosshair")) return icons.target;
      if (name.includes("phone") || name.includes("headphones")) return icons.phone;
      if (name.includes("mail")) return icons.mail;
      if (name.includes("shield")) return icons.shield;
      if (name.includes("check") || name.includes("badge")) return icons.check;
      if (name.includes("rocket") || name.includes("zap") || name.includes("gauge")) return icons.rocket;
      return icons[name] || icons.default;
    };

    document.querySelectorAll("[data-lucide]").forEach((node) => {
      const name = node.getAttribute("data-lucide") || "default";
      node.outerHTML = `<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">${pick(name)}</svg>`;
    });
  }

  const toggle = document.querySelector(".menu-toggle");
  const links = document.querySelector(".nav-links");
  toggle?.addEventListener("click", () => {
    links?.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(links?.classList.contains("open")));
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => links?.classList.remove("open"));
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));

  document.querySelectorAll(".faq-question").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".faq-item");
      item?.classList.toggle("open");
    });
  });

  document.querySelectorAll(".focus-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const widget = button.closest(".focus-widget-demo");
      widget?.classList.toggle("collapsed");
      button.setAttribute("aria-label", widget?.classList.contains("collapsed") ? "Expand focus panel" : "Collapse focus panel");
    });
  });

  const modelDialog = document.querySelector("#modelDialog");
  document.querySelectorAll("[data-open-models]").forEach((button) => {
    button.addEventListener("click", () => {
      if (modelDialog && typeof modelDialog.showModal === "function") {
        modelDialog.showModal();
      }
    });
  });

  document.querySelector("[data-start-session]")?.addEventListener("click", () => {
    window.location.href = "../pilot/session/workday-report-builder.html";
  });

  const audioPopover = document.querySelector("#audioPopover");
  const settingsPopover = document.querySelector("#settingsPopover");
  const shareOverlay = document.querySelector("#shareOverlay");

  document.querySelector("[data-audio-popover]")?.addEventListener("click", () => {
    if (audioPopover) audioPopover.hidden = !audioPopover.hidden;
    if (settingsPopover) settingsPopover.hidden = true;
  });

  document.querySelector("[data-settings-popover]")?.addEventListener("click", () => {
    if (settingsPopover) settingsPopover.hidden = !settingsPopover.hidden;
    if (audioPopover) audioPopover.hidden = true;
  });

  document.querySelector(".audio-start")?.addEventListener("mouseenter", () => {
    document.querySelector(".audio-start span").textContent = "Start";
  });

  document.querySelector("[data-share-open]")?.addEventListener("click", () => {
    if (shareOverlay) shareOverlay.hidden = false;
  });

  document.querySelector("[data-share-cancel]")?.addEventListener("click", () => {
    if (shareOverlay) shareOverlay.hidden = true;
  });

  document.querySelector("[data-share-confirm]")?.addEventListener("click", () => {
    if (shareOverlay) shareOverlay.hidden = true;
    const timer = document.querySelector("#sessionTimer");
    if (timer) timer.textContent = "1m";
  });

  const store = {
    get(key, fallback = null) {
      try {
        return JSON.parse(localStorage.getItem(key)) ?? fallback;
      } catch {
        return fallback;
      }
    },
    set(key, value) {
      localStorage.setItem(key, JSON.stringify(value));
    },
    remove(key) {
      localStorage.removeItem(key);
    }
  };

  const escapeHtml = (value) =>
    String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  const formatCoachReply = (value) =>
    escapeHtml(value)
      .replace(/\n{2,}/g, "</p><p>")
      .replace(/\n/g, "<br>");

  const readFileAsDataUrl = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const accountForm = document.querySelector("#accountForm");
  accountForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const profile = {
      email: document.querySelector("#accountEmail")?.value.trim(),
      name: document.querySelector("#accountName")?.value.trim(),
      createdAt: new Date().toISOString()
    };
    store.set("applyvanta.profile", profile);
    const status = document.querySelector("#accountStatus");
    if (status) status.textContent = "Account created. Opening setup...";
    setTimeout(() => {
      window.location.href = "demo.html#demo-room";
    }, 500);
  });

  const practiceForm = document.querySelector("#practiceSetupForm");
  const resumeInput = document.querySelector("#resumeUpload");
  const savedResumePanel = document.querySelector("#savedResumePanel");
  const savedResumeName = document.querySelector("#savedResumeName");
  const savedResumeMeta = document.querySelector("#savedResumeMeta");

  const refreshSavedResume = () => {
    const resume = store.get("applyvanta.resume");
    if (!savedResumePanel || !savedResumeName || !savedResumeMeta) return;
    savedResumePanel.hidden = !resume;
    if (!resume) return;
    savedResumeName.textContent = resume.name;
    savedResumeMeta.textContent = `${resume.type || "resume"} - ${Math.ceil((resume.size || 0) / 1024)} KB - saved ${new Date(resume.savedAt).toLocaleDateString()}`;
  };

  refreshSavedResume();

  resumeInput?.addEventListener("change", async () => {
    const file = resumeInput.files?.[0];
    if (!file) return;
    if (file.size > 2_500_000) {
      const status = document.querySelector("#practiceSetupStatus");
      if (status) status.textContent = "Resume is too large for browser storage. Please upload a file under 2.5 MB for this MVP.";
      resumeInput.value = "";
      return;
    }
    const dataUrl = await readFileAsDataUrl(file);
    store.set("applyvanta.resume", {
      name: file.name,
      type: file.type || "resume",
      size: file.size,
      dataUrl,
      savedAt: new Date().toISOString()
    });
    refreshSavedResume();
  });

  document.querySelector("#deleteResumeButton")?.addEventListener("click", () => {
    store.remove("applyvanta.resume");
    if (resumeInput) resumeInput.value = "";
    refreshSavedResume();
  });

  practiceForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const setup = {
      role: document.querySelector("#targetRole")?.value.trim() || "Interview candidate",
      model: document.querySelector("#coachModel")?.value || "Auto",
      layout: document.querySelector("#coachLayout")?.value || "Full coach",
      position: document.querySelector("#coachPosition")?.value || "Right edge",
      jobDescription: document.querySelector("#jobDescription")?.value.trim() || "",
      consent: Boolean(document.querySelector("#consentCheck")?.checked),
      resumeName: store.get("applyvanta.resume")?.name || "",
      updatedAt: new Date().toISOString()
    };
    store.set("applyvanta.sessionSetup", setup);
    const status = document.querySelector("#practiceSetupStatus");
    if (status) status.textContent = "Setup saved. Opening the practice room...";
    setTimeout(() => {
      window.location.href = "app/pilot/session/workday-report-builder.html";
    }, 500);
  });

  document.querySelectorAll("form").forEach((form) => {
    if (form.closest("dialog")) return;
    if (form.classList.contains("session-composer")) return;
    if (form.id === "accountForm" || form.id === "practiceSetupForm") return;

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const button = form.querySelector("button[type='submit']");
      const original = button?.textContent;
      if (button) {
        button.textContent = "Request received";
        button.disabled = true;
      }
      setTimeout(() => {
        if (button) {
          button.textContent = original || "Request Demo Call";
          button.disabled = false;
        }
        form.reset();
      }, 1800);
    });
  });

  const composer = document.querySelector("#interviewComposer");
  const messageInput = document.querySelector("#interviewMessage");
  const sendButton = composer?.querySelector("button[type='submit']");
  const countLabel = document.querySelector("#composerCount");
  const answerState = document.querySelector("#answerState");
  const answerThread = document.querySelector("#answerThread");
  const transcriptState = document.querySelector("#transcriptState");
  const transcriptThread = document.querySelector("#transcriptThread");
  const screenPreviewVideo = document.querySelector("#screenPreviewVideo");
  const documentStrip = document.querySelector("#sessionDocumentStrip");
  const sessionSetup = store.get("applyvanta.sessionSetup", {});
  let recognition = null;
  let sessionStartedAt = null;
  let timerId = null;
  let lastAutoPrompt = "";

  const updateSessionTitle = () => {
    const title = document.querySelector("#sessionTitle");
    if (title && sessionSetup.role) title.textContent = `${sessionSetup.role} practice session`;
    if (!documentStrip) return;
    const resume = store.get("applyvanta.resume");
    documentStrip.hidden = !resume;
    if (resume) {
      documentStrip.innerHTML = `<strong>Document uploaded</strong><span>${escapeHtml(resume.name)}</span><button type="button" data-session-delete-resume>Delete</button>`;
      documentStrip.querySelector("[data-session-delete-resume]")?.addEventListener("click", () => {
        store.remove("applyvanta.resume");
        updateSessionTitle();
      });
    }
  };

  updateSessionTitle();

  const addTranscriptMessage = (message, speaker = "Interviewer / audio") => {
    if (!transcriptThread) return;
    if (transcriptState) transcriptState.hidden = true;
    const entry = document.createElement("article");
    entry.className = "transcript-entry";
    entry.innerHTML = `<strong>${escapeHtml(speaker)}</strong><p>${escapeHtml(message)}</p>`;
    transcriptThread.append(entry);
    entry.scrollIntoView({ block: "nearest" });
  };

  const addAnswerMessage = (reply, meta = "ApplyVanta.ai Coach") => {
    if (!answerThread) return;
    if (answerState) answerState.hidden = true;
    const entry = document.createElement("article");
    entry.className = "coach-message";
    entry.innerHTML = `<strong>${escapeHtml(meta)}</strong><p>${formatCoachReply(reply)}</p>`;
    answerThread.append(entry);
    entry.scrollIntoView({ block: "nearest" });
  };

  const requestCoachReply = async (message, speaker = "Interviewer / audio") => {
    if (!message || message === lastAutoPrompt) return;
    lastAutoPrompt = message;
    addTranscriptMessage(message, speaker);
    try {
      const transcript = transcriptThread?.innerText || "";
      const resume = store.get("applyvanta.resume");
      const response = await fetch("/api/interview/reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          transcript,
          role: sessionSetup.role || "Workday HRIS Analyst",
          mode: sessionSetup.model || "real-time interview coaching",
          jobDescription: sessionSetup.jobDescription || "",
          resumeName: resume?.name || ""
        })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to generate a reply.");
      const provider = data.provider === "openai" ? `ApplyVanta.ai Coach (${data.model || "OpenAI"})` : "ApplyVanta.ai Coach (demo)";
      addAnswerMessage(data.reply, provider);
    } catch (error) {
      addAnswerMessage(`I could not reach the interview backend yet. ${error.message || "Please try again."}`, "Connection issue");
    }
  };

  const setComposerState = () => {
    if (!messageInput || !sendButton || !countLabel) return;
    const length = messageInput.value.length;
    sendButton.disabled = length === 0;
    countLabel.textContent = `${length}/2000 characters`;
  };

  messageInput?.addEventListener("input", setComposerState);
  setComposerState();

  composer?.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!messageInput || !sendButton) return;
    const message = messageInput.value.trim();
    if (!message) return;
    messageInput.value = "";
    setComposerState();
    const originalText = sendButton.textContent;
    sendButton.textContent = "Thinking...";
    sendButton.disabled = true;
    await requestCoachReply(message, "Typed question");
    sendButton.textContent = originalText || "Send";
    setComposerState();
    messageInput.focus();
  });

  const startTimer = () => {
    const timer = document.querySelector("#sessionTimer");
    sessionStartedAt = Date.now();
    clearInterval(timerId);
    timerId = setInterval(() => {
      if (!timer || !sessionStartedAt) return;
      timer.textContent = `${Math.max(1, Math.floor((Date.now() - sessionStartedAt) / 60000))}m`;
    }, 1000);
  };

  const startSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      addAnswerMessage("Your browser does not support built-in live speech recognition. You can still type questions into the message box and get replies.", "Microphone note");
      return;
    }
    recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";
    recognition.onresult = (event) => {
      for (let index = event.resultIndex; index < event.results.length; index += 1) {
        const result = event.results[index];
        const text = result[0]?.transcript?.trim();
        if (result.isFinal && text) requestCoachReply(text, "Microphone transcript");
      }
    };
    recognition.onerror = () => {
      addAnswerMessage("Microphone transcription paused. You can restart the session or type the question manually.", "Microphone note");
    };
    try {
      recognition.start();
    } catch {
      addAnswerMessage("Microphone transcription is already running.", "Microphone note");
    }
  };

  const startLiveSession = async () => {
    document.querySelector("#shareOverlay")?.setAttribute("hidden", "");
    try {
      if (navigator.mediaDevices?.getDisplayMedia) {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
        if (screenPreviewVideo) {
          screenPreviewVideo.srcObject = screenStream;
          screenPreviewVideo.hidden = false;
        }
      }
      if (navigator.mediaDevices?.getUserMedia) {
        await navigator.mediaDevices.getUserMedia({ audio: true });
      }
      const startLabel = document.querySelector(".audio-start span");
      if (startLabel) startLabel.textContent = "Live";
      document.querySelector(".audio-start")?.classList.add("recording");
      startTimer();
      startSpeechRecognition();
      addAnswerMessage("Live session started. I will listen for spoken questions where browser speech recognition is available. You can also type any question below.", "Session ready");
    } catch (error) {
      addAnswerMessage(`Screen or microphone permission was not completed. ${error.message || "Please try Start again."}`, "Permission needed");
    }
  };

  document.querySelector("[data-session-start]")?.addEventListener("click", () => {
    if (navigator.mediaDevices?.getDisplayMedia) {
      startLiveSession();
    } else {
      const overlay = document.querySelector("#shareOverlay");
      if (overlay) overlay.hidden = false;
    }
  });

  document.querySelector("[data-share-confirm]")?.addEventListener("click", startLiveSession);
});
