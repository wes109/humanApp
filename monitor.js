const axios = require('axios');

const API_URL = 'https://identity.human.ac/api/v1/coins/search?query=&limit=1000000'; // Proxy API URL
const MIN_SUBSCRIBERS = 100000; // Minimum subscribers to monitor
const CHECK_INTERVAL = 5000; // Check every 1 minute
const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1333202908036202586/DrWcgqwVKG0waPchN4AcdmvVzM_yHaReJTC4MhetRMoalPRqP3ywCkVJZtUJQ1fZJk-P'; // Replace with your actual webhook URL

let userStatusMap = {}; // Stores the latest known status of users

// Function to send a Discord webhook
async function sendDiscordWebhook(embed) {
    try {
        await axios.post(DISCORD_WEBHOOK_URL, { embeds: [embed] });
    } catch (error) {
        console.error("Error sending Discord webhook:", error.message);
    }
}

// Function to fetch and filter users by subscriber count
async function fetchUsers() {
    try {
        const response = await axios.get(API_URL);
        return response.data.filter(user => user.x_subscribers_amount >= MIN_SUBSCRIBERS);
    } catch (error) {
        console.error("Error fetching API data:", error.message);
        return [];
    }
}

// Function to initialize user status tracking and send a startup webhook
async function initializeUserStatus() {
    const users = await fetchUsers();
    users.forEach(user => {
        userStatusMap[user.x_username] = user.status;
    });

    console.log(`Tracking ${users.length} users.`);

    // Send startup webhook
    const embed = {
        title: "🔍 Human.app Monitor Started",
        description: `Monitoring **${users.length}** high-follower X users.`,
        color: 3447003 // Blue color
    };

    await sendDiscordWebhook(embed);
}

// Function to check for status changes and send webhook alerts
async function checkForStatusChanges() {
    const users = await fetchUsers();
    let changesLog = [];

    for (const user of users) {
        const previousStatus = userStatusMap[user.x_username];

        if (previousStatus !== undefined && user.status !== previousStatus) {
            changesLog.push({
                name: `👤 ${user.name}`,
                value: `**Old Status:** ${previousStatus}\n**New Status:** ${user.status}\n[🔗 Dexscreener](https://dexscreener.com/solana/${user.address})`,
                inline: false
            });

            // Update stored status
            userStatusMap[user.x_username] = user.status;
        }
    }

    if (changesLog.length > 0) {
        const embed = {
            title: "⚠️ Status Changes Detected",
            description: "One or more users have had their status updated.",
            color: 15158332, // Red color
            fields: changesLog.concat(
                { name: 'Twitter', value: `[${user.x_username}](https://x.com/${user.x_username})`, inline: true },
                { name: 'Human.app', value: `[${user.x_username}](https://explore.human.app/${user.x_username})`, inline: true }
            ),
            timestamp: new Date().toISOString()
        };

        await sendDiscordWebhook(embed);
    } else {
        console.log("No status changes detected.");
    }
}

// Function to start monitoring
async function monitorUsers() {
    await initializeUserStatus();

    setInterval(async () => {
        await checkForStatusChanges();
    }, CHECK_INTERVAL);
}

// Run the script
monitorUsers();
