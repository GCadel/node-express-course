const { writeFileSync, readFileSync } = require("fs");
writeFileSync(
  "./temporary/fileA.txt",
  "This will be written to a text file\n",
  {
    flag: "a",
  }
);
writeFileSync("./temporary/fileA.txt", "Second line\n", {
  flag: "a",
});
writeFileSync("./temporary/fileA.txt", "Third line", {
  flag: "a",
});
console.log(readFileSync("./temporary/fileA.txt", { encoding: "utf8" }));
