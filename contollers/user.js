const User = require("../models/user");
module.exports.renderSignup = (req, res) => {
  res.render("users/signup");
};

module.exports.signup = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registerUser = await User.register(newUser, password);
    // console.log(registerUser);
    req.login(registerUser, (err) => {
      if (err) {
        return next();
      }
      req.flash("success", "Welcome to Wanderlust");
      res.redirect("/listings");
    });
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/signup");
  }
};

module.exports.renderLogin = (req, res) => {
  res.render("users/login");
};

module.exports.login = async (req, res) => {
  const redirectUrl = res.locals.redirectUrl || "/listings";
  delete req.session.redirectUrl; // prevent stale redirects
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      next(err);
    }
    req.flash("success", "you are logged out!");
    res.redirect("/listings");
  });
};
