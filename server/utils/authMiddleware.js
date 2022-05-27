// Middleware-like functions
function checkNotAuthenticated(req, res, next) {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.status(403).json('Unauthorized');
  }
}

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json('Unauthenticated.');
  }
}

exports.checkNotAuthenticated = checkNotAuthenticated;
exports.checkAuthenticated = checkAuthenticated;
