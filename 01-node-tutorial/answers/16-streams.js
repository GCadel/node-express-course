const { createReadStream } = require("fs");

let counter = 0;

const stream = createReadStream("../content/big.txt", {
  encoding: "utf-8",
  highWaterMark: 200,
});

stream.on("data", (result) => {
  counter += 1;
  console.log(`Chunk Result:\n------\n${result}\n`);
});

stream.on("end", (result) => {
  console.log(`Chunks: ${counter}\n`);
});

stream.on("error", (err) => {
  console.log(err);
});
