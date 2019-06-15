#!/bin/bash

echo "This program will calculate:"
echo "How many dats before your demolization data."
read -p "Please input your demolization date(YYYYMMDD ex>20161212):" date2

date_d=$(echo $date2 | grep '[0-9]\{8\}')
if [ "$date_d" == "" ]; then
    echo "You input the wrong date format..."
    exit 1
fi

declare -i date_dem=`date --date="$date2" +%s`
declare -i date_now=`date +%s`
declare -i date_total_s=$(($date_dem-$date_now))
declare -i date_d=$(($date_total_s/60/60/24))

if [ "$date_total_s" -lt "0" ]; then
    echo "You had been demolization before:" $((-1*$date_d)) " ago"
else
    declare -i date_h=$(($(($date_total_s-$date_d*60*60*24))/60/60/24))
    echo "You will demoblize after $date_d days and $date_h hours."
fi
