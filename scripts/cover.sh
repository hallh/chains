#!/bin/bash

./node_modules/.bin/babel-node node_modules/.bin/isparta cover _mocha -- test/unit/**/*.spec.js
