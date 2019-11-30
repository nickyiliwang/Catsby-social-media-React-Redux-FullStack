const { db, admin } = require("./admin");

module.exports = (req, res, next) => {
  let idToken;
  // Bearer is a convention for authentication to have, this statement checks for if it starts with and assign its idToken for use
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    idToken = req.headers.authorization.split("Bearer ")[1];
  } else {
    console.error("No token found");
    return res.status(403).json({ error: "Unauthorized" });
  }
  admin
    .auth()
    .verifyIdToken(idToken)
    // once we verify the token we can return it so we can post without signing in again
    .then(decodedToken => {
      req.user = decodedToken;
      return db
        .collection("users")
        .where("userId", "==", req.user.uid) // fb fn for filtering with(a field to filter on, a comparison operation, and a value)
        .limit(1)
        .get();
    })
    .then(data => {
      req.user.handle = data.docs[0].data().handle;
      req.user.imageUrl = data.docs[0].data().imageUrl;
      return next(); // MiddleWare
    })
    .catch(err => {
      console.error("Error while verifying token", err);
      return res.status(403).json(err);
    });
};
