// Middleware function to check if the user has the required role
const role = (role) => {
    return (req, res, next) => {
      if (req.user && req.user.role === role) {
        // User has the required role, proceed to the next middleware or route handler
        next();
      } else {
        // User does not have the required role, return an error response
        res.status(403).json({ error: 'Unauthorized' });
      }
    };
  };

  
  module.exports={
    role
  }