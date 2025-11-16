const { writeFileSync, readFileSync } = require("fs");
writeFileSync("./temporary/fileA.txt", "This will be written to a text file", {
  flag: "a",
});
console.log(readFileSync("./temporary/fileA.txt", { encoding: "utf8" }));
