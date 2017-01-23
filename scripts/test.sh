#!/bin/sh

yarn build

if [[ -z $(git status -s) ]]
then
  echo "tree is clean"
else
  echo "tree is dirty, please rebuild stylesheets"
  exit
fi

