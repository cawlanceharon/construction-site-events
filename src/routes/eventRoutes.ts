import express, { Request, Response } from 'express';
import EventHandler from '../handlers/EventHandler';
import { User } from '../models/User';

const router = express.Router();

/**
 * Trigger User Entry Event
 */
router.post('/user-entry', async (req: Request, res: Response) => {
  const user: User = req.body;

  try {
    await EventHandler.triggerEvent('UserEntry', { user });
    res.status(200).json({ message: 'User Entry Event Triggered Successfully.' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Trigger User Exit Event
 */
router.post('/user-exit', async (req: Request, res: Response) => {
  const user: User = req.body;

  try {
    await EventHandler.triggerEvent('UserExit', { user });
    res.status(200).json({ message: 'User Exit Event Triggered Successfully.' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;