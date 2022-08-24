const bcrypt = require("bcrypt");
const User = require("../models/event");

function register(req, res, next) {
  var creationDate = new Date();

  var passwordHash = bcrypt.hash(req.body.password, 10);
  var newUser = new User({
    name: req.body.username,
    email: req.body.email,
    passwordHash: passwordHash,
    registeredOn: creationDate,
    role: "user",
  });
  newUser.save();
  return next();
}

function login(req,res,next) {
    const { username, password } = req.body;

    const user = await Users.findOne({ where: { username: username } });
  
    if (!user) res.status(400).json({ error: "User Doesn't Exist" });
  
    const dbPassword = user.password;
    bcrypt.compare(password, dbPassword).then((match) => {
      if (!match) {
        res
          .status(400)
          .json({ error: "Wrong Username and Password Combination!" });
      } else {
        const accessToken = createTokens(user);
  
        res.cookie("access-token", accessToken, {
          maxAge: 60 * 60 * 24 * 30 * 1000,
          httpOnly: true,
        });
  
        res.json("LOGGED IN");
      }
    });
}

module.exports = { register, login};
  