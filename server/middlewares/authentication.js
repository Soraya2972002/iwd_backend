const  requireLogin = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).send("not logged in");
  } else {
    return res.status(200).send("logged in");
  }
}

module.exports = requireLogin;