cat $1 | sed s/^/lines.append\(\'/g | sed s/$/\'\)/g | pbcopy
