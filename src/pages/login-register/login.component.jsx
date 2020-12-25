import React from 'react'
import { Link } from 'react-router-dom';

import { auth, signInWithGoogle } from '../../firebase/firebase-config';

import './login.styles.css'

class LoginPage extends React.Component{
    constructor(props) {
        super(props);
    
        this.state = {
          email: '',
          password: ''
        };
      }
    
      handleSubmit = async event => {
        event.preventDefault();
    
        const { email, password } = this.state;
    
        try {
          await auth.signInWithEmailAndPassword(email, password);
          this.setState({ email: '', password: '' });
        } catch (error) {
          console.log(error);
        }
      };
    
      handleChange = event => {
        const { value, name } = event.target;
    
        this.setState({ [name]: value });
      };

    render () {
        return (
            <div className='login'>
                <Link to='/'>
                    <img 
                    className='login__logo'
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png' />
                </Link>

                <div className="login__container">
                    <h1>Sign-in</h1>

                    <form onSubmit={this.handleSubmit}>
                        <h5>Email</h5>
                        <input type='email' onChange={this.handleChange} value={this.state.email} name='email'/>

                        <h5>Password</h5>
                        <input type='password' value={this.state.password} onChange={this.handleChange} name='password'/>

                        <button className='login__signInButton' type='submit'>Sign In</button>
                    </form>
                        <button className='login__signInButton' onClick={signInWithGoogle}>Sign In With Google</button>

                    <p>
                        By signing-in you agree to the AMAZON FAKE CLONE
                        Conditions of Use & Sale. Please see our Privacy 
                        Notice, our Cookies Notice, and our Interest-Based
                        Ads Notice.
                    </p>

                    <Link to='/register'>
                        <button className='login__registerButton'>
                            Click here to register 
                        </button>
                    </Link>

                </div>
            </div>
    )}
};

export default LoginPage;
