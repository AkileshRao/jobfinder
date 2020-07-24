import React from 'react'
import img from '../../assets/4099582.jpg';
import './Auth.scss';
import { ArrowForward } from '@material-ui/icons';

export default function Auth() {
  return (
    <div className='auth'>
      <div className='section-left'>
        <h1>Finding a job has never been easier.</h1>
        <p>Get your dream job with <span>JobUs</span>.</p>
        <div className="user-email">
          <input type="text" placeholder='Enter your email' />
          <button><ArrowForward style={{ fontSize: "2em" }}></ArrowForward></button>
        </div>
      </div>
      <div className="section-right">
        <img src={img} alt="meg" className='auth-img' />
      </div>
    </div>
  )
}
