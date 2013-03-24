#!/bin/sh

# Deps:
# sudo apt-get install inotify-tools

COMMAND=$@

set -eu

help() {
  echo "
  Run command on file changes.

  usage: $(basename $0) <command>
  "
}

[ "$COMMAND" = "--help" -o "$COMMAND" = "-h" ] && help && exit 0
[ -z "$COMMAND" ] && help && exit 1

RED="\033[31m"
GREEN="\033[32m"
RESET="\033[0m"

while true
do
  $COMMAND && {
    echo -e "${GREEN}Build OK!${RESET}"
  } || {
    echo -e "${RED}Build broken!${RESET}"
  }

  inotifywait --event modify --recursive .
done
