import express, { Request, Response } from 'express';
import { User } from '../models/User';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const user: User = req.body;

  try {
    res.status(200).json({ message: 'Hello AWS' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;