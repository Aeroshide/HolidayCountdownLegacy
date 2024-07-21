document.addEventListener("DOMContentLoaded", () => {
    const infoButton = document.getElementById("infoButton");
    const settingsButton = document.getElementById("settingsButton");
    const eventsButton = document.getElementById("eventsButton");
    const infoModal = document.getElementById("infoModal");
    const settingsModal = document.getElementById("settingsModal");
    const eventsModal = document.getElementById("eventsModal");
    const closeInfoModal = document.getElementById("closeInfoModal");
    const closeSettingsModal = document.getElementById("closeSettingsModal");
    const closeEventsModal = document.getElementById("closeEventsModal");

    infoButton.addEventListener("click", () => {
        infoModal.style.display = "block";
    });

    settingsButton.addEventListener("click", () => {
        settingsModal.style.display = "block";
    });

    eventsButton.addEventListener("click", () => {
        eventsModal.style.display = "block";
    });

    closeInfoModal.addEventListener("click", () => {
        infoModal.style.display = "none";
    });

    closeSettingsModal.addEventListener("click", () => {
        settingsModal.style.display = "none";
    });

    closeEventsModal.addEventListener("click", () => {
        eventsModal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target == infoModal) {
            infoModal.style.display = "none";
        } else if (event.target == settingsModal) {
            settingsModal.style.display = "none";
        } else if (event.target == eventsModal) {
            eventsModal.style.display = "none";
        }
    });
});
