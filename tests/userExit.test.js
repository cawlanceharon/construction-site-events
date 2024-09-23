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
jest.mock('../src/services/SmsService');
describe('User Exit Event', () => {
    it('should execute SMS action', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUser = {
            id: '123456',
            name: 'Testing Name',
        };
        const data = { user: mockUser };
        const smsActionSpy = jest.spyOn(require('../src/actions/SmsAction').default.prototype, 'execute');
        yield EventHandler_1.default.triggerEvent('UserExit', data);
        expect(smsActionSpy).toHaveBeenCalledWith(data);
    }));
});
