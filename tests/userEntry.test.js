"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EventHandler_1 = __importDefault(require("../src/handlers/EventHandler"));
const PdfService_1 = __importDefault(require("../src/services/PdfService"));
const EmailService_1 = __importDefault(require("../src/services/EmailService"));
jest.mock('../src/services/PdfService');
jest.mock('../src/services/EmailService');
describe('User Entry Event', () => {
    it('should execute PDF generation and email actions', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUser = {
            id: '123456',
            name: 'Testing Name',
        };
        const data = { user: mockUser };
        const mockPdfBuffer = Buffer.from('Test PDF Buffer');
        PdfService_1.default.generateUserPdf.mockResolvedValue(mockPdfBuffer);
        const pdfActionSpy = jest.spyOn(require('../src/actions/PdfGenerationAction').default.prototype, 'execute');
        const emailActionSpy = jest.spyOn(require('../src/actions/EmailAction').default.prototype, 'execute');
        yield EventHandler_1.default.triggerEvent('UserEntry', data);
        expect(pdfActionSpy).toHaveBeenCalledWith(data);
        expect(emailActionSpy).toHaveBeenCalledWith(data);
        expect(EmailService_1.default.sendEmail).toHaveBeenCalledWith(expect.objectContaining({
            to: expect.any(String),
            subject: expect.any(String),
            attachments: expect.any(Array),
        }));
    }));
});
