#!/bin/bash
if["$1"="start"]
then
    cd Code/start;
    ttab -d server npm run dev;
    ttab -d client npm run dev;
    wstorm ~/Code/start;
elif ["$1"=""]
then   
    echo specify project name;
else
    echo $1 unknown project;
fi            