#!/bin/bash

cd "$( dirname "${BASH_SOURCE[0]}" )"

. modules/colors.inc.sh
. modules/verbose.inc.sh

cd ..

help()
{
    echo "Usage: $0 -v"
    echo "Options: These are optional argument"
    echo " -v verbose"
    exit 1
}

VERBOSE=false
while getopts vh opt
do
    case "$opt" in
        v) verbose true; VERBOSE=true;;
        h) help;;
        \?) help;;
    esac
done

myEcho()
{
    echo ">> $1"
}
PATH="$PATH:$(pwd)/node_modules/.bin/"

if ! hash sequelize 2>/dev/null; then
    myEcho "${RED}====sequelize-cli not found.====${RST}"
    myEcho "Installing via ${BLU}'yarn add sequelize-cli'${RST}"
    yarn add sequelize-cli
else
    myEcho "${BLU}====sequelize-cli found====${RST}"
fi

if ! hash mysql 2>/dev/null; then
    myEcho "${RED}====mysql not found.====${RST}"
    myEcho "Install mysql and try again."
    myEcho "If you're on OsX, you can try '${YLW}brew install mysql'"
    exit 1;
fi

mysqlshow --user=root coindo* | grep -v Wildcard | grep -o coindo_development > /dev/null
if [ $? -eq 0 ]; then
    myEcho "${BLU}====Database:coindo_development found.====${RST}"
else
    myEcho "${YLW}====Database:coindo_development not found.====${RST}"
    myEcho "${BLU}Running${RST} 'NODE_ENV=development sequelize db:create'"
    myEcho 'sequelize db:create'
    export NODE_ENV=development
    sequelize db:create 2>&4
    if [ ! $? -eq 0 ]; then
        myEcho "${RED}sequelize db:create failed.${RST}"
        printf ">> "
        sequelize db:create 2> /dev/stdout | grep 'ERROR'
        myEcho "${RED}Unknown Error. Please try again{RST}"
        exit 1;
    fi
    myEcho "${GRN}Done${RST}"
    myEcho ''
fi

mysqlshow --user=root coindo* | grep -v Wildcard | grep -o coindo_production > /dev/null
if [ $? -eq 0 ]; then
    myEcho "${BLU}====Database:coindo_production found.====${RST}"
else
    myEcho "${YLW}====Database:coindo_production not found.====${RST}"
    myEcho "${BLU}Running${RST} 'NODE_ENV=production sequelize db:create'"
    myEcho 'sequelize db:create'
    export NODE_ENV=production
    sequelize db:create 2>&4
    if [ ! $? -eq 0 ]; then
        myEcho "${RED}sequelize db:create failed.${RST}"
        printf ">> "
        sequelize db:create 2> /dev/stdout | grep 'ERROR'
        myEcho "${RED}Unknown Error. Please try again{RST}"
        exit 1;
    fi
    myEcho "${GRN}Done${RST}"
    myEcho ''
fi

myEcho "${BLU}Running${RST} 'NODE_ENV=development sequelize db:migrate'"
myEcho 'sequelize db:migrate'
export NODE_ENV=development
sequelize db:migrate 2>&4
if [ ! $? -eq 0 ]; then
    myEcho "${RED}sequelize db:migrate failed.${RST}"
    printf ">> "
    sequelize db:migrate 2> /dev/stdout | grep 'ERROR'
    sequelize db:migrate 2> /dev/stdout | grep 'ECONNREFUSED' > /dev/null
    if [ $? -eq 0 ]; then
        myEcho 'Your mysql server might not running. Check your mysql server and try again'
        if ! $VERBOSE; then
            myEcho "${YLW}To see the full output, please use '-v' option${RST}"
        fi
    else
        myEcho "${RED}Unknown Error. Please try again{RST}"
    fi
    exit 1;
fi
myEcho "${GRN}Done${RST}"

myEcho "${BLU}Running${RST} 'NODE_ENV=production sequelize db:migrate'"
myEcho 'sequelize db:migrate'
export NODE_ENV=production
sequelize db:migrate 2>&4
if [ ! $? -eq 0 ]; then
    myEcho "${RED}sequelize db:migrate failed.${RST}"
    printf ">> "
    sequelize db:migrate 2> /dev/stdout | grep 'ERROR'
    sequelize db:migrate 2> /dev/stdout | grep 'ECONNREFUSED' > /dev/null
    if [ $? -eq 0 ]; then
        myEcho 'Your mysql server might not running. Check your mysql server and try again'
        if ! $VERBOSE; then
            myEcho "${YLW}To see the full output, please use '-v' option${RST}"
        fi
    else
        myEcho "${RED}Unknown Error. Please try again{RST}"
    fi
    exit 1;
fi
myEcho "${GRN}Done${RST}"

myEcho 'Success'

