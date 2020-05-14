import React, { useState } from 'react';
import ReactDOM from "react-dom";
import '../App.css';
import * as yup from 'yup';

const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    terms: yup.boolean().oneOf([true])
})

const Form = props  => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        terms: false
      });
    
      const handleChanges = event => {
        setForm({...form, [event.target.name]: event.target.value });
        console.log(form, event.target.checked);
        let value = event.target.type === 'checkbox' ? event.target.checked :event.target.value 
      };
      const submitForm = event => {
        event.preventDefault();
        props.addNewForm(form);
        setForm({ name: "", email: "", password: "", terms: false});
      };

      const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        terms: ""
      })

      const val = () => {

      }

      return (
        <form className="MemberForm" onSubmit={submitForm}>
          <label htmlFor="name">Name</label>
          <input
            onChange={handleChanges}
            id="name"
            type="text"
            name="name"
            placeholder="Name.."
            value={form.title}
          />
          <label htmlFor="member" htmlFor='email'>Email</label>
          <input
            onChange={handleChanges}
            id="email"
            type="text"
            name="email"
            placeholder="Email.."
            value={form.email}
          />
          <label htmlFor='password'> Password</label>
          <input
            onChange={handleChanges}
            id="password"
            type="text"
            name="password"
            placeholder="Password.."
            value={form.password}/>
          
          <label htmlFor='terms'>Some boring Terms you wont read.</label>
            <input type="checkbox"
             id="terms" 
             name="terms" 
             checked={form.terms} 
             value={false}
             onChange={handleChanges}
            
             />
            
          
          <button type="submit">Enter!</button>
        </form>

      );
    };



export default Form;