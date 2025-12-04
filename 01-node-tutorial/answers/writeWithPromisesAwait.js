const { writeFile, readFile } = require("fs").promises;

const writer = async () => {
  // write 3 lines to temp.txt
  try {
    await writeFile("./temporary/temp.txt", "First Line\n", { flag: "a" });
    await writeFile("./temporary/temp.txt", "Second Line\n", { flag: "a" });
    await writeFile("./temporary/temp.txt", "Third Line\n", { flag: "a" });
  } catch (err) {
    console.error("Error writing to file: ", err);
  }
};

const reader = async () => {
  // Log temp.txt to screen
  try {
    console.log(await readFile("./temporary/temp.txt", { encoding: "utf-8" }));
  } catch (err) {
    console.error("Error reading from file: ", err);
  }
};

const readWrite = async () => {
  await writer();
  await reader();
};

readWrite();
