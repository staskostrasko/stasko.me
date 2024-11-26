// Replace this with your webhook URL
const webhookURL = "https://discord.com/api/webhooks/1309873090486075473/Pq2zUaZIxdKkFzBhIbntyBnSWIQPF2z4F9JusM2CmEgjpw8OCyLaj8ft4FvyfZUQX2rG";

// Function to send the report
document.getElementById("report-form").addEventListener("submit", async function (e) {
    e.preventDefault(); // Prevent form from refreshing the page

    // Get input values
    const discordId = document.getElementById("discord-id").value;
    const scamDetails = document.getElementById("scam-details").value;

    // Fetch the user's IP address
    let userIp = "Unavailable";
    try {
        const ipResponse = await fetch("https://api.ipify.org?format=json");
        const { ip } = await ipResponse.json();
        userIp = ip;
    } catch (err) {
        console.error("Error fetching IP:", err);
    }

    // Construct the Discord message
    const data = {
        content: null,
        embeds: [
            {
                title: "New Scam Report",
                description: `A new scam report has been submitted.`,
                color: 16711680, // Red color
                fields: [
                    { name: "Discord ID", value: discordId || "Not provided", inline: true },
                    { name: "Scam Details", value: scamDetails || "No details provided", inline: false },
                    { name: "User IP Address", value: userIp, inline: true },
                ],
                timestamp: new Date(),
            },
        ],
    };

    // Send the data to Discord Webhook
    try {
        const response = await fetch(webhookURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            alert("Your report has been submitted successfully.");
        } else {
            alert("Failed to send the report. Please try again.");
        }
    } catch (error) {
        console.error("Error sending the report:", error);
        alert("An error occurred. Please try again.");
    }
});

// Fetch the user's IP address and display it in the UI
async function fetchIP() {
    try {
        const response = await fetch("https://api.ipify.org?format=json");
        const { ip } = await response.json();

        // Insert the IP address into the hidden span
        const hiddenIpSpan = document.querySelector(".hidden-ip");
        hiddenIpSpan.textContent = ip;
    } catch (error) {
        console.error("Failed to fetch IP:", error);
    }
}

// Call the function on page load
fetchIP();


