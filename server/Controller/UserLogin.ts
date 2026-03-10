import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import userModel from '../Models/UserSchema';
import { generateToken } from '../Utils/generateToken';

const userloginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Incorrect email or password',
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: 'Incorrect email or password',
      });
    }
    generateToken(res, user);
    await user.save();

    // send user without passowrd
    const userWithoutPassword = await userModel.findOne({ email }).select('-password');
    return res.status(200).json({
      success: true,
      message: `Welcome back ${user.username}`,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default userloginController;
