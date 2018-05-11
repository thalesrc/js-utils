const updateJson = require('update-json');
const latestTag = require('latest-git-tag');

const [, , argVersion] = process.argv;

Promise.resolve(argVersion)
  .then(version => !version ? latestTag() : version)
  .then(version => {
    updateJson("./package.json", {version}, error => {
      if (error) {
        throw error;
      } else {
        console.log("Package version updated to:", version);
      }
    });
  });
