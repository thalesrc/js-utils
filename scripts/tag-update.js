const updateJson = require('update-json');

const [, , version] = process.argv;

updateJson("./package.json", {version}, error => {
  if (error) {
    throw error;
  } else {
    console.log("Package version updated to:", version);
  }
});