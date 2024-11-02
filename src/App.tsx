import React, { useMemo, useState } from 'react';
import './App.css';
import { SINValidationResult, validateSin } from './utils/sin-validator';

const SINValidationResults = (props: { result?: SINValidationResult }) => {
  const { result } = props;

  if (!result) {
    // to fix vertical alignment
    return <p style={{ visibility: 'hidden' }}>A</p>;
  } else if (result.valid) {
    return <p style={{ color: 'green' }}>Valid SIN!</p>;
  } else {
    return <p style={{ color: 'red' }}>Invalid SIN! Error code: {result.errorCode}</p>;
  }
};

function App() {
  const [sinValue, setSinValue] = useState('');

  const validationResult = useMemo(() => {
    if (sinValue) {
      return validateSin(sinValue);
    } else {
      return undefined;
    }
  }, [sinValue]);

  return (
    <div className="App">
      <header className="App-header">
        <p>Enter your SIN to validate</p>
        <input type="text" value={sinValue} onChange={(e) => setSinValue(e.target.value)} />
        <SINValidationResults result={validationResult} />
      </header>
    </div>
  );
}

export default App;
