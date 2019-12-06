#!/usr/bin/env node

/*
 * Blocks Framework CLI
 * https://github.com/asadadams/blocks-cli
 * Gulp file created by @asadadams
 * All plugins and documentation available at https://gulpjs.com/plugins/
 *
 */

const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
const program = require("commander");
const { exec } = require("child_process");

program
  .version("0.0.1")
  .description(
    chalk.yellow(figlet.textSync("Blocks cli", { horizontalLayout: "full" }))
  );

program
  .command("start")
  .alias("s")
  .description("Starts blocks development server")
  .action(() => {
    clear();
    console.log(chalk.blue("[blocks] Starting development server"));
    exec("gulp", (err, stdout, stderr) => {
      if (err) {
        console.log(chalk.red(`[blocks] Error: ${err}`));
      }
      console.log(chalk.green("[blocks] Development server started"));
    });
  });

program
  .command("scripts")
  .alias("scr")
  .description("Minifies js code")
  .action(() => {
    clear();
    console.log(chalk.blue("[blocks] Running js minifier"));
    exec("gulp scripts", (err, stdout, stderr) => {
      if (err) {
        console.log(chalk.red(`[blocks] Error: ${err}`));
      }
      console.log(chalk.green("[blocks] Minifing done"));
    });
  });

program
  .command("sass")
  .alias("ss")
  .description("Runs sass compiler")
  .action(() => {
    clear();
    console.log(chalk.blue("[blocks] Compiling sass"));
    exec("gulp sass", (err, stdout, stderr) => {
      if (err) {
        console.log(chalk.red(`[blocks] Error: ${err}`));
      }
      console.log(chalk.green("[blocks] Compiling done"));
    });
  });

if (process.argv.length === 2) {
  process.argv.push("-h");
}

program.parse(process.argv);
