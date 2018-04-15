import React from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import api from '../api';
import { Link } from 'react-router'
import { BrowserRouter as Router, Route } from 'react-router-dom';






let LoginForm = connect(({login}) => {return {login};})((props) => {

  console.log('Login form ', props)
  function update(ev) { 
    let tgt = $(ev.target);
    let data = {};
    data[tgt.attr('name')] = tgt.val();
    props.dispatch({
      type: 'UPDATE_LOGIN_FORM',
      data: data,
    });
  }
 
  function create_token(ev) {
    api.submit_login(props.login);
    console.log(props.login);
  }



  return <div style={{padding: "4ex"}}>
    <h3>Login</h3>
    <FormGroup>
      <Label> User Email </Label>
      <Input type="email" name="email" placeholder="example@dot.com" value={props.login.email} onChange={update}/>
      <Label> Enter Password </Label>
      <Input type="password" name="password" placeholder="pass" value={props.login.password} onChange={update}/>
    </FormGroup>
    <Button onClick={create_token} color="primary">Log In</Button> &nbsp;
  </div>;
});



function Login(props) {
 
  	console.log('I am in login', props)

  	let session_info;
  	session_info = <LoginForm />

  	return (
  		<div>
  		{session_info}
  		</div>
  	);
  }

function state2props(state) {
  return { 
  	token: state.token,
  };
}

// Export the result of a curried function call.
export default connect(state2props)(Login);