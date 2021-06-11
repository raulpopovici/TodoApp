import {Fragment,useState} from 'react';
import axios from 'axios'
import {useHistory} from 'react-router-dom';


const Login = () =>{

    const history = useHistory();
    const [username,setUsername] = useState(""); 
    const [password,setPassword] = useState("");

    const handleLogin = async (e)=>{
        e.preventDefault();
        const res = await axios.post('/login',{username,password});

        console.log(res.data);
        
        if(res.data.success === true ){
            history.push('/');
        }
    }


    return (
        <Fragment>

            <form>
                <input type ="text" value={username} onChange={e => setUsername(e.target.value)} placeholder = "Username"/>
                <input type ="password" value={password} onChange={e => setPassword(e.target.value)} placeholder = "Password"/>
                <button onClick={handleLogin}>Login</button>

                
            </form>


        </Fragment>
    )

}

export default Login;