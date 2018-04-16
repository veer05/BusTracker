import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider, connect } from 'react-redux';
import { Button } from 'reactstrap';
import Nav from './nav';
import Login from './login';
//import Feed from './feed';
import Users from './users';
//import PostForm from './post-form';


export default function bustracker_init(store) {
  ReactDOM.render(
    <Provider store={store}>	
      <BusTracker state={store.getState()} />
    </Provider>,
    document.getElementById('root'),
  );
}

let BusTracker = connect((state) => state)((props) => {
  
  function logout(){
    sessionStorage.clear();
    window.location.reload();
}

  console.log('This is inside props',props)
  if (props.token == null){
  	return (
  		<Router>
  			<div>	
  				<Login />
  			</div>
  		</Router>
  	);
  }
  else{
  	return (
    	<Router>
        	<div>
          	<Nav token={props.token}/>
          	<div className="btnlft">
           		<Button onClick={logout}>Log Out</Button>
			</div>
          			Please Work
          	<Route path="/users" exact={true} render={() =>
           	 <Users users={props.users} />
          	} />
        	</div>
    	</Router>
  	);
  }	


});