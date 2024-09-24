import React from 'react';
import { PDFDocument, rgb } from 'pdf-lib'; // Import pdf-lib for PDF manipulation
import { saveAs } from 'file-saver'; // Import file-saver to download the PDF

const PdfFiller = ({ formData }) => {
  
  // Function to create and download the filled PDF
  const fillPdf = async () => {
    // Fetch the PDF template
    const url = '/pdfs/Solicitud-de-reembolso-v5.pdf';
    const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer());

    // Load a PDFDocument from the existing PDF bytes
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Get the first page of the document
    const page = pdfDoc.getPages()[0];

    // Set a default font and color (you can also customize this)
    const { width, height } = page.getSize();

    // Add the text fields into the PDF (Note: for now, we'll just add some demo positions, replace them with actual coordinates)
    page.drawText(formData.nombre, { x: 100, y: height - 100, size: 12, color: rgb(0, 0, 0) });
    page.drawText(formData.apellidoPaterno, { x: 100, y: height - 120, size: 12, color: rgb(0, 0, 0) });
    page.drawText(formData.apellidoMaterno, { x: 100, y: height - 140, size: 12, color: rgb(0, 0, 0) });
    page.drawText(formData.contratante, { x: 100, y: height - 160, size: 12, color: rgb(0, 0, 0) });
    page.drawText(formData.polizaActual, { x: 100, y: height - 180, size: 12, color: rgb(0, 0, 0) });
    page.drawText(formData.diagnostico, { x: 100, y: height - 200, size: 12, color: rgb(0, 0, 0) });
    
    // You can continue adding other fields like "facturas", "reclamacionesPrevias", etc.

    // Serialize the PDF document to bytes (returns a promise)
    const pdfBytes = await pdfDoc.save();

    // Trigger the download of the PDF
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    saveAs(blob, 'Solicitud-de-reembolso-filled.pdf');
  };

  return (
    <div>
      <button onClick={fillPdf}>Download Filled PDF</button>
    </div>
  );
};

export default PdfFiller;
