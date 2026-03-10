import { Request, Response } from 'express';
import userModel from '../Models/UserSchema';
import bcrypt from 'bcryptjs';

const userSignUpController = async (req: Request, res: Response) => {
  try {
    const { email, password, username, role } = req.body;

    if (!username) {
      res.status(400).json({
        message: 'please provide user name',
        error: true,
        success: false,
      });
    } else if (!email) {
      res.status(400).json({
        message: 'please provide email',
        error: true,
        success: false,
      });
    } else if (!password) {
      res.status(400).json({
        message: 'please provide password',
        error: true,
        success: false,
      });
    }

    const user = await userModel.findOne({ email });

    if (user) {
      res.status(400).json({
        message: 'user already exists',
        error: true,
        success: false,
      });
    }

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) {
          return res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
          });
        } else {
          const payload = {
            ...req.body,
            role: role || 'GENERAL',
            password: hash,
          };

          const registerUser = new userModel(payload);
          const saveUser = await registerUser.save();

          res.status(201).json({
            message: 'user created successfully',
            data: saveUser,
            success: true,
            error: false,
          });
        }
      });
    });
  } catch (err: any) {
    res.status(500).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

export default userSignUpController;
