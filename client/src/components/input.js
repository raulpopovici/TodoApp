import React,{Fragment,useState} from "react";
import axios from "axios";
import {Link} from 'react-router-dom'

const Input = () =>{

    const[username,setUsername] = useState("");
    const[password,setPassword] = useState("");
    const[email,setEmail] = useState("");
    const[confirmPassword,setConfirmPassword] = useState("");

    const onSubmitForm = async (e) =>{
        e.preventDefault();

        try {

            const body = {username,password,confirmPassword,email};
            console.log(body);
            const response = await axios.post("http://localhost:5000/api/register",body);

            console.log(response);

        } catch (err) {
            console.error(err.message)
        }
    }

    return (
    <Fragment>

        <h1 className ="text-center mt-5" > REGISTER </h1>

        <form className = "d-flex mt-5" onSubmit={onSubmitForm}>
            <input type = "text" className= "form-control" value={username} onChange ={e=>setUsername(e.target.value)}/>
            <input type = "password" className= "form-control" value={password} onChange ={e=>setPassword(e.target.value)}/>
            <input type = "password" className= "form-control" value={confirmPassword} onChange ={e=>setConfirmPassword(e.target.value)}/>
            <input type = "text" className= "form-control" value={email} onChange ={e=>setEmail(e.target.value)}/>

            <button className = "btn btn-success" > Register </button>
        </form>

       <Link to =  '/login'>
           LOGIN
       </Link>

    </Fragment>
    )
}

export default Input