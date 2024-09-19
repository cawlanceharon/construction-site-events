import nodemailer, { Transporter } from 'nodemailer';
import dotenv from 'dotenv';
import Logger from '../utils/Logger';

dotenv.config();

interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  attachments?: Array<{
    filename: string;
    content: Buffer | string;
    contentType?: string;
  }>;
}

class EmailService {
  private static transporter: Transporter;

  static initialize() {
    const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS } = process.env;

    if (!EMAIL_HOST || !EMAIL_PORT || !EMAIL_USER || !EMAIL_PASS) {
      Logger.error('Email configuration is missing in environment variables.');
      throw new Error('Email configuration is incomplete.');
    }

    this.transporter = nodemailer.createTransport({
      host: EMAIL_HOST,
      port: parseInt(EMAIL_PORT, 10),
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });
  }

  static async sendEmail(options: EmailOptions): Promise<void> {
    if (!this.transporter) {
      throw new Error('Email transporter not initialized.');
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: options.to,
      subject: options.subject,
      text: options.text,
      attachments: options.attachments,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      Logger.log(`Email sent to ${options.to}`);
    } catch (error) {
      Logger.error(`Failed to send email to ${options.to}: ${(error as Error).message}`);
      throw error;
    }
  }
}

EmailService.initialize();

export default EmailService;
