# Advent of Code Leaderboard Script (`aoc_leaderboard.sh`)

This script automates the retrieval and notification of updates to a private Advent of Code leaderboard. It fetches leaderboard data, checks for new activity, formats the results, and posts updates to a designated Slack channel.

## Requirements

- **Bash**: Ensure you have a Bash shell environment to run the script.
- **Tools**:
  - `curl`: For downloading leaderboard data and posting to Slack.
  - `jq`: For parsing JSON data.
- **Slack Webhook**: A valid Slack webhook URL for sending updates to your Slack workspace.

---

## Configuration

Before using the script, update the following variables to match your requirements:

- **`JSON_URL`**: The URL to your private Advent of Code leaderboard.
- **`JSON_FILE`**: The file where leaderboard data will be stored locally.
- **`TIMESTAMP_FILE`**: The file used to track the last processed update.
- **`SLACK_WEBHOOK`**: The URL for posting updates to Slack.
- **`SLACK_CHAN`**: The Slack channel where updates should be sent (e.g., `#general`).
- **`SESSION_COOKIE`**: Your Advent of Code session cookie for authenticated requests.

---

## How It Works

1. **Initial Setup**:
   - Ensures that `TIMESTAMP_FILE` exists and initializes it if absent.
   - Reads the last processed timestamp from `TIMESTAMP_FILE`.

2. **Fetch Leaderboard Data**:
   - Downloads the JSON file of the leaderboard using `curl` with the provided session cookie.

3. **Detect New Updates**:
   - Finds the most recent activity timestamp (`MAX_TIMESTAMP`) in the downloaded JSON.
   - Compares it with the last processed timestamp (`LAST_TIMESTAMP`).

4. **Generate Leaderboard Summary**:
   - Formats leaderboard data into a neat table:
     - Includes name, stars earned, and score.
     - Highlights new updates with an asterisk (`*`).

5. **Send to Slack**:
   - If updates are detected, sends the formatted summary to the specified Slack channel.

---

## Usage

1. **Prepare Dependencies**:
   - Install `jq` if it's not already installed:
     ```bash
     sudo apt install jq   # Debian/Ubuntu
     brew install jq       # macOS
     ```

2. **Run the Script**:
   - Make the script executable:
     ```bash
     chmod +x aoc_leaderboard.sh
     ```
   - Execute it:
     ```bash
     ./aoc_leaderboard.sh
     ```

3. **Automate**:
   - Add the script to a cron job for periodic execution:
     ```bash
     */15 * * * * /path/to/aoc_leaderboard.sh
     ```
     This example checks for updates every 15 minutes.

---

## Example Output

When new updates are detected, the script sends a message to the configured Slack channel:

```
Leaderboard Update:
Name              Stars  Score
Alice             40     1200*
Bob               38     1100
Charlie           30     900
```

If no updates are detected, the script outputs:
```
No updates detected.
```
---

## Notes

- **Authentication**: The `SESSION_COOKIE` must remain private. It authenticates your requests to the Advent of Code server.
- **Formatting**: The table dynamically adjusts column widths based on the longest name in the leaderboard.
- **Slack Integration**: Customize the payload in the script if you want additional features, such as adding attachments or modifying the bot's icon.

