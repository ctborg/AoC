#!/bin/bash

# Edit these as needed
JSON_URL="https://adventofcode.com/2024/leaderboard/private/view/xxxx.json"
JSON_FILE=""
TIMESTAMP_FILE="last_timestamp.txt"
SLACK_WEBHOOK=""
SLACK_CHAN=""
SESSION_COOKIE=""

# Ensure the timestamp file exists
if [ ! -f "$TIMESTAMP_FILE" ]; then
   echo "0" > "$TIMESTAMP_FILE"
fi

# Read the last timestamp from the file
LAST_TIMESTAMP=$(cat "$TIMESTAMP_FILE")

# Ensure LAST_TIMESTAMP is a valid integer
if ! [[ "$LAST_TIMESTAMP" =~ ^[0-9]+$ ]]; then
   echo "0" > "$TIMESTAMP_FILE"
     LAST_TIMESTAMP=0
fi

# Download the JSON file with the session cookie
curl -s -H "Cookie: session=$SESSION_COOKIE" "$JSON_URL" -o "$JSON_FILE"

# Extract the maximum timestamp from the JSON file
MAX_TIMESTAMP=$(jq -r '
  .members | 
     to_entries | 
map(.value.last_star_ts) | 
  max' "$JSON_FILE")

  # Ensure MAX_TIMESTAMP is a valid integer
  if ! [[ "$MAX_TIMESTAMP" =~ ^[0-9]+$ ]]; then
     MAX_TIMESTAMP=0
  fi

  # Compare timestamps
  if [ "$MAX_TIMESTAMP" -gt "$LAST_TIMESTAMP" ]; then
     # Update the timestamp file
echo "$MAX_TIMESTAMP" > "$TIMESTAMP_FILE"

  # Find the maximum name length
    MAX_NAME_LENGTH=$(jq -r '
 .members | 
  to_entries | 
  map(.value.name | length) | 
  max' "$JSON_FILE")

  # Parse the JSON and format the output, marking changes with "*"
  RESULT=$(
  {
  printf "%-${MAX_NAME_LENGTH}s    %-5s    %-5s\n" "Name" "Stars" "Score"
 jq -r --arg last_ts "$LAST_TIMESTAMP" --argjson max_len "$MAX_NAME_LENGTH" '
  .members | 
    to_entries | 
     map(.value) | 
      map({name: .name, stars: .stars, score: .local_score, last_star_ts: .last_star_ts}) | 
sort_by(-.score) | 
  map(
    .name = (.name + (" " * (16 - (.name | length)) )) |
  if .last_star_ts | tonumber > ($last_ts | tonumber) then
 "\(.name)      \(.stars)\(.score)*"
    else
   "\(.name) \(.stars)\(.score)"
      end
  ) | 
  .[]
    ' "$JSON_FILE"
   }
  )

# Format the payload for Slack
  PAYLOAD=$(cat <<EOF
payload={
  "channel": "$SLACK_CHAN",
  "username": "AOC BOT",
  "text": "Leaderboard Update:\n\`\`\`\n$RESULT\n\`\`\`",
  "icon_emoji": ":santa:"
}
EOF
  )

  # Post the result to Slack
  curl -s -X POST --data-urlencode "$PAYLOAD" "$SLACK_WEBHOOK"

  echo "Results sent to Slack."
else
  echo "No updates detected."
  f
