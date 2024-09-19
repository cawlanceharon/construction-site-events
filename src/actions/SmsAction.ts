import { Action } from '../events/Action';
import SmsService from '../services/SmsService';

class SmsAction implements Action {
  async execute(data: any): Promise<void> {
    await SmsService.sendSms({
      to: process.env.SUPERVISOR_PHONE!,
      message: `User ${data.user.name} has exited the construction site.`,
    });
  }
}

export default SmsAction;