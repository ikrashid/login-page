import React, { useEffect, useState, useReducer, useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';

const emailReducer = (state, action) => {
  // return {
  //   value: '',
  //   isValid: false
  // }
  switch (action.type){
    case('USER_INPUT'):
      return {
        ...state,
        value: action.payload,
        isValid: action.payload.includes('@') 
      }
    case('EMAIL_BLUR'):
      return{
        ...state, 
        isValid: state.value.includes('@')
      }
    default: 
      return{
        value: '',
        isValid: false
      }
  }
}

const passwordReducer = (state, action) => {
  switch(action.type){
    case('USER_INPUT'):
      return{
        ...state,
        value: action.payload,
        isValid: action.payload.trim().length > 6 
      }
    case('PASSWORD_BLUR'):
      return{
        ...state,
        isValid: state.value.trim().length > 6 
      }
    default:
      return{
        value: '',
        isValid: false
      }
  }
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: null
  });
 
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '',
    isValid: null
  })

  const authCtx = useContext(AuthContext);

  useEffect(()=>{
    // using useEffect clean up function so we check form validity after user hasnt typed for a certain amount of seconds
    const identifier = setTimeout(()=>{
      setFormIsValid(
        passwordState.isValid && emailState.isValid
      );
    }, 600);
    return () => {
      clearTimeout(identifier);
    }
  }, [passwordState.isValid, emailState.isValid]) 

  const emailChangeHandler = (event) => {
    dispatchEmail({
      type: 'USER_INPUT',
      payload: event.target.value
    })

    // setFormIsValid(
    //   passwordState.isValid && event.target.value.includes('@')
    // );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({
      type: 'USER_INPUT',
      payload: event.target.value
    })
    // setFormIsValid(
    //   emailState.isValid && event.target.value.trim().length > 6
    // );
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid);
    dispatchEmail({
      type: 'EMAIL_BLUR'
    })
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({
      type: 'PASSWORD_BLUR'
    })
  };

  const submitHandler = (event) => {
    event.preventDefault();
    authCtx.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
