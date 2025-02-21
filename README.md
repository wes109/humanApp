# Human.app Token Monitor 🔍

> Real-time monitoring tool for Human.app token status changes and DEX listings.

## 📝 Overview

This tool monitors Human.app user tokens and their status changes. Human.app is a SocialFi platform where popular Twitter/X influencers automatically receive their own tokens that people can invest in. The monitor tracks high-follower accounts and sends notifications through Discord when their token status changes.


![Captu1re](https://github.com/user-attachments/assets/e0554eee-3544-4af7-83e7-8cf6a8437f87)


## ✨ Features

- 🔄 Real-time monitoring of Human.app users with >100k followers
- 🚀 Instant status change detection
- 📊 Discord webhook integration for notifications
- 🔗 Automatic linking to Twitter, Human.app, and DexScreener
- 📈 Startup statistics and monitoring metrics

## 🛠️ Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- Discord webhook URL

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/wes109/humanApp.git
   cd humanApp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure the monitor:
   - Open `monitor.js`
   - Replace `DISCORD_WEBHOOK_URL` with your Discord webhook URL
   - (Optional) Adjust `MIN_SUBSCRIBERS` and `CHECK_INTERVAL` as needed

## 🚀 Usage

Run the monitor:
```bash
node monitor.js
```

## 🔄 Monitoring Process

The script performs the following operations:
1. Initializes monitoring for users with >100k followers
2. Sends a startup notification to Discord
3. Checks for status changes every 5 seconds
4. Dispatches Discord notifications when changes are detected

## 📬 Discord Notifications

The monitor sends two types of notifications:

### 1. Startup Message
- Total number of users being monitored
- Initialization confirmation

### 2. Status Change Alerts
- User name and profile information
- Previous and current token status
- Direct links to:
  - Twitter/X profile
  - Human.app profile
  - DexScreener token information

## 🔧 Technical Details

The monitor leverages a reverse-engineered Human.app API endpoint that returns comprehensive user data. It maintains a local status map to track changes and utilizes Discord webhooks for real-time notifications.

## ⚠️ Important Note

This tool utilizes an unofficial API endpoint. Please use responsibly and be aware that the endpoint might change or become restricted in the future.

## 📄 License

MIT License - See [LICENSE](LICENSE) for details

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/wes109/humanApp/issues).

## 📞 Support

For support, please open an issue in the GitHub repository.
