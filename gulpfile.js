"use strict";

const build = require("@microsoft/sp-build-web");

build.addSuppression(
  `Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`
);

// This section is inspired by Stefan Bauer's article at https://n8d.at/how-to-version-new-sharepoint-framework-projects/
// Stefan rocks!
let syncVersionsSubtask = build.subTask(
  "version-sync",
  function (gulp, buildOptions, done) {
    this.log("Synching versions");

    // import gulp utilits to write error messages
    const gutil = require("gulp-util");

    // import file system utilities form nodeJS
    const fs = require("fs");

    // read package.json
    var pkgConfig = require("./package.json");

    // read configuration of web part solution file
    var pkgSolution = require("./config/package-solution.json");

    // log old version
    this.log("package-solution.json version:\t" + pkgSolution.solution.version);
    this.log("package.Json Version:\t" + pkgConfig.version);

    // Generate new Node compliant version number Loose the last bit
    var vBits = pkgSolution.solution.version.split(".")
    var newVersionNumber = vBits[0]+"."+vBits[1]+"."+vBits[2]

    if (pkgConfig.version !== newVersionNumber) {
      // assign newly generated version number to the node version
      pkgConfig.version = newVersionNumber;

      // log new version
      this.log("New package.Json Version:\t" + pkgConfig.version);

      // write changed package-solution file
      fs.writeFile(
        "./package.json",
        JSON.stringify(pkgConfig, null, 4),
        function (err, result) {
          if (err) this.log("error", err);
        }
      );
    } else {
      this.log("package.json version is up-to-date");
    }
    done();
  }
);
let syncVersionTask = build.task("version-sync", syncVersionsSubtask);
build.rig.addPreBuildTask(syncVersionTask);

build.initialize(require("gulp"));
