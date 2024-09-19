import { Event } from './Event';
import PdfGenerationAction from '../actions/PdfGenerationAction';
import EmailAction from '../actions/EmailAction';

class UserEntryEvent implements Event {
  name = 'UserEntry';

  private actions = [new PdfGenerationAction(), new EmailAction()];

  async execute(data: any): Promise<void> {
    for (const action of this.actions) {
      await action.execute(data);
    }
  }
}

export default UserEntryEvent;