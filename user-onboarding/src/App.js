import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './Components/Form';


function App() {
  const [form, setForm] = useState([])


  return (
    <div className="App">
      <Form form={form} className='form'/>
    </div>
  );
}

export default App;
