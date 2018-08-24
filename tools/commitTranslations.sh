#!/bin/bash

cd "$( dirname "${BASH_SOURCE[0]}" )/.."
. tools/modules/colors.inc.sh
. tools/modules/verbose.inc.sh

help()
{
  echo "Usage: $0 -v"
  echo "Options: These are optional argument"
  #echo " -v verbose"
  echo " -h help"
  exit 1
}

while getopts h opt
do
  case "$opt" in
    # v) verbose true;;
    h) help; exit 1;;
    \?) help; exit 1;;
  esac
done

echo
echo "${GRN}>> Stashing current working files..${RST}"
echo

git stash && {
    node ./scripts/getTranslations.js && {
        git add src/locales && git commit -m "##Auto Generated Commit## [i18n] Translations Updated at $(env LANG=en_US.UTF-8 date)" || echo "${YLW}>> No updates found.${RST}"
    } || {
        echo
        echo "${RED}>> Get Translations failed. Aborting...${RST}"
        echo
        echo
        echo
        echo
        echo
    }

    echo
    echo "${GRN}>> Recover working files..${RST}"
    echo
    git stash pop --index
}

echo
echo "${GRN}>> Finish${RST}"
