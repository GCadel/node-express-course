const { writeFile } = require("fs");
console.log("Start");
writeFile("./temporary/fileB.txt", "First line\n", (err, res) => {
  if (err) {
    console.log(`Err writing 1: ${err}`);
  } else {
    writeFile(
      "./temporary/fileB.txt",
      "Second line\n",
      { flag: "a" },
      (err, res) => {
        if (err) {
          console.log(`Err writing 2: ${err}`);
        } else {
          writeFile(
            "./temporary/fileB.txt",
            "Third line\n",
            { flag: "a" },
            (err, res) => {
              if (err) {
                console.log(`Err writing 2: ${err}`);
              } else {
                console.log("End of callbacks");
              }
            }
          );
        }
      }
    );
  }
});
console.log("Complete");
