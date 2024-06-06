import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Stepper.css';

const Stepper = () => {
  const [currentStep, setCurrentStep] = useState(2);

  return (
    <div className='container mt-5'>
      <div className='row'>
        <div className='col-3'>
          <ul className='stepper-vertical'>
            <li className={`step ${currentStep >= 1 ? 'completed' : ''}`}>
              <div>Step1</div>
              <div className='circle'>1</div>
            </li>
            <li className={`step ${currentStep >= 2 ? 'completed' : ''}`}>
              <div>Step2</div>
              <div className='circle'>2</div>
            </li>
            <li className={`step ${currentStep >= 3 ? 'completed' : ''}`}>
              <div>Step3</div>
              <div className='circle'>3</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Stepper;
