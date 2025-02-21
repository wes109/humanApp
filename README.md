The script will:
1. Start monitoring users with >100k followers
2. Send a startup notification to Discord
3. Check for status changes every 5 seconds
4. Send Discord notifications when changes are detected

## Discord Notifications
The monitor sends two types of notifications:
1. **Startup Message**: Shows how many users are being monitored
2. **Status Change Alerts**: Includes:
   - User name
   - Old and new status
   - Links to Twitter/X profile
   - Links to Human.app profile
   - Links to DexScreener (for token information)

## Technical Details
The monitor uses a reverse-engineered Human.app API endpoint that returns comprehensive user data. It maintains a local status map to track changes and uses Discord webhooks for notifications.

## Note
This tool utilizes an unofficial API endpoint. Please use responsibly and be aware that the endpoint might change or become restricted in the future.

## License
[Your chosen license]
