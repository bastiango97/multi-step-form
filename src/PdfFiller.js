import React from 'react';
import { PDFDocument, StandardFonts } from 'pdf-lib'; // Import pdf-lib for PDF manipulation
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

    // Enable multiline for the 'Estudios' field and set its value
    const estudiosField = form.getTextField('Estudios');
    estudiosField.enableMultiline(); // Enable multiline for the 'Estudios' field
    estudiosField.setText(formData.estudios); // Set the text as normal

    // Enable multiline for the 'Diagnóstico' field and set its value
    const diagnosticoField = form.getTextField('Diagnóstico');
    diagnosticoField.enableMultiline(); // Enable multiline for the 'Diagnóstico' field
    diagnosticoField.setText(formData.diagnostico); // Set the text as normal

    // Fill other fields as before
    form.getTextField('Nombre (s)').setText(formData.nombre);
    form.getTextField('Apellido Paterno').setText(formData.apellidoPaterno);
    form.getTextField('Apellido Materno').setText(formData.apellidoMaterno);
    form.getTextField('Contrante').setText(formData.contratante);
    form.getTextField('Póliza').setText(formData.polizaActual);
    form.getTextField('Póliza2').setText(formData.polizaAnterior); // Poliza Anterior
    form.getTextField('No. Siniestro').setText(formData.numeroSiniestro);

    // Handle Doctor fields
    form.getTextField('Dr. (a)-1').setText(formData.doctor1Nombre);
    form.getTextField('Especialidad-1').setText(formData.doctor1Especialidad);
    form.getTextField('Dr. (a)-2').setText(formData.doctor2Nombre);
    form.getTextField('Especialidad-2').setText(formData.doctor2Especialidad);

    // Handle "Reclamaciones" Radio Buttons
    const reclamacionesRadioGroup = form.getRadioGroup('Reclamaciones anteriores por este padecimiento');
    reclamacionesRadioGroup.select(formData.reclamacionesPrevias === 'yes' ? 'Sí' : 'No');

    // Handle Moneda Radio Buttons
    const monedaRadioGroup = form.getRadioGroup('Moneda comprobantes');
    monedaRadioGroup.select(formData.moneda === 'nacional' ? 'Nacional' : 'Extranjera');

    // Handle facturas and total
    formData.facturas.forEach((factura, index) => {
      if (factura) {
        form.getTextField(`Recibo-${index + 1}`).setText(factura.factura);
        form.getTextField(`Proveedor-${index + 1}`).setText(factura.proveedor);
        form.getTextField(`Monto-${index + 1}`).setText(factura.monto);
      }
    });

    // Handle Total
    const total = formData.facturas.reduce((sum, factura) => sum + (factura && factura.monto ? parseFloat(factura.monto) : 0), 0);
    form.getTextField('Total').setText(total.toFixed(2));

    // Handle today's date
    const today = new Date();
    const formattedDate = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;
    form.getTextField('Fec_af_date').setText(formattedDate);

    // Serialize the PDF document to bytes
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
