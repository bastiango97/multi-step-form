import React, { useState } from 'react';
import './MultiStepForm.css';  // Make sure the CSS file is imported
import PdfFiller from './PdfFiller'; // Import the PdfFiller component

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    contratante: '',
    polizaActual: '',
    polizaAnterior: '',
    diagnostico: '',
    reclamacionesPrevias: '', // Now this will hold 'yes' or 'no' for radio buttons
    numeroSiniestro: '', // New field for Número de Siniestro
    avisoAccidente: '',
    informeMedico: '',
    estudios: '',
    moneda: 'nacional',
    facturas: Array(11).fill({ factura: '', proveedor: '', monto: '' }), // Facturas array
  });

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleChange = (input) => (e) => {
    setFormData({ ...formData, [input]: e.target.value });
  };

  const handleCheckboxChange = (input) => (e) => {
    setFormData({ ...formData, [input]: e.target.checked });
  };

  // Define handleInvoiceChange function
  const handleInvoiceChange = (index, field) => (e) => {
    const updatedFacturas = [...formData.facturas];  // Copy the facturas array
    updatedFacturas[index] = { ...updatedFacturas[index], [field]: e.target.value };  // Update only the specific field of the factura at the given index
    setFormData({ ...formData, facturas: updatedFacturas });  // Update the formData with the new array
  };
  

  return (
    <div className="form-container">
      {step === 1 && (
        <div>
          
          <label>Nombre(s)</label>
          <input type="text" placeholder="Nombre(s)" value={formData.nombre} onChange={handleChange('nombre')} />
          
          <label>Apellido Paterno</label>
          <input type="text" placeholder="Apellido Paterno" value={formData.apellidoPaterno} onChange={handleChange('apellidoPaterno')} />
          
          <label>Apellido Materno</label>
          <input type="text" placeholder="Apellido Materno" value={formData.apellidoMaterno} onChange={handleChange('apellidoMaterno')} />
          
          <label>Contratante</label>
          <input type="text" placeholder="Contratante" value={formData.contratante} onChange={handleChange('contratante')} />
          
          <label>No. Póliza Actual</label>
          <input type="text" placeholder="No. Póliza Actual" value={formData.polizaActual} onChange={handleChange('polizaActual')} />
          
          <label>No. Póliza Anterior</label>
          <input type="text" placeholder="No. Póliza Anterior" value={formData.polizaAnterior} onChange={handleChange('polizaAnterior')} />
          
          {/* Message displayed above Diagnóstico field */}
          <p>Por este medio solicito el Reembolso de los gastos efectuados por atención médica de:</p>
          <label>Diagnóstico</label>
          <textarea
            placeholder="Anota aquí tu diagnóstico"  // New placeholder
            value={formData.diagnostico}
            onChange={handleChange('diagnostico')}
          />
          
          <label>¿Has presentado reclamaciones anteriores por este padecimiento?</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                value="yes"
                checked={formData.reclamacionesPrevias === 'yes'}
                onChange={handleChange('reclamacionesPrevias')}
              />
              Sí
            </label>
            <label>
              <input
                type="radio"
                value="no"
                checked={formData.reclamacionesPrevias === 'no'}
                onChange={handleChange('reclamacionesPrevias')}
              />
              No
            </label>
          </div>

          <label>Número de Siniestro</label> {/* Moved after radio buttons */}
          <input type="text" placeholder="Número de Siniestro" value={formData.numeroSiniestro} onChange={handleChange('numeroSiniestro')} />

          {/* New Informational Section */}
          <div className="informational-section">
            <p><strong>Si la respuesta es afirmativa, es necesario que ingreses Informe Médico para esta reclamación en los siguientes casos:</strong></p>
            <ul>
              <li>Si presentas recibos de honorarios de un médico distinto a tu médico tratante.</li>
              <li>Si se trata de un padecimiento de larga evolución* y han transcurrido más de 3 meses desde la reclamación anterior.</li>
              <li>En caso de haber sido solicitado por <strong>Plan Seguro</strong> en tu último finiquito.</li>
            </ul>
            <p><em>*Se define como padecimiento de larga evolución a aquellos con duración mayor a seis meses.</em></p>
          </div>

          <button onClick={nextStep}>Next</button>
        </div>
      )}

{step === 2 && (
        <div>
          

          <div className="checkbox-wrapper">
          <p>Indica los estudios de laboratorio o gabinete de los que ingresas interpretación:</p>

  {/* Checkbox for Aviso de Accidente */}
  <div className="checkbox-group">
    <input
      type="checkbox"
      checked={formData.avisoAccidente}
      onChange={handleCheckboxChange('avisoAccidente')}
    />
    <label>Aviso de Accidente y/o Enfermedad</label>
  </div>

  {/* Checkbox for Informe Médico */}
  <div className="checkbox-group">
    <input
      type="checkbox"
      checked={formData.informeMedico}
      onChange={handleCheckboxChange('informeMedico')}
    />
    <label>Informe Médico de los doctores</label>
  </div>
</div>


          {/* Input fields for Doctor 1 */}
          <label>Dr. (a):</label>
          <input 
            type="text" 
            placeholder="Nombre del Doctor" 
            value={formData.doctor1Nombre} 
            onChange={handleChange('doctor1Nombre')} 
          />
          <label>Especialidad:</label>
          <input 
            type="text" 
            placeholder="Especialidad" 
            value={formData.doctor1Especialidad} 
            onChange={handleChange('doctor1Especialidad')} 
          />

          {/* Input fields for Doctor 2 */}
          <label>Dr. (a):</label>
          <input 
            type="text" 
            placeholder="Nombre del Doctor" 
            value={formData.doctor2Nombre} 
            onChange={handleChange('doctor2Nombre')} 
          />
          <label>Especialidad:</label>
          <input 
            type="text" 
            placeholder="Especialidad" 
            value={formData.doctor2Especialidad} 
            onChange={handleChange('doctor2Especialidad')} 
          />

          {/* Textarea for Estudios */}
          <label>Indica los estudios de laboratorio o gabinete de los que ingresas interpretación:</label>
          <textarea
            placeholder="Estudios de laboratorio o gabinete"
            value={formData.estudios}
            onChange={handleChange('estudios')}
          />

          {/* Radio buttons for Moneda */}
          <label>Indica la moneda de los comprobantes ingresados:</label>
          <div className="radio-group">
  <label>
    <input
      type="radio"
      value="nacional"
      checked={formData.moneda === 'nacional'}
      onChange={handleChange('moneda')}
    />
    Moneda Nacional
  </label>

  <label>
    <input
      type="radio"
      value="extranjera"
      checked={formData.moneda === 'extranjera'}
      onChange={handleChange('moneda')}
    />
    Moneda Extranjera
  </label>

  <label>
    <input
      type="radio"
      value="otra"
      checked={formData.moneda === 'otra'}
      onChange={handleChange('moneda')}
    />
    Otra
  </label>
  
  {/* The text field for "Otra" currency will always appear now */}
  <input
    type="text"
    placeholder="Especifica otra moneda"
    value={formData.otraMoneda}
    onChange={handleChange('otraMoneda')}
  />
</div>


          <button onClick={prevStep}>Back</button>
          <button onClick={nextStep}>Next</button>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2>Relación de los Comprobantes</h2>
          {formData.facturas.map((factura, index) => (
            <div key={index}>
              <h3>Factura {index + 1}</h3>
              <label>No. de factura</label>
              <input
                type="text"
                placeholder="No. de factura"
                value={factura.factura}
                onChange={handleInvoiceChange(index, 'factura')}
              />
              
              <label>Nombre del proveedor</label>
              <input
                type="text"
                placeholder="Nombre del proveedor"
                value={factura.proveedor}
                onChange={handleInvoiceChange(index, 'proveedor')}
              />
              
              <label>Monto</label>
              <input
                type="text"
                placeholder="Monto"
                value={factura.monto}
                onChange={handleInvoiceChange(index, 'monto')}
              />
            </div>
          ))}

          <button onClick={prevStep}>Back</button>
          <button onClick={() => alert('Form submitted!')}>Submit</button>
        </div>
      )}

      {/* Add the PDF Filler Component */}
      <PdfFiller formData={formData} />
    </div>
  );
};

export default MultiStepForm;
