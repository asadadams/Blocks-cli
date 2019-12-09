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
const logSymbols = require("log-symbols");
const { exec } = require("child_process");

function execute(command, successOutput, callback) {
  exec(command, (err, stdout, stderr) => {
    if (err) {
      console.log(logSymbols.error, chalk.red(`[blocks] ${err}`));
    } else {
      console.log(
        logSymbols.success,
        chalk.green(`[blocks] ${successOutput} ${stdout}`)
      );
      if (callback && typeof callback === "function") {
        callback();
      }
    }
    if (stdout) {
      console.log(
        logSymbols.success,
        chalk.green(`[blocks] ${successOutput} ${stdout}`)
      );
      if (callback && typeof callback === "function") {
        callback();
      }
    }
    if (stderr) {
      console.log(logSymbols.info, chalk.blue(`[blocks] ${stderr}`));
    }
  });
}

function dumpAutoLoad() {
  execute("composer dump-autoload -o", "Done autoloading");
}

program
  .version("2.3.1")
  .description(
    chalk.yellow(figlet.textSync("Blocks cli", { horizontalLayout: "full" }))
  );

program
  .command("start")
  .alias("s")
  .description("Starts blocks development server")
  .action(() => {
    clear();
    console.log(
      logSymbols.info,
      chalk.blue("[blocks] Starting development server")
    );
    execute("gulp", "Development server started");
  });

program
  .command("scripts")
  .alias("scr")
  .description("Minifies js code")
  .action(() => {
    clear();
    console.log(logSymbols.info, chalk.blue("[blocks] Running js minifier"));
    execute("gulp scripts", "Minifing done");
  });

program
  .command("sass")
  .alias("ss")
  .description("Runs sass compiler")
  .action(() => {
    clear();
    console.log(logSymbols.info, chalk.blue("[blocks] Compiling sass"));
    execute("gulp sass", "Compiling done");
  });

program
  .command("css")
  .alias("cs")
  .description("Minifies css code")
  .action(() => {
    clear();
    console.log(logSymbols.info, chalk.blue("[blocks] Running css minifier"));
    execute("gulp css", "Minifing done");
  });

program
  .command("dump-autoload")
  .alias("autoload")
  .description("Autoloads classes")
  .action(() => {
    clear();
    console.log(logSymbols.info, chalk.blue("[blocks] Autoloading"));
    dumpAutoLoad();
  });

program
  .command("make")
  .alias("mk")
  .description("Creating files")
  .option("-c, --controller <name>", "Controller name is required")
  .option("-m, --model <name>", "Model name is required")
  .action(() => {
    //clear();
    if (process.argv.length === 3) {
      console.error(
        chalk.red(
          "Pass in an option --controller(-c) for controller OR --model(-m) for model"
        )
      );
      process.exit(1);
    }
    switch (process.argv[3]) {
      case "--model":
        console.log(logSymbols.info, chalk.blue("[blocks] Creating model"));
        execute(
          `node ./bin/scripts/createModel.js ${process.argv[4]}`,
          "Model created",
          dumpAutoLoad()
        );
        break;
      case "-m":
        console.log(logSymbols.info, chalk.blue("[blocks] Creating model"));
        execute(
          `node ./bin/scripts/createModel.js ${process.argv[4]}`,
          "Model created",
          dumpAutoLoad()
        );
        break;
      case "--controller":
        console.log(
          logSymbols.info,
          chalk.blue("[blocks] Creating controller")
        );
        execute(
          `node ./bin/scripts/createController.js ${process.argv[4]}`,
          "Controller created",
          dumpAutoLoad()
        );
        break;
      case "-c":
        console.log(
          logSymbols.info,
          chalk.blue("[blocks] Creating controller")
        );
        execute(
          `node ./bin/scripts/createController.js ${process.argv[4]}`,
          "Controller created",
          dumpAutoLoad()
        );
        break;
    }
  });

if (process.argv.length === 2) {
  process.argv.push("-h");
}

program.parse(process.argv);
