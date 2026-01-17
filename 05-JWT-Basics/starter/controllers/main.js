const login = async (req, res) => {
  res.send("Faux Login/Register/Signup");
};

const dashboard = async (req, res) => {
  const luckyNum = Math.floor(Math.random() * 42);
  res
    .status(200)
    .json({ message: `Hello, Steve`, secret: `Your auth data: ${luckyNum}` });
};

module.exports = { login, dashboard };
