const adminAuth = (req, res, next) => {
    let token = "xyz";
    if (token === "xyz") {
      next();
    } else {
      res.status(401).send("Unauthorised acces");
    }
  };
  
  const userAuth = (req, res, next) => {
    let token = "user";
    if (token != "user") {
      res.status(401).send("User is unauthrised");
    }
    next();
  };
  module.exports = { adminAuth, userAuth };
  