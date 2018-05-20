const updateJson = require('update-json');

const [, , version] = process.argv;

if (version) {
  updateJson("./package.json", {version}, error => {
    if (error) {
      throw error;
    }
    console.log("Package version updated to:", version);
  });
} else {
  console.log("No tags found for this build, skipping version change");
}
