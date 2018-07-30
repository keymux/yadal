#!/usr/bin/env bash

MY_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd -P )"
MY_DIR="${MY_DIR:?}"
SCRIPTS_DIR="$(realpath "${MY_DIR}/..")"
ROOT_DIR="$(realpath "${SCRIPTS_DIR}/..")"
REPORTS_DIR="${ROOT_DIR}/reports"
LOG_FILE="${REPORTS_DIR}/github_cli.log"
BODY_FILE="${REPORTS_DIR}/reports.md"

. "${SCRIPTS_DIR}/lib.sh"

export ghprbGhRepository="$(echo "${JOB_NAME}" | sed 's/\/[^/]*$//')"
export ghprbPullId="$(echo "${JOB_NAME}" | grep -oE "[0-9]+$")"

export BODY_FILE

github_cli createAnIssueComment > "${LOG_FILE}" 2>&1
CODE=$?

if [ ${CODE} -ne 0 ]; then
  cat "${LOG_FILE}"

  exit ${CODE}
fi
