import { Action } from '../events/Action';
import EmailService from '../services/EmailService';

class EmailAction implements Action {
  async execute(data: any): Promise<void> {
    if (!data.pdfBuffer) {
      throw new Error('PDF buffer not found for emailing.');
    }
    await EmailService.sendEmail({
      to: process.env.SUPERVISOR_EMAIL!,
      subject: 'User Entry Notification',
      text: `User ${data.user.name} has entered the construction site.`,
      attachments: [
        {
          filename: 'UserDetails.pdf',
          content: data.pdfBuffer,
        },
      ],
    });
  }
}

export default EmailAction;