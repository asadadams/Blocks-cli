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
  .version("1.1.0")
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
      if (stdout) {
        console.log(
          chalk.green(`[blocks] Development server started ${stdout}`)
        );
      }
      if (stderr) {
        console.log(chalk.red(`[blocks] Shell Error: ${stderr}`));
      }
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
      if (stdout) {
        console.log(chalk.green(`[blocks] Minifing done ${stdout}`));
      }
      if (stderr) {
        console.log(chalk.red(`[blocks] Shell Error: ${stderr}`));
      }
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
      if (stdout) {
        console.log(chalk.green(`[blocks] Compiling done ${stdout}`));
      }
      if (stderr) {
        console.log(chalk.red(`[blocks] Shell Error: ${stderr}`));
      }
    });
  });

program
  .command("css")
  .alias("css")
  .description("Minifies css code")
  .action(() => {
    clear();
    console.log(chalk.blue("[blocks] Running css minifier"));
    exec("gulp css", (err, stdout, stderr) => {
      if (err) {
        console.log(chalk.red(`[blocks] Error: ${err}`));
      }
      if (stdout) {
        console.log(chalk.green(`[blocks] Minifing done ${stdout}`));
      }
      if (stderr) {
        console.log(chalk.red(`[blocks] Shell Error: ${stderr}`));
      }
    });
  });

if (process.argv.length === 2) {
  process.argv.push("-h");
}

program.parse(process.argv);
