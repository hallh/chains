//import {Chains} from './src/chains.js';

var Chains = require('./index.js');

Chains({ hi: "init" })
    .then((state, n) => { console.log("1: state.hi = ", state.hi); n(); })
    .then((state, n) => { state.hi = "yes"; console.log("2: state.hi = ", state.hi); n(); })
    .then((state, n) => { console.log("-> this should stop the chain\n"); hfgfhgf.hgfhg = asdasd.asda.sv; n(); })
    .then((state, n) => { state.hi = "nah"; console.log("3: state.hi = ", state.hi); n(); })
    .catch((error, state) => {
        console.log("ERROR: ", error.stack);
        console.log("")
        console.log("STATE: ", state);
    });
