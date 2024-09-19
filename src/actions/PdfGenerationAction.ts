import { Action } from '../events/Action';
import PdfService from '../services/PdfService';

class PdfGenerationAction implements Action {
  async execute(data: any): Promise<void> {
    const pdfBuffer = await PdfService.generateUserPdf(data.user);
    // Attach PDF to data for the next action
    data.pdfBuffer = pdfBuffer;
  }
}

export default PdfGenerationAction;