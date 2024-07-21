async function fetchDataFromUrl(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Could not fetch for update. HTTP status code: ${response.status}`);
        }
        return await response.text();
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function getGistRawUrl(gistId) {
    const apiGistUrl = `https://api.github.com/gists/${gistId}`;
    try {
        const response = await fetch(apiGistUrl);
        if (!response.ok) {
            throw new Error(`Error fetching Gist data. HTTP status code: ${response.status}`);
        }
        const gistJson = await response.json();
        const files = gistJson.files;
        if (files && files['events.json']) {
            return files['events.json'].raw_url;
        } else {
            console.error("Error: 'events.json' file not found in the Gist.");
            return null;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function fetchEvents() {
    const gistId = '3c0c289630fcb2279e262caca37fb30b';
    const rawUrl = await getGistRawUrl(gistId);
    if (!rawUrl) {
        return [];
    }
    const data = await fetchDataFromUrl(rawUrl);
    if (!data) {
        return [];
    }
    return JSON.parse(data).events;
}

function getEarliestEvent(events) {
    const now = new Date();
    return events
        .map(event => ({ ...event, date: new Date(event.date) }))
        .filter(event => event.date > now)
        .sort((a, b) => a.date - b.date)[0];
}

function updateCountdown(targetDate, elements) {
    const now = new Date();
    const timeDifference = targetDate - now;

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    elements.daysElement.innerHTML = `${days} Days`;
    elements.hoursElement.innerHTML = `${hours} Hours`;
    elements.minutesElement.innerHTML = `${minutes} Minutes`;
    elements.secondsElement.innerHTML = `${seconds} Seconds`;
}

function populateEventsList(events, container) {
    container.innerHTML = events
        .map((event, index) => {
            const now = new Date();
            const timeDifference = new Date(event.date) - now;
            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

            return `
                <div class="event" id="event-${index}">
                    <h3>${event.description}</h3>
                    <p id="event-${index}-countdown">${days} Days, ${hours} Hours, ${minutes} Minutes, ${seconds} Seconds</p>
                </div>
            `;
        })
        .join('');

    events.forEach((event, index) => {
        const countdownElement = document.getElementById(`event-${index}-countdown`);
        setInterval(() => {
            const now = new Date();
            const timeDifference = new Date(event.date) - now;
            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

            countdownElement.innerHTML = `${days} Days, ${hours} Hours, ${minutes} Minutes, ${seconds} Seconds`;
        }, 1000);
    });
}


document.addEventListener("DOMContentLoaded", async () => {
    const daysElement = document.getElementById("days");
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");
    const eventTitle = document.getElementById("eventTitle");
    const eventsList = document.getElementById("eventsList");
    const fetchingModal = document.getElementById("fetchingModal");

    // Show "Fetching from server..." message
    fetchingModal.style.display = "block";

    const events = await fetchEvents();
    const earliestEvent = getEarliestEvent(events);

    if (earliestEvent) {
        eventTitle.innerHTML = earliestEvent.description;
        updateCountdown(earliestEvent.date, { daysElement, hoursElement, minutesElement, secondsElement });
        setInterval(() => updateCountdown(earliestEvent.date, { daysElement, hoursElement, minutesElement, secondsElement }), 1000);
    }

    populateEventsList(events, eventsList);

    // Hide "Fetching from server..." message
    fetchingModal.style.display = "none";
});
