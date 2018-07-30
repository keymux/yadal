#!/usr/bin/env bash

# TODO: Move all of this js stuff into a node module
# Tests the binary file scripts/prevent_clobber.js

SCRIPTS_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd -P )"
SCRIPTS_DIR="${SCRIPTS_DIR:?}"
ROOT_DIR="$(realpath "${SCRIPTS_DIR}/..")"
INTEGRATION_DIR="${ROOT_DIR}/test/integration"
REPORTS_DIR="${ROOT_DIR}/reports"
MOCHAWESOME_JSON="${REPORTS_DIR}/integration/mochawesome.json"
MARKDOWN_FILE="${REPORTS_DIR}/integration.md"

. "${SCRIPTS_DIR}/lib.sh"

dockerComposeDown
dockerComposeUp
