import React from 'react'
import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from "../context/AuthProvider"

import axios from '../api/axios';
const LOGIN_URL = '/authenticate';

const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState();
    const [success, setSuccess] = useState(false);

    useEffect(() => {
      userRef.current.focus();
    }, [])
    
    useEffect(() => {
      setErrMsg('');
    }, [email, password])
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(LOGIN_URL+`?email=${email}&password=${password}`, JSON.stringify({ email, password }),
                {
                    headers: { 
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Credentials': true,
                        'Access-Control-Allow-Origin': "https://java-api.codeboxxtest.xyz",
                        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
                        // 'Authorization': `Bearer ${JWT_TOKEN}`,
                        'admin': true
                     },
                    // withCredentials: true,
                    crossorigin: true
                }
            );
            console.log(JSON.stringify(response.data));
            console.log(JSON.stringify(response));
            const accessToken = response.data.access_token;
            console.log(accessToken)
            setAuth({ email, password, accessToken });
            setEmail('');
            setPassword('');
            setSuccess(true);
        } catch (err) {
            if (err.response.status === null) {
                setErrMsg('No Server Response');
            } else if (err.response.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response.status === 401) {
                setErrMsg('Unauthorized');
            } else if (err.response.status === 403) {
                setErrMsg('Forbidden');
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
                <h1>
                    You are logged in!
                </h1>
                <br />
                <p>
                {/* eslint-disable-next-line */}
                    <a href="#">Go to Home</a>
                </p>
            </section>
        ) : (
            <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
                {errMsg}
            </p>
            <h1>
                Sign In
            </h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">
                    Email:<br />
                </label>
                <input 
                    type="text" 
                    name="" 
                    id="email"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                />
                <br />
                <label htmlFor="password">
                    Password:<br />
                </label>
                <input 
                    type="password" 
                    name="" 
                    id="password"
                    autoComplete="off"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                />
                <br />
                <button>
                    Sign in
                </button>
            </form>
            <p>
                Need an Account?
                <br />
                <span className="line">
                    {/*put router link here*/}
                    {/* eslint-disable-next-line */}
                    <a href="#">
                        Sign Up
                    </a>
                </span>
            </p>
        </section>
    )}
  </>
  
  )
}

export default Login