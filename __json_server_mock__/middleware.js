module.exports = (req, res, next) => {
  if (req.method === "POST" && req.path === "/login") {
    console.log(req.body);
    if (req.body.username === "123" && req.body.password === "1") {
      return res.status(200).json({
        user: {
          token: "123",
        },
      });
    } else {
      return res.status(400).json({
        message: "错误",
      });
    }
  }
  next();
};
