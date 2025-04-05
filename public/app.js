const triggerButton = document.querySelector('#trigger');
const outputArea = document.querySelector('#output');
const messageBox = document.querySelector('#message');

// API keys
const PEXELS_API_KEY = 'sZPdNy5wSGnffudbele9zEz22qVuB76ZEsLRhQ5aURFLay3OpA5ibuwt';
const NINJAS_API_KEY = 'KTuAo3wpNd+UV932sMtiwA==Gg4e9RilOjj2wz8R';

triggerButton.addEventListener('click', () => {
    messageBox.textContent = "Fetching quote...";
    outputArea.innerHTML = "<p>Fetching image...</p>";

    // --- Fetch random quote from API Ninjas ---
    fetch('https://api.api-ninjas.com/v1/quotes', {
        headers: {
            'X-Api-Key': NINJAS_API_KEY
        }
    })
    .then(res => {
        if (!res.ok) throw new Error(`Quote API error: ${res.status}`);
        return res.json();
    })
    .then(data => {
        if (data.length > 0) {
            const quote = `"${data[0].quote}" — ${data[0].author}`;
            messageBox.textContent = quote;
        } else {
            throw new Error("No quote found");
        }
    })
    .catch(err => {
        console.error("Quote error:", err);
        messageBox.textContent = "Could not load quote.";
    });

    // --- Fetch a random image from Pexels ---
    const query = 'space wallpaper'; // Customize this as needed
    const apiUrl = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=5`;

    fetch(apiUrl, {
        headers: {
            'Authorization': PEXELS_API_KEY
        }
    })
    .then(res => {
        if (!res.ok) throw new Error(`Pexels API error: ${res.status}`);
        return res.json();
    })
    .then(data => {
        if (data.photos && data.photos.length > 0) {
            const randomIndex = Math.floor(Math.random() * data.photos.length);
            const imgURL = data.photos[randomIndex].src.large;

            outputArea.innerHTML = `<img src="${imgURL}" alt="Wallpaper" class="daily-image">`;
        } else {
            throw new Error("No images found");
        }
    })
    .catch(err => {
        console.error("Image error:", err);
        outputArea.innerHTML = "<p class='error'>Could not load image.</p>";
    });
});

