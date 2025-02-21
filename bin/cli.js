#!/usr/bin/env node

const { program } = require("@caporal/core");

const commandsLoader = require("../commands");

program
  .name("Pizzaporal - CLI for manage pizza orders")
  .version("1.0.0")
  .description("Pizza management software for the Pizzaporal restaurant.")
;

commandsLoader(program);

program.run();