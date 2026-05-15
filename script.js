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

  let supabaseClientPromise = null;

  const setStatusText = (node, message) => {
    if (node) node.textContent = message || "";
  };

  const loadSupabaseScript = () =>
    new Promise((resolve, reject) => {
      if (window.supabase?.createClient) {
        resolve();
        return;
      }

      const existing = document.querySelector("script[data-supabase-js]");
      if (existing) {
        existing.addEventListener("load", resolve, { once: true });
        existing.addEventListener("error", reject, { once: true });
        return;
      }

      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
      script.async = true;
      script.dataset.supabaseJs = "true";
      script.onload = resolve;
      script.onerror = () => reject(new Error("Could not load Supabase in this browser."));
      document.head.append(script);
    });

  const getSupabaseClient = async () => {
    if (supabaseClientPromise) return supabaseClientPromise;

    supabaseClientPromise = (async () => {
      try {
        const response = await fetch("/api/config", { cache: "no-store" });
        if (!response.ok) return null;
        const config = await response.json();
        if (!config.supabaseUrl || !config.supabaseAnonKey) return null;
        await loadSupabaseScript();
        return window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey);
      } catch {
        return null;
      }
    })();

    return supabaseClientPromise;
  };

  const getSupabaseUser = async () => {
    const client = await getSupabaseClient();
    if (!client) return { client: null, user: null };
    const { data } = await client.auth.getUser();
    return { client, user: data?.user || null };
  };

  const safeStorageName = (name) =>
    String(name || "resume")
      .replace(/[^a-z0-9._-]/gi, "-")
      .replace(/-+/g, "-")
      .slice(0, 140);

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

  const loadExternalScript = (src, globalName) =>
    new Promise((resolve, reject) => {
      if (globalName && window[globalName]) {
        resolve(window[globalName]);
        return;
      }

      const existing = document.querySelector(`script[src="${src}"]`);
      if (existing) {
        existing.addEventListener("load", () => resolve(globalName ? window[globalName] : true), { once: true });
        existing.addEventListener("error", reject, { once: true });
        return;
      }

      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.onload = () => resolve(globalName ? window[globalName] : true);
      script.onerror = () => reject(new Error(`Could not load ${src}`));
      document.head.append(script);
    });

  const extractPdfText = async (file) => {
    const pdfjsLib = await loadExternalScript("https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js", "pdfjsLib");
    pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
    const buffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
    const pages = [];

    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
      const page = await pdf.getPage(pageNumber);
      const content = await page.getTextContent();
      pages.push(content.items.map((item) => item.str).join(" "));
    }

    return pages.join("\n").replace(/\s+/g, " ").trim();
  };

  const extractDocxText = async (file) => {
    const mammoth = await loadExternalScript("https://cdn.jsdelivr.net/npm/mammoth@1.8.0/mammoth.browser.min.js", "mammoth");
    const buffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer: buffer });
    return String(result.value || "").replace(/\s+/g, " ").trim();
  };

  const extractResumeText = async (file) => {
    const name = file.name.toLowerCase();
    const type = file.type || "";
    if (type.includes("pdf") || name.endsWith(".pdf")) return extractPdfText(file);
    if (
      type.includes("wordprocessingml") ||
      type.includes("msword") ||
      name.endsWith(".docx")
    ) {
      return extractDocxText(file);
    }
    if (type.startsWith("text/") || name.endsWith(".txt")) return file.text();
    return "";
  };

  const accountForm = document.querySelector("#accountForm");
  const accountCard = document.querySelector("#accountCard");
  const accountDisplayName = document.querySelector("#accountDisplayName");
  const accountDisplayEmail = document.querySelector("#accountDisplayEmail");
  const accountAvatar = document.querySelector("#accountAvatar");
  const accountStatus = document.querySelector("#accountStatus");

  const getInitials = (nameOrEmail) => {
    const value = String(nameOrEmail || "AV").trim();
    const parts = value.includes("@") ? [value[0], value.split("@")[0]?.[1]] : value.split(/\s+/).map((part) => part[0]);
    return parts.filter(Boolean).slice(0, 2).join("").toUpperCase() || "AV";
  };

  const renderAccountState = () => {
    const profile = store.get("applyvanta.profile");
    if (!accountForm || !accountCard) return;

    if (!profile?.email) {
      accountForm.hidden = false;
      accountCard.hidden = true;
      return;
    }

    accountForm.hidden = true;
    accountCard.hidden = false;
    if (accountDisplayName) accountDisplayName.textContent = profile.name || "ApplyVanta user";
    if (accountDisplayEmail) accountDisplayEmail.textContent = profile.email;
    if (accountAvatar) accountAvatar.textContent = getInitials(profile.name || profile.email);
    if (accountStatus) accountStatus.textContent = "";
  };

  renderAccountState();

  const renderWorkspaceIdentity = () => {
    const profile = store.get("applyvanta.profile", {});
    const name = profile.name || profile.email?.split("@")[0] || "GENERAL";
    const avatar = document.querySelector("#setupAvatar");
    const setupName = document.querySelector("#setupUserName");
    const setupPlan = document.querySelector("#setupUserPlan");
    if (avatar) avatar.textContent = getInitials(name);
    if (setupName) setupName.textContent = name;
    if (setupPlan) setupPlan.textContent = profile.email || "Free workspace";
  };

  renderWorkspaceIdentity();

  const hydrateSupabaseAccount = async () => {
    const { client, user } = await getSupabaseUser();
    if (!client || !user?.email) return;

    let fullName = user.user_metadata?.full_name || "";
    const { data: profile } = await client.from("profiles").select("full_name,email").eq("id", user.id).maybeSingle();
    fullName = profile?.full_name || fullName;

    store.set("applyvanta.profile", {
      id: user.id,
      email: profile?.email || user.email,
      name: fullName || user.email.split("@")[0],
      provider: "supabase",
      createdAt: user.created_at || new Date().toISOString()
    });
    renderAccountState();
  };

  hydrateSupabaseAccount();

  accountForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document.querySelector("#accountEmail")?.value.trim();
    const name = document.querySelector("#accountName")?.value.trim();
    const password = document.querySelector("#accountPassword")?.value || "";
    if (!email || !name) return;

    setStatusText(accountStatus, "Creating your account...");

    try {
      const client = await getSupabaseClient();
      if (client) {
        if (password.length < 6) {
          setStatusText(accountStatus, "Password must be at least 6 characters.");
          return;
        }

        let authResult = await client.auth.signUp({
          email,
          password,
          options: { data: { full_name: name } }
        });

        if (authResult.error && /already|registered|exists/i.test(authResult.error.message)) {
          authResult = await client.auth.signInWithPassword({ email, password });
        }

        if (authResult.error) throw authResult.error;

        const user = authResult.data?.user || (await client.auth.getUser()).data?.user;
        if (user?.id) {
          await client.from("profiles").upsert({
            id: user.id,
            email,
            full_name: name
          });
        }

        store.set("applyvanta.profile", {
          id: user?.id,
          email,
          name,
          provider: "supabase",
          createdAt: user?.created_at || new Date().toISOString()
        });
      } else {
        store.set("applyvanta.profile", {
          email,
          name,
          createdAt: new Date().toISOString()
        });
      }

      renderAccountState();
      setStatusText(accountStatus, "Account ready. Opening setup...");
      setTimeout(() => {
        window.location.href = "demo.html#demo-room";
      }, 900);
    } catch (error) {
      setStatusText(accountStatus, error.message || "Could not create the account yet.");
    }
  });

  document.querySelector("#signOutButton")?.addEventListener("click", async () => {
    const client = await getSupabaseClient();
    await client?.auth.signOut();
    store.remove("applyvanta.profile");
    renderAccountState();
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
    const location = resume.provider === "supabase" ? "saved to account" : "saved in this browser";
    savedResumeMeta.textContent = `${resume.type || "resume"} - ${Math.ceil((resume.size || 0) / 1024)} KB - ${location} - ${new Date(resume.savedAt).toLocaleDateString()}`;
  };

  refreshSavedResume();

  const hydrateSupabaseResume = async () => {
    const { client, user } = await getSupabaseUser();
    if (!client || !user) return;
    const { data } = await client
      .from("resumes")
      .select("id,file_name,file_path,file_size,mime_type,resume_text,created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!data) return;
    store.set("applyvanta.resume", {
      id: data.id,
      name: data.file_name,
      path: data.file_path,
      type: data.mime_type || "resume",
      text: data.resume_text || "",
      size: data.file_size || 0,
      savedAt: data.created_at,
      provider: "supabase"
    });
    refreshSavedResume();
  };

  hydrateSupabaseResume();

  resumeInput?.addEventListener("change", async () => {
    const file = resumeInput.files?.[0];
    if (!file) return;
    const status = document.querySelector("#practiceSetupStatus");
    setStatusText(status, "Saving resume...");

    try {
      setStatusText(status, "Reading resume text...");
      const resumeText = (await extractResumeText(file)).slice(0, 12000);
      if (!resumeText) {
        setStatusText(status, "I saved the file, but could not read text from this resume format.");
      }

      const { client, user } = await getSupabaseUser();
      if (client && user) {
        const path = `${user.id}/${Date.now()}-${safeStorageName(file.name)}`;
        const upload = await client.storage.from("resumes").upload(path, file, {
          contentType: file.type || "application/octet-stream",
          upsert: false
        });
        if (upload.error) throw upload.error;

        const { data, error } = await client
          .from("resumes")
          .insert({
            user_id: user.id,
            file_name: file.name,
            file_path: path,
            file_size: file.size,
            mime_type: file.type || "resume",
            resume_text: resumeText
          })
          .select("id,file_name,file_path,file_size,mime_type,resume_text,created_at")
          .single();
        if (error) throw error;

        store.set("applyvanta.resume", {
          id: data.id,
          name: data.file_name,
          path: data.file_path,
          type: data.mime_type || "resume",
          text: data.resume_text || resumeText,
          size: data.file_size || 0,
          savedAt: data.created_at,
          provider: "supabase"
        });
      } else {
        if (file.size > 2_500_000) {
          setStatusText(status, "Resume is too large for browser-only storage. Create or sign in to an account first.");
          resumeInput.value = "";
          return;
        }
        const dataUrl = await readFileAsDataUrl(file);
        store.set("applyvanta.resume", {
          name: file.name,
          type: file.type || "resume",
          size: file.size,
          text: resumeText,
          dataUrl,
          savedAt: new Date().toISOString()
        });
      }

      refreshSavedResume();
      setStatusText(status, "Resume saved.");
    } catch (error) {
      setStatusText(status, `${error.message || "Could not save resume."} Make sure the storage policies were added.`);
    }
  });

  document.querySelector("#deleteResumeButton")?.addEventListener("click", async () => {
    const resume = store.get("applyvanta.resume");
    const status = document.querySelector("#practiceSetupStatus");
    try {
      const { client } = await getSupabaseUser();
      if (client && resume?.provider === "supabase") {
        if (resume.path) await client.storage.from("resumes").remove([resume.path]);
        if (resume.id) await client.from("resumes").delete().eq("id", resume.id);
      }
      setStatusText(status, "Resume deleted.");
    } catch {
      setStatusText(status, "Resume deleted locally. Remote delete can be retried later.");
    }
    store.remove("applyvanta.resume");
    if (resumeInput) resumeInput.value = "";
    refreshSavedResume();
  });

  practiceForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const setup = {
      role: document.querySelector("#targetRole")?.value.trim() || "Interview candidate",
      company: document.querySelector("#companyName")?.value.trim() || "",
      userRole: document.querySelector("#userRole")?.value.trim() || "",
      participantRole: document.querySelector("#participantRole")?.value.trim() || "",
      scenario: document.querySelector("#scenarioSelect")?.value || "General Purpose",
      responseMode: document.querySelector('input[name="responseMode"]:checked')?.value || "Quick Setup",
      customPrompt: document.querySelector("#customPrompt")?.value.trim() || "",
      model: document.querySelector("#coachModel")?.value || "Auto",
      layout: document.querySelector("#coachLayout")?.value || "Full coach",
      position: document.querySelector("#coachPosition")?.value || "Right edge",
      jobDescription: document.querySelector("#jobDescription")?.value.trim() || "",
      consent: Boolean(document.querySelector("#consentCheck")?.checked),
      resumeName: store.get("applyvanta.resume")?.name || "",
      resumeText: store.get("applyvanta.resume")?.text || "",
      updatedAt: new Date().toISOString()
    };
    const status = document.querySelector("#practiceSetupStatus");
    setStatusText(status, "Setup saved. Opening the practice room...");

    try {
      const { client, user } = await getSupabaseUser();
      const resume = store.get("applyvanta.resume");
      if (client && user) {
        const { data, error } = await client
          .from("sessions")
          .insert({
            user_id: user.id,
            role: setup.role,
            model: setup.model,
            job_description: [
              setup.company ? `Company: ${setup.company}` : "",
              setup.userRole ? `User role: ${setup.userRole}` : "",
              setup.participantRole ? `Participant role: ${setup.participantRole}` : "",
              setup.scenario ? `Scenario: ${setup.scenario}` : "",
              setup.responseMode ? `Response mode: ${setup.responseMode}` : "",
              setup.customPrompt ? `Custom instructions: ${setup.customPrompt}` : "",
              setup.jobDescription ? `Job description: ${setup.jobDescription}` : ""
            ].filter(Boolean).join("\n\n"),
            transcript: setup.resumeText ? `Resume context saved: ${setup.resumeText.slice(0, 2000)}` : null,
            resume_id: resume?.provider === "supabase" ? resume.id : null
          })
          .select("id")
          .single();
        if (error) throw error;
        setup.sessionId = data.id;
        setup.provider = "supabase";
      }
    } catch (error) {
      setStatusText(status, `${error.message || "Cloud session save failed."} Opening local practice room...`);
    }

    store.set("applyvanta.sessionSetup", setup);
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
  let sessionSetup = store.get("applyvanta.sessionSetup", {});
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
      documentStrip.querySelector("[data-session-delete-resume]")?.addEventListener("click", async () => {
        const { client } = await getSupabaseUser();
        if (client && resume.provider === "supabase") {
          if (resume.path) await client.storage.from("resumes").remove([resume.path]);
          if (resume.id) await client.from("resumes").delete().eq("id", resume.id);
        }
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
          company: sessionSetup.company || "",
          userRole: sessionSetup.userRole || "",
          participantRole: sessionSetup.participantRole || "",
          mode: sessionSetup.model || "real-time interview coaching",
          scenario: sessionSetup.scenario || "",
          customPrompt: sessionSetup.customPrompt || "",
          responseMode: sessionSetup.responseMode || "",
          jobDescription: sessionSetup.jobDescription || "",
          resumeName: resume?.name || "",
          resumeText: resume?.text || sessionSetup.resumeText || ""
        })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to generate a reply.");
      const provider = data.provider === "openai" ? `ApplyVanta.ai Coach (${data.model || "OpenAI"})` : "ApplyVanta.ai Coach (demo)";
      addAnswerMessage(data.reply, provider);
      const { client } = await getSupabaseUser();
      if (client && sessionSetup?.sessionId) {
        await client
          .from("sessions")
          .update({
            transcript: transcriptThread?.innerText || "",
            coach_notes: answerThread?.innerText || ""
          })
          .eq("id", sessionSetup.sessionId);
      }
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

  const completeDialog = document.querySelector("#completeDialog");
  const completeScreen = document.querySelector("#sessionCompleteScreen");
  const saveSessionHistory = async () => {
    const review = document.querySelector("#sessionReview")?.value.trim() || "";
    const history = store.get("applyvanta.sessionHistory", []);
    const record = {
      id: sessionSetup.sessionId || `local-${Date.now()}`,
      type: sessionSetup.module || "Interview",
      role: sessionSetup.userRole || sessionSetup.role || "Interview session",
      company: sessionSetup.company || "",
      participantRole: sessionSetup.participantRole || "",
      scenario: sessionSetup.scenario || "",
      status: "Completed",
      date: new Date().toISOString(),
      transcript: transcriptThread?.innerText || "",
      answers: answerThread?.innerText || "",
      review
    };
    store.set("applyvanta.sessionHistory", [record, ...history].slice(0, 50));

    const { client } = await getSupabaseUser();
    if (client && sessionSetup?.sessionId) {
      await client
        .from("sessions")
        .update({
          transcript: record.transcript,
          coach_notes: [record.answers, review ? `Review: ${review}` : ""].filter(Boolean).join("\n\n")
        })
        .eq("id", sessionSetup.sessionId);
    }
  };

  document.querySelector("[data-complete-open]")?.addEventListener("click", () => {
    if (completeDialog && typeof completeDialog.showModal === "function") {
      completeDialog.showModal();
    }
  });

  document.querySelector("#completeSessionButton")?.addEventListener("click", async () => {
    await saveSessionHistory();
    completeDialog?.close();
    if (completeScreen) {
      completeScreen.hidden = false;
      if (window.lucide) window.lucide.createIcons();
    }
  });

  document.querySelector("[data-review-focus]")?.addEventListener("click", () => {
    completeScreen.hidden = true;
    if (completeDialog && typeof completeDialog.showModal === "function") {
      completeDialog.showModal();
      document.querySelector("#sessionReview")?.focus();
    }
  });

  const renderHistoryPage = () => {
    const list = document.querySelector("#historyList");
    if (!list) return;
    const history = store.get("applyvanta.sessionHistory", []);
    const total = document.querySelector("#historyTotal");
    const completed = document.querySelector("#historyCompleted");
    const active = document.querySelector("#historyActive");
    if (total) total.textContent = String(history.length);
    if (completed) completed.textContent = String(history.filter((item) => item.status === "Completed").length);
    if (active) active.textContent = "0";

    const render = (items) => {
      list.innerHTML = "";
      if (!items.length) {
        list.innerHTML = `<article class="session"><div><strong>No sessions yet</strong><p>Start an interview, meeting, or phone session to save history here.</p></div></article>`;
        return;
      }
      items.forEach((item) => {
        const article = document.createElement("article");
        article.className = "session";
        article.innerHTML = `
          <span><i data-lucide="history"></i></span>
          <div><strong>${escapeHtml(item.role)}</strong><p><i data-lucide="map-pin"></i>${escapeHtml(item.company || item.scenario || item.type)}</p></div>
          <em>${escapeHtml(item.status)}</em>
          <time>${new Date(item.date).toLocaleString()}</time>
        `;
        article.addEventListener("click", () => {
          store.set("applyvanta.selectedHistory", item);
          const detail = document.querySelector("#historyDetail");
          if (detail) {
            detail.hidden = false;
            detail.innerHTML = `<h3>${escapeHtml(item.role)}</h3><p>${escapeHtml(item.company || "")}</p><h4>Transcript</h4><pre>${escapeHtml(item.transcript || "No transcript saved.")}</pre><h4>AI Answers</h4><pre>${escapeHtml(item.answers || "No answers saved.")}</pre>`;
          }
        });
        list.append(article);
      });
      if (window.lucide) window.lucide.createIcons();
    };

    render(history);
    document.querySelector("#historySearch")?.addEventListener("input", (event) => {
      const q = event.target.value.toLowerCase();
      render(history.filter((item) => [item.role, item.company, item.scenario, item.type].join(" ").toLowerCase().includes(q)));
    });
  };

  renderHistoryPage();
});
