#!/bin/bash

cd "$( dirname "${BASH_SOURCE[0]}" )/../src/components"

# find . -type d -depth 2 | sed s/\/ /g

find . -type d -depth 2 | sed 's/\.\///g' | sed 's/\// /g' | while read p; do
  echo python ./scripts/generate-component.py $p $1
done  
