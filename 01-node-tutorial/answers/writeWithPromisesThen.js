const { writeFile, readFile } = require("fs").promises;

const fileName = "./temporary/temp.txt";
const opt = { flag: "a" };
writeFile(fileName, "Line 1\n", opt)
  .then(() => writeFile(fileName, "Line 2\n", opt))
  .then(() => writeFile(fileName, "Line 3\n", opt))
  .then(() => readFile(fileName, { encoding: "utf-8" }))
  .then((result) => console.log(result))
  .catch((err) => console.error("Something went wrong: ", err));
