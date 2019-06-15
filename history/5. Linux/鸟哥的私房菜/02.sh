#!/bin/bash

read -p "Please enter your birthday:" birthday
declare -i birthday=$(echo $birthday | grep '[0-9]\{8\}')
declare -i yyyy=`date +%Y`
declare -i mmdd=`date +%mm+%dd`
echo "yyyy: $yyyy mmdd: $mmdd"
echo $birthday
