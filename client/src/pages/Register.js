import React,{useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import {Container,Form, Input, Button} from 'semantic-ui-react'
import {useAuthState} from '../auth'

export const Register = () => {
    const history = useHistory();
    const {user} = useAuthState();

    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");    
    const [confirmPassword,setConfirmPassword] = useState("");    

    const handleRegister = async (e) => {
        e.preventDefault();

        const res = await axios.post('/register',{username,email,password,confirmPassword});

        if(res.data) history.push('/login');
    } 

    const goToLogin = (e) => {
        e.preventDefault();

        history.push("/login");
    }

    useEffect(() => {
        if(user) history.push('/');
    },[user])

    return (
        <Container>
            <Form style={{
                width: "100%",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Form.Group widths="equal">
                    <Form.Field
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        control={Input}
                        label="Username"
                        placeholder="user123"
                    />

                    <Form.Field
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        control={Input}
                        label="Email"
                        placeholder="test@mail.me"
                    />      
                </Form.Group>

                <Form.Group widths="equal">
                    <Form.Field
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        control={Input}
                        label="Password"
                        placeholder="pass123456"
                    />

                    <Form.Field
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        control={Input}
                        label="Confirm Password"
                        placeholder="pass123456"
                    />   
                </Form.Group>

                <Form.Field
                    control={Button}
                    content='Register'
                    onClick={handleRegister}
                />
                
                <div style={{marginTop: '20px'}}>
                    Have an account? <Button secondary onClick={goToLogin} style={{marginLeft:'10px'}}>Login !</Button>
                </div>
            </Form>
        </Container>
    )
}

export default Register;