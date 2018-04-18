import React from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import api from '../api';
import { Link } from 'react-router'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
 import { GoogleLogout } from 'react-google-login';




let LoginForm = connect(({login}) => {return {login};})((props) => {

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
  

  const responseGoogle = (response) => {
  console.log(response);
  api.google_login(response);
  }

  const FailresponseGoogle = (response) => {
  console.log('Pop Up Closed');
  }

  var FontAwesome = require('react-fontawesome')
  console.log("ERROR MSGGGGGG ===============++++ ")
  console.log(props)
  return <div style={{padding: "4ex"}}>
    <h3>Login</h3>
    <FormGroup>
      <Label> User Email </Label>
      <Input type="email" name="email" placeholder="example@dot.com" value={props.login.email} onChange={update}/>
      <Label> Enter Password </Label>
      <Input type="password" name="password" placeholder="**password**" value={props.login.password} onChange={update}/>
    </FormGroup>
    <Button onClick={create_token} color="primary">Log In</Button> &nbsp;

  <GoogleLogin
    clientId={'1006692023654-ii7vqsoj0l55hqtkpulvifvr43tdj02l.apps.googleusercontent.com'}
    onSuccess={responseGoogle}
    onFailure={FailresponseGoogle}>
    <FontAwesome
      className='google'
    />
    <span> Login with Google</span>
  </GoogleLogin>  </div>;
});



function Login(props) {

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