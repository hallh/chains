#!/bin/bash

./node_modules/.bin/mocha --compilers js:babel-core/register test/unit/**/*.spec.js
