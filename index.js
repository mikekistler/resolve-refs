#!/usr/bin/env node

// const { readFileSync } = require("fs");
// const { program } = require("commander");
// const resolver = require("@stoplight/json-ref-resolver");
import { readFileSync } from "fs";
import { Command } from "commander";
import { Resolver } from "@stoplight/json-ref-resolver";

const program = new Command();
const resolver = new Resolver();

// set up the command line options
program
  .name("resolver")
  .description("Resolve $refs in OpenAPI definitions")
  .arguments("[<file>]")
  .version("0.0.1", "--version");

program.parse(process.argv);

// Get the OpenAPI document
const source = readFileSync(program.args[0], "utf8");
const sourceObj = JSON.parse(source);

try {
  const resolved = await resolver.resolve(sourceObj, {});
  console.log(JSON.stringify(resolved.result, null, 2));
}
catch(err) {
  console.error(err);
}
