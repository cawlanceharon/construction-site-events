import { Event } from './Event';
import SmsAction from '../actions/SmsAction';

class UserExitEvent implements Event {
  name = 'UserExit';

  private actions = [new SmsAction()];

  async execute(data: any): Promise<void> {
    for (const action of this.actions) {
      await action.execute(data);
    }
  }
}

export default UserExitEvent;