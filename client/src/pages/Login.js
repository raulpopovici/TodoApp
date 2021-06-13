import React,{useState,useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import {Container,Form, Input, Button} from 'semantic-ui-react'
import {useAuthState} from '../auth'

export const Login = () => {
    const history = useHistory();
    const {user} = useAuthState();

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        const res = await axios.post('/login',{username,password});

        if(res.data && res.data.success === true){
            history.push('/');
        }
    }

    const goToRegister = (e) => {
        e.preventDefault();

        history.push("/register");
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
                <Form.Field
                    type="text"
                    width={4}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    control={Input}
                    label='Username'
                    placeholder='user123'
                />

                <Form.Field
                    type="password"
                    width={4}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    control={Input}
                    label='Password'
                    placeholder='pass123456'
                />                

                <Form.Field
                    control={Button}
                    content='Login'
                    onClick={handleLogin}
                />

                <div style={{marginTop: '20px'}}>
                    Don't have an account? <Button secondary style={{marginLeft: '10px'}} onClick={goToRegister}>Register !</Button>
                </div>
            </Form>
        </Container>
    )
}

export default Login;