import { useRef, useState, useEffect} from 'react';
import Test from "./Test"
import axios from "axios"
import "./login.css"
const Login = () => {
    
    const userRef = useRef();
    const errRef = useRef();

    const [uid, setuid] = useState('');
    const [password, setpassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])
useEffect(()=>{
    localStorage.setItem('username','password',JSON.stringify(uid,password))
},[uid,password])
    useEffect(() => {
        setErrMsg('');
    }, [uid, password])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://myphysio.digitaldarwin.in/api/login/',
                JSON.stringify({ uid, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));  
            setuid('');
            setpassword('');
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (
        <>
        
            {success ? (
                <section>
                    {<Test/>}
                   
                </section>
            ) : ( <div className='container'>
            
                <section>
                
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Sign In</h1>
                    <div className='form'>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setuid(e.target.value)}
                            placeholder="Username"
                            value={uid}
                            required
                            
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            placeholder='password'
                            onChange={(e) => setpassword(e.target.value)}
                            value={password}
                            required
                        />
                        <button>Sign In</button>


                    </form></div>
                  
                </section>
                </div>
            )}
        </>
    )
}

export default Login