import twilio from 'twilio';
import dotenv from 'dotenv';
import Logger from '../utils/Logger';

dotenv.config();

interface SmsOptions {
  to: string;
  message: string;
}

class SmsService {
  private static client = twilio(
    process.env.TWILIO_ACCOUNT_SID!,
    process.env.TWILIO_AUTH_TOKEN!
  );

  static async sendSms(options: SmsOptions): Promise<void> {
    try {
      await this.client.messages.create({
        body: options.message,
        from: process.env.TWILIO_PHONE_NUMBER!,
        to: options.to,
      });
      Logger.log(`SMS sent to ${options.to}`);
    } catch (error) {
      Logger.error(`Failed to send SMS to ${options.to}: ${(error as Error).message}`);
      throw error;
    }
  }
}

export default SmsService;
