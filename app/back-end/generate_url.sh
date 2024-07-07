#!/bin/bash

# Check if tournament ID argument is provided
if [ -z "$1" ]; then
  echo "Usage: $0 <tournament_id>"
  exit 1
fi

TOURNAMENT_ID=$1
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
# Define the log file
LOG_FILE="${DIR}/data.log"
OUTPUT_FILE="${DIR}/urls.log"
echo "Log file: $LOG_FILE"

# Clear the output file if it exists
> "$OUTPUT_FILE"

# Extract all user access tokens and generate URLs
awk -v tournament_id="$TOURNAMENT_ID" -v output_file="$OUTPUT_FILE" '
  BEGIN {RS=""; FS="\n"; user_count=0}
  $1 ~ "User [0-9]+ Tokens:" {
    user_count++
    for(i=1; i<=NF; i++) {
      if ($i ~ "Access:") {
        split($i, arr, ": ")
        access=arr[2]
        printf "wss://localhost/ws/pingpong/tournament/%s/?token=%s&watch=false\n", tournament_id, access >> output_file
        printf "\n" >> output_file
      }
    }
  }
  END {if (user_count == 0) print "No users found in the log file"}
' "$LOG_FILE"

echo "URLs have been generated and saved to $OUTPUT_FILE"
