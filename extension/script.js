// ===== Element references =====
const dropZone = document.getElementById("dropZone");
const fileInput = document.getElementById("fileInput");

const errorModal = document.getElementById("errorModal");
const errorOkBtn = document.getElementById("errorOkBtn");

const confirmModal = document.getElementById("confirmModal");
const confirmText = document.getElementById("confirmText");
const confirmYesBtn = document.getElementById("confirmYesBtn");
const confirmNoBtn = document.getElementById("confirmNoBtn");

const progressContainer = document.getElementById("progressContainer");
const progressTrack = document.getElementById("progressTrack");
const progressFill = document.getElementById("progressFill");
const progressSize = document.getElementById("progressSize");

let pendingFile = null;

// Progress bar width scaling config (in pixels)
const MIN_BAR_WIDTH = 120;
const MAX_BAR_WIDTH = 320;
// Treat anything at or above this file size as "max width" for scaling purposes
const SCALE_REFERENCE_MB = 50;

// ===== 1. Upload trigger: click anywhere in the drop zone =====
dropZone.addEventListener("click", () => {
    fileInput.click();
});

fileInput.addEventListener("change", () => {
    if (fileInput.files.length > 0) {
        handleFile(fileInput.files[0]);
    }
});

// ===== 1. Upload trigger: drag and drop =====
dropZone.addEventListener("dragover", (e) => {
    e.preventDefault(); // required to allow a drop to fire
    dropZone.classList.add("drag-over");
});

dropZone.addEventListener("dragleave", () => {
    dropZone.classList.remove("drag-over");
});

dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropZone.classList.remove("drag-over");

    // Only counts if the file is released while inside the drop zone.
    // Since this listener is attached directly to dropZone, the browser
    // only fires it when the release happens within its bounds.
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleFile(files[0]);
    }
});

// ===== 2. File validation =====
function handleFile(file) {
    const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");

    if (!isPdf) {
        showErrorModal();
        fileInput.value = ""; // reset so the same file can be re-selected later
        return;
    }

    pendingFile = file;
    showConfirmModal(file.name);
}

function showErrorModal() {
    errorModal.classList.remove("hidden");
}

function hideErrorModal() {
    errorModal.classList.add("hidden");
}

errorOkBtn.addEventListener("click", hideErrorModal);

function showConfirmModal(fileName) {
    confirmText.textContent = `Do you want to upload ${fileName}?`;
    confirmModal.classList.remove("hidden");
}

function hideConfirmModal() {
    confirmModal.classList.add("hidden");
}

confirmNoBtn.addEventListener("click", () => {
    pendingFile = null;
    fileInput.value = "";
    hideConfirmModal();
});

confirmYesBtn.addEventListener("click", () => {
    hideConfirmModal();
    if (pendingFile) {
        startUpload(pendingFile);
    }
});

// ===== 3. Upload progress indicator =====
function startUpload(file) {
    const fileSizeMB = file.size / (1024 * 1024);

    // Scale the bar's width based on file size, capped between MIN and MAX
    const scaleRatio = Math.min(fileSizeMB / SCALE_REFERENCE_MB, 1);
    const barWidth = MIN_BAR_WIDTH + scaleRatio * (MAX_BAR_WIDTH - MIN_BAR_WIDTH);

    progressTrack.style.width = `${barWidth}px`;
    progressFill.style.width = "0%";
    progressSize.textContent = `${fileSizeMB.toFixed(2)} MB`;

    progressContainer.classList.remove("hidden");

    uploadWithProgress(file);
}

// Placeholder upload — simulates progress for now.
// Swap this out later for a real upload (e.g. fetch with XMLHttpRequest
// for progress events, once the backend exists).
function uploadWithProgress(file) {
    let percent = 0;

    const interval = setInterval(() => {
        percent += 4;
        if (percent >= 100) {
            percent = 100;
            clearInterval(interval);
            onUploadComplete(file);
        }
        progressFill.style.width = `${percent}%`;
    }, 80);
}

function onUploadComplete(file) {
    console.log("Upload complete:", file.name);
    // Next step: send file to backend for TOC extraction / page mapping.
}