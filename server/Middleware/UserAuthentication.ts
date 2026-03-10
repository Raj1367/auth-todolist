import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      id: string;
    }
  }
}

const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated',
      });
    }
    const decode = jwt.verify(token, process.env.JWT_TOKEN_SECRET_KEY!) as jwt.JwtPayload;
    if (!decode) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token',
      });
    }
    req.id = decode.userId;
    next();
  } catch (error:any) {
    return res.status(500).json({
      message: error.message||'Internal server error',
    });
  }
};

export default isAuthenticated;
