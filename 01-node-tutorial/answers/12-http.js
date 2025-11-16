const { createServer } = require("http");

const server = createServer((req, res) => {
  res.end(
    `<h1>Welcome!</h1> <p>You have requested <code style="color: orange; background-color:0f0f0f">${req.url}</code>.</p>`
  );
});

server.listen(3000);
