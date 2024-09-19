import PDFDocument from 'pdfkit';

class PdfService {
  static generateUserPdf(user: any): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      try {
        const doc = new PDFDocument();
        const buffers: Buffer[] = [];

        doc.on('data', (chunk: any) => buffers.push(chunk));
        doc.on('end', () => resolve(Buffer.concat(buffers)));

        doc.fontSize(25).text('User Entry Details', { align: 'center' });
        doc.moveDown();
        doc.fontSize(12).text(`Name: ${user.name}`);
        doc.text(`ID: ${user.id}`);
        doc.text(`Timestamp: ${new Date().toISOString()}`);

        doc.end();
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default PdfService;