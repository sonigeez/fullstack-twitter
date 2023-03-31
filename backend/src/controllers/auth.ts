import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
  user?: any;
}


const authenticate = (req:AuthRequest, res:Response, next:NextFunction) => {
  // Get the token from the Authorization header
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ error: 'Burh login toh kar' });
  }

  const token = authHeader.split(' ')[1]; // Bearer token format: "Bearer <token>"

  if (!token) {
    return res.status(401).json({ error: 'Bruh login toh kar' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token.' });
  }
};

module.exports = authenticate;
