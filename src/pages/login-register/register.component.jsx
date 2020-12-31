import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { selectCurrentUser } from '../../redux/user/user.selectors';



import { auth, createUserProfileDocument } from '../../firebase/firebase-config';

import './register.styles.css';

class RegisterPage extends React.Component {
    constructor() {
        super();
    
        this.state = {
          displayName: '',
          email: '',
          password: '',
          confirmPassword: ''
        };
      }
    
      handleSubmit = async event => {
        event.preventDefault();
    
        const { displayName, email, password, confirmPassword } = this.state;
    
        if (password !== confirmPassword) {
          alert("passwords don't match");
          return;
        }

        if ( password.length < 6 || confirmPassword.length < 6) {
          alert("passwords must be longer than 6 characters");
          return
        }
    
        try {
          const { user } = await auth.createUserWithEmailAndPassword(
            email,
            password
          );
    
          await createUserProfileDocument(user, { displayName });
    
          this.setState({
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
          });
        } catch (error) {
          alert(error);
        }
      };
    
      handleChange = event => {
        const { name, value } = event.target;
    
        this.setState({ [name]: value });
      };    

    render () {
    const { displayName, email, password, confirmPassword, currentUser } = this.state;
    
    return (
        
        <div className='login'>
            <Link to='/'>
                <img 
                className='login__logo'
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png' />
            </Link>

            <div className="login__container">
                <h1>Registration</h1>

                <form onSubmit={this.handleSubmit}>
                    <h5>Username</h5>
                    <input type='text' value={displayName} onChange={this.handleChange} name='displayName' required />

                    <h5>Email</h5>
                    <input type='email' value={email} onChange={this.handleChange} name='email' required/>

                    <h5>Password</h5>
                    <input type='password' value={password} onChange={this.handleChange} name='password'  required/>

                    <h5>Confirm Password</h5>
                    <input type='password' value={confirmPassword} onChange={this.handleChange} name='confirmPassword'  required/>

                    <button className='login__signInButton'>Register</button>
                </form>

                <p>
                    By signing-in you agree to the AMAZON FAKE CLONE
                    Conditions of Use & Sale. Please see our Privacy 
                    Notice, our Cookies Notice, and our Interest-Based
                    Ads Notice.
                </p>

                <Link to='/login'>
                    <button className='login__registerButton'>
                        If you already have an account, Sign In
                    </button>
                </Link>
            </div>
        </div>
    )}
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

export default connect(mapStateToProps)(RegisterPage);
