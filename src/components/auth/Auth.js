import React, { useState, useEffect } from 'react'
import img from '../../assets/4099582.jpg';
import './Auth.scss';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';
import SquareLoader from "react-spinners/SquareLoader";
import { css } from "@emotion/core";


const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default function Auth() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authStatus, setAuthStatus] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('user')) {
      history.push('/home');
    }
  }, []);

  const authHandler = () => {
    setLoading(true);
    if (authStatus == 'signUp') {
      setTimeout(() => {
        auth.createUserWithEmailAndPassword(email, password).then(res => {
          setLoading(false);
          toast.success("Successfully signed up!");
          localStorage.setItem('user', email);
          history.push("/home");
        }).catch(err => {
          setLoading(false);
          toast.error(err.message);
        })
      }, 800)
    } else {
      setTimeout(() => {
        auth.signInWithEmailAndPassword(email, password).then(res => {
          setLoading(false);
          toast.success("Successfully signed in!");
          localStorage.setItem('user', email);
          history.push("/home");
        }).catch(err => {
          setLoading(false);
          toast.error(err.message);
        })
      }, 800)
    }
  }

  const fieldHandler = (e) => {
    const { name, value } = e.currentTarget;
    name == "email" ? setEmail(value) : setPassword(value);
  }

  return (
    <div className='auth'>
      {loading ? <div style={{ height: '100vh', width: '100vw', position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255, 255, 255, 0.5)' }}>
        <SquareLoader
          css={override}
          size={150}
          color={"#ffc801"}
          loading={loading}
        />
      </div> : null}
      <div className='container'>
        <div className='header'>
          <h1 onClick={() => setAuthStatus('')}>Job<span>Us.</span></h1>
        </div>
        <div className='body'>
          {
            authStatus == '' ?
              <div className='section-left'>
                <h1>Finding a job has never been easier.</h1>
                <p style={{ fontSize: "2em" }}>Get your dream job with <span>JobUs</span>.</p>
                <div className="user-auth-trigger">
                  <button style={{ fontSize: "1em" }} onClick={() => setAuthStatus('signUp')}>Sign Up</button> OR
                <button style={{ fontSize: "1em" }} onClick={() => setAuthStatus('signIn')}>Sign In</button>
                </div>
              </div>
              :

              (authStatus == "signUp" ?
                <div className='section-left'>
                  <h2>Register</h2>
                  <div className='auth-body'>
                    <input type='text' name='email' value={email} placeholder='Enter your email' onChange={(event) => fieldHandler(event)} />
                    <input type='password' name='password' value={password} placeholder='Enter your password' onChange={(event) => fieldHandler(event)} />
                  </div>
                  <p>Been here already? <span onClick={() => { setEmail(''); setPassword(''); setAuthStatus('signIn') }}>Login</span></p>
                  <button style={{ margin: 0 }} onClick={() => authHandler()}>Sign Up</button>
                </div> :
                <div className='section-left'>
                  <h2>Login</h2>
                  <div className='auth-body'>
                    <input type='text' name='email' value={email} placeholder='Enter your email' onChange={(event) => fieldHandler(event)} />
                    <input type='password' name='password' value={password} placeholder='Enter your password' onChange={(event) => fieldHandler(event)} />
                  </div>
                  <p>New here? <span onClick={() => { setEmail(''); setPassword(''); setAuthStatus('signUp') }}>Sign up</span></p>
                  <button style={{ margin: 0 }} onClick={() => authHandler()}>Sign In</button>
                </div>)

          }

          <div className="section-right">
            <img src={img} alt="meg" className='auth-img' />
          </div>
        </div>

      </div>

    </div >
  )
}
