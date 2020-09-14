#!/bin/bash

cd /app

if [[ $NODE_ENV == 'development' ]]; then
    yarn
    npm run dev
else
    npm run start
fi
