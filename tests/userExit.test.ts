import EventHandler from '../src/handlers/EventHandler';
import { User } from '../src/models/User';

jest.mock('../src/services/SmsService');

describe('User Exit Event', () => {
  it('should execute SMS action', async () => {
    const mockUser: User = {
      id: '123456',
      name: 'Testing Name',
    };

    const data = { user: mockUser };

    const smsActionSpy = jest.spyOn(
      require('../src/actions/SmsAction').default.prototype,
      'execute'
    );

    await EventHandler.triggerEvent('UserExit', data);

    expect(smsActionSpy).toHaveBeenCalledWith(data);
  });
});