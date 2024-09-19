import EventHandler from '../src/handlers/EventHandler';
import { User } from '../src/models/User';
import PdfService from '../src/services/PdfService';
import EmailService from '../src/services/EmailService';

jest.mock('../src/services/PdfService');
jest.mock('../src/services/EmailService');

describe('User Entry Event', () => {
  it('should execute PDF generation and email actions', async () => {
    const mockUser: User = {
      id: '123456',
      name: 'Testing Name',
    };

    const data = { user: mockUser };

    const mockPdfBuffer = Buffer.from('Test PDF Buffer');
    (PdfService.generateUserPdf as jest.Mock).mockResolvedValue(mockPdfBuffer);

    const pdfActionSpy = jest.spyOn(
      require('../src/actions/PdfGenerationAction').default.prototype,
      'execute'
    );
    const emailActionSpy = jest.spyOn(
      require('../src/actions/EmailAction').default.prototype,
      'execute'
    );

    await EventHandler.triggerEvent('UserEntry', data);

    expect(pdfActionSpy).toHaveBeenCalledWith(data);
    expect(emailActionSpy).toHaveBeenCalledWith(data);

    expect(EmailService.sendEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: expect.any(String),
        subject: expect.any(String),
        attachments: expect.any(Array),
      })
    );
  });
});
