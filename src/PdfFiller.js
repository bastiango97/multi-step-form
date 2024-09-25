import React from 'react';
import { PDFDocument } from 'pdf-lib'; // Import pdf-lib for PDF manipulation
import { saveAs } from 'file-saver'; // Import file-saver to download the PDF

const PdfFiller = ({ formData }) => {
  
  // Function to create and download the filled PDF
  const fillPdf = async () => {
    // Fetch the PDF template
    const url = '/pdfs/Solicitud-de-reembolso-v5.pdf';
    const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer());

    // Load a PDFDocument from the existing PDF bytes
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Get the form from the PDF
    const form = pdfDoc.getForm();

    // Now fill the known fields programmatically
    form.getTextField('Nombre (s)').setText(formData.nombre);
    form.getTextField('Apellido Paterno').setText(formData.apellidoPaterno);
    form.getTextField('Apellido Materno').setText(formData.apellidoMaterno);
    form.getTextField('Contrante').setText(formData.contratante);
    form.getTextField('Póliza').setText(formData.polizaActual);
    form.getTextField('Diagnóstico').setText(formData.diagnostico);
    //form.getTextField('Reclamaciones anteriores por este padecimiento').setText(formData.reclamacionesPrevias);
    form.getTextField('No. Siniestro').setText(formData.numeroSiniestro);

    // Continue to fill out other fields as necessary using their field names
    // Example:
    form.getTextField('Dr. (a)-1').setText(formData.doctor1Nombre);
    form.getTextField('Especialidad-1').setText(formData.doctor1Especialidad);
    form.getTextField('Dr. (a)-2').setText(formData.doctor2Nombre);
    form.getTextField('Especialidad-2').setText(formData.doctor2Especialidad);

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
