async function fetchDataFromUrl(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Could not fetch data. HTTP status code: ${response.status}`);
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

async function fetchMotd() {
    const gistId = '3c0c289630fcb2279e262caca37fb30b'; // Replace with your actual Gist ID
    const rawUrl = await getGistRawUrl(gistId);
    if (!rawUrl) {
        return [];
    }
    const data = await fetchDataFromUrl(rawUrl);
    if (!data) {
        return [];
    }
    const jsonData = JSON.parse(data);
    return jsonData.motd;
}

function setMotd(messages, element) {
    const randomIndex = Math.floor(Math.random() * messages.length);
    element.innerHTML = messages[randomIndex];
}

document.addEventListener("DOMContentLoaded", async () => {
    const motdElement = document.getElementById("motd");
    const messages = await fetchMotd();
    setMotd(messages, motdElement);
});
