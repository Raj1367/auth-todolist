import { Request, Response } from 'express';
import userModel from '../Models/UserSchema';

const isAuthorised = async (req: Request, res: Response) => {
  try {
    const userId = req.id;
    const user = await userModel.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default isAuthorised;
