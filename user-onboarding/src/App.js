import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './Components/Form';


function App() {
  const [form, setForm] = useState([])

  const addNewForm = form => {
    const newForm = {
      id: form.length + 1,
      name: form.name,
      email: form.email,
      password: form.password
    };
    setForm([...form, newForm]);
  };

  return (
    <div className="App">
      <Form form={form} className='form'/>
    </div>
  );
}

export default App;
