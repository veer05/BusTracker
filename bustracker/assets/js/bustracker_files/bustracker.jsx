import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider, connect } from 'react-redux';

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
          	<Nav />
          			Please Work
          	<Route path="/users" exact={true} render={() =>
           	 <Users users={props.users} />
          	} />
        	</div>
    	</Router>
  	);
  }	


});