import React, { useState } from 'react';
import ReactDOM from "react-dom";
import '../App.css';
import * as yup from 'yup';
import axios from 'axios';

const schema = yup.object().shape({
    name: yup.string().required("Please enter a name"),
    email: yup.string().email().required("Please enter an Email address"),
    password: yup.string().required("Please enter a password"),
    terms: yup.boolean().oneOf([true], "Please read these useless terms")
})



const Form = props  => {

    const [users , setUsers] = useState([])

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        terms: false
      });
    
      const handleChanges = event => {
        event.persist()
        validate(event)
        console.log(form, event.target.checked);

        let value = event.target.type === 'checkbox' ? event.target.checked :event.target.value 
        setForm({...form, [event.target.name]: value});
    };

      const submitForm = (event) => {
        event.preventDefault();
        console.log("Submitted!");
        axios.post('https://reqres.in/api/users', form)
        .then( response => console.log(response))
        .catch(err => console.log(err))
      };

      const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        terms: ""
      });

      const validate = (event) => {
        yup.reach(schema, event.target.name)
        .validate(event.target.value)
        .then( valid =>{
            setErrors({
                ...errors,
                [event.target.name]: ""
            })

        })
        .catch(err => {
            console.log(err.errors)
            setErrors({
                ...errors,
                [event.target.name]: err.errors[0]
            })
        })
      };

      return (
        <form className="form" onSubmit={submitForm}>
          <label htmlFor="name">Name</label>
          <input
            onChange={handleChanges}
            id="name"
            type="text"
            name="name"
            placeholder="Name.."
            value={form.title}
          />
          {errors.name.length > 0 ? <p>{errors.name}</p>: null}
          <label htmlFor='email'>Email</label>
          <input
            onChange={handleChanges}
            id="email"
            type="text"
            name="email"
            placeholder="Email.."
            value={form.email}
          />
            {errors.email.length > 0 ? <p>{errors.email}</p>: null}

          <label htmlFor='password'> Password</label>
          <input
            onChange={handleChanges}
            id="password"
            type="text"
            name="password"
            placeholder="Password.."
            value={form.password}/>
          
          {errors.password.length > 0 ? <p>{errors.password}</p>: null}

          <label htmlFor='terms'>Some boring Terms you wont read.</label>
            <input type="checkbox"
             id="terms" 
             name="terms" 
             checked={form.terms} 
             onChange={handleChanges}
            
             />
            
            {errors.terms === false ? <p>{errors.terms}</p>: null}
          
          <button type="submit">Enter!</button>
        </form>

      );
    };



export default Form;