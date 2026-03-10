import { Request, Response } from 'express';

const userlogoutController = async (_: Request, res: Response) => {
  try {
    return res.clearCookie('token').status(200).json({
      success: true,
      message: 'Logged out successfully.',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default userlogoutController;
