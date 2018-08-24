#!/bin/bash

cd "$( dirname "${BASH_SOURCE[0]}" )/.."
. tools/modules/colors.inc.sh
. tools/modules/verbose.inc.sh

help_move_build_folder()
{
  echo "Usage: $0 -v"
  echo "Options: These are optional argument"
  echo " -v verbose"
  echo " -h help"
  echo " -l run only if running in linux machine"
  exit 1
}

while getopts vlh opt
do
  case "$opt" in
    v) verbose true;;
    l)
        if [ ! $(uname -s) == "Linux" ]; then
            exit 0
        fi
        ;;
    h) help_move_build_folder; exit 1;;
    \?) help_move_build_folder; exit 1;;
  esac
done

echo "== executing commands... =="

echo "rm -rf deploy"
rm -rf deploy

echo "cp -r build build deploy"
cp -r build deploy
