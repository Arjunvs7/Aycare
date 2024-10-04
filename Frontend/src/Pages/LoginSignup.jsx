import React from 'react'

const LoginSignup = () => {
  return (
    <div className='loginsignup' >
      <div className="loginsignup-container">
        <h1>sign up</h1>
        <div className="loginsignup-fields">
          <input type='text' placeholder='Yourname' />
          <input type='email' placeholder='Email Adress' />
          <input type='password' placeholder='password'/>
        </div>
        <button>Continue</button>
        <p className='loginsignup-login'>Alredy have an account? <span>Login here</span></p>
        <div className="loginsignup-agree">
          <input type='checkbox' name='' id='' />
          <p>By continuing,i agree to use terms & privacy</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup