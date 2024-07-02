document.addEventListener("DOMContentLoaded", () => {
    const daysElement = document.getElementById("days");
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");
    const infoButton = document.getElementById("infoButton");
    const settingsButton = document.getElementById("settingsButton");
    const infoModal = document.getElementById("infoModal");
    const settingsModal = document.getElementById("settingsModal");
    const closeInfoModal = document.getElementById("closeInfoModal");
    const closeSettingsModal = document.getElementById("closeSettingsModal");
    const motdElement = document.getElementById("motd");
    const dummyToggle = document.getElementById("dummyToggle");

    const targetDate = new Date("2024-07-22T00:00:00"); // Target date

    const messages = [
        "Fun Fact: The Earth isn't flat",
        "Roses are red, violets are blue, if you're reading this, you wasted 5 seconds",
        "Powered by ⅝ Hamster Wheel?",
        "Hello World... did you think im that basic?",
        "Fun Fact: Mens cannot be pregnant.. hopefully",
        "Do you like feet?, YES I DO. wait who said that?",
        "Im not singing for an ex though...",
        "OOGA BOOGA!!!!!!!"
    ];

    function updateCountdown() {
        const now = new Date();
        const timeDifference = targetDate - now;

        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        daysElement.innerHTML = `${days} Days`;
        hoursElement.innerHTML = `${hours} Hours`;
        minutesElement.innerHTML = `${minutes} Minutes`;
        secondsElement.innerHTML = `${seconds} Seconds`;
    }

    function setMotd() {
        const randomIndex = Math.floor(Math.random() * messages.length);
        motdElement.innerHTML = messages[randomIndex];
    }

    function handleDummyToggleChange(event) {
        const isChecked = event.target.checked;
        window.alert("Why the fuck?")
    }

    setMotd();
    updateCountdown()
    setInterval(updateCountdown, 1000);

    infoButton.addEventListener("click", () => {
        infoModal.style.display = "block";
    });

    settingsButton.addEventListener("click", () => {
        settingsModal.style.display = "block";
    });

    closeInfoModal.addEventListener("click", () => {
        infoModal.style.display = "none";
    });

    closeSettingsModal.addEventListener("click", () => {
        settingsModal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target == infoModal) {
            infoModal.style.display = "none";
        } else if (event.target == settingsModal) {
            settingsModal.style.display = "none";
        }
    });

    dummyToggle.addEventListener("change", handleDummyToggleChange);
});
