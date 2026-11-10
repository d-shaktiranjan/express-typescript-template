const elements = {
    previewButton: document.getElementById("previewBtn"),
    rawButton: document.getElementById("rawBtn"),
    rawFileLink: document.getElementById("rawFileLink"),
    rawActions: document.getElementById("rawActions"),
    copyRawButton: document.getElementById("copyRawBtn"),
    downloadRawButton: document.getElementById("downloadRawBtn"),
    activeFile: document.getElementById("activeFile"),
    status: document.getElementById("status"),
    viewer: document.getElementById("viewer"),
};

const state = {
    fileName: "",
    view: "preview",
    markdown: "",
};

function updateStatus(message, isError = false) {
    elements.status.textContent = message;
    elements.status.classList.toggle("error", isError);
}

function updateButtons() {
    const previewActive = state.view === "preview";
    const hasContent = Boolean(state.markdown);

    elements.previewButton.classList.toggle("active", previewActive);
    elements.rawButton.classList.toggle("active", !previewActive);
    elements.previewButton.setAttribute("aria-selected", String(previewActive));
    elements.rawButton.setAttribute("aria-selected", String(!previewActive));
    elements.rawActions.classList.toggle("hidden", previewActive);
    elements.copyRawButton.disabled = !hasContent;
    elements.downloadRawButton.disabled = !hasContent;
}

function slugifyHeading(text) {
    return text
        .normalize("NFKD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
}

function applyHeadingIds() {
    const headings = elements.viewer.querySelectorAll("h1, h2, h3, h4, h5, h6");
    const seenSlugs = new Map();

    for (const heading of headings) {
        const base = slugifyHeading(heading.textContent || "section");
        if (!base) continue;

        const count = seenSlugs.get(base) || 0;
        seenSlugs.set(base, count + 1);
        heading.id = count === 0 ? base : `${base}-${count}`;
    }
}

function applyLinkTargets() {
    const secureRelationship = ["no", "opener", " ", "no", "referrer"].join("");

    for (const link of elements.viewer.querySelectorAll("a[href]")) {
        link.target = "_blank";
        link.rel = secureRelationship;
    }
}

function scrollToHashSection() {
    if (state.view !== "preview" || window.location.hash.length <= 1) return;

    const target = document.getElementById(
        decodeURIComponent(window.location.hash.slice(1)),
    );
    if (target && elements.viewer.contains(target))
        target.scrollIntoView({ block: "start" });
}

function renderContent() {
    if (state.view === "raw") {
        elements.viewer.classList.add("raw");
        elements.viewer.textContent = state.markdown;
    } else {
        elements.viewer.classList.remove("raw");
        const renderedHtml = window.marked.parse(state.markdown, {
            breaks: true,
            gfm: true,
        });
        elements.viewer.innerHTML = window.DOMPurify.sanitize(renderedHtml, {
            USE_PROFILES: { html: true },
        });
        applyLinkTargets();
        applyHeadingIds();
        scrollToHashSection();
    }

    updateButtons();
}

function updateUrl() {
    const params = new URLSearchParams(window.location.search);
    params.set("view", state.view);
    history.replaceState(
        {},
        "",
        `?${params.toString()}${window.location.hash}`,
    );
}

async function copyRawMarkdown() {
    if (!state.markdown) return;

    try {
        if (
            navigator.clipboard &&
            typeof navigator.clipboard.writeText === "function"
        ) {
            await navigator.clipboard.writeText(state.markdown);
        } else {
            const temporaryArea = document.createElement("textarea");
            temporaryArea.value = state.markdown;
            document.body.append(temporaryArea);
            temporaryArea.select();
            document.execCommand("copy");
            temporaryArea.remove();
        }
        updateStatus("Raw markdown copied.");
    } catch {
        updateStatus("Copy failed. Check browser clipboard permissions.", true);
    }
}

function downloadRawMarkdown() {
    if (!state.markdown) return;

    const objectUrl = URL.createObjectURL(
        new Blob([state.markdown], { type: "text/markdown;charset=utf-8" }),
    );
    const link = document.createElement("a");
    link.href = objectUrl;
    link.download = state.fileName;
    document.body.append(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(objectUrl);
    updateStatus("Raw markdown download started.");
}

async function loadMarkdown() {
    updateStatus("");

    try {
        const response = await fetch(
            `${window.location.pathname.replace(/\/$/, "")}/raw`,
            {
                cache: "no-store",
            },
        );
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        state.markdown = await response.text();
        elements.activeFile.textContent = `File: ${state.fileName}`;
        renderContent();
    } catch (error) {
        state.markdown = "";
        renderContent();
        updateStatus(
            `Unable to load ${state.fileName} (${error.message}).`,
            true,
        );
    }
}

function initialize() {
    const pathParts = window.location.pathname.split("/").filter(Boolean);
    state.fileName = decodeURIComponent(pathParts[pathParts.length - 1] || "");
    elements.rawFileLink.href = `${window.location.pathname.replace(/\/$/, "")}/raw`;
    state.view =
        new URLSearchParams(window.location.search).get("view") === "raw"
            ? "raw"
            : "preview";
    updateButtons();
    loadMarkdown();
}

elements.previewButton.addEventListener("click", () => {
    state.view = "preview";
    renderContent();
    updateUrl();
});
elements.rawButton.addEventListener("click", () => {
    state.view = "raw";
    renderContent();
    updateUrl();
});
elements.copyRawButton.addEventListener("click", copyRawMarkdown);
elements.downloadRawButton.addEventListener("click", downloadRawMarkdown);
window.addEventListener("hashchange", scrollToHashSection);

initialize();
