import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider, connect } from 'react-redux';
import { Button } from 'reactstrap';
import Nav from './nav';
import All_Routes from './all_routes';
import All_Bus from './all_bus';
import Login from './login';
import Users from './users';
import Src_To_Des from './from_to_form';
import api from '../api';
import Map from './map'

export default function bustracker_init(store) {
  ReactDOM.render(
    <Provider store={store}>
      <BusTracker state={store.getState()} />
    </Provider>,
    document.getElementById('root'),
    console.log('this works',store.getState().latitude)
  );
}

let BusTracker = connect((state) => state)((props) => { 
	console.log('this is bustracker',props)
  let stops;
  if (props.stops_nearby.length > 0){
  stops = _.map(props.stops_nearby, (uu) => <option>{uu}</option>);}
  function logout(){
    sessionStorage.clear();
    window.location.reload();
  }

  function printErrorMsg(){
    console.log("<=================>")
    console.log(props.error_msg)
    if((props.error_msg != null)){
      return(<div>
        <p> {props.error_msg} </p>
        <p> Please try again!</p>
      </div>);
    }
  }


  let table;
  console.log('This is inside props',props)
  if (props.srcdest_form.display_flag == true){
  		table = <p> Congrats </p>
  }else{
  		table = <All_Bus busses={props.bus_list} />
  }
  if (props.token == null){
  	return (
  		<Router>
  			<div>	
          {printErrorMsg()}
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
			<Route path="/" exact={true} render={() => 
			<div className="row">
				<div className="col-md-4">
					<Src_To_Des />
				</div>
					<div className="col-md-8">
						<div className="container">
							<div className="row">
		            			<All_Routes />
		            		</div>
		            		<div className = "row">
		            			{ table }
		            		</div>
		            		<div className="row">
	                  			<Map latitude={props.latitude} longitude={props.longitude}/>
	            			</div>
	            		</div>
		          	</div>
	        </div>
			} />
          			Please Work
          	<Route path="/users" exact={true} render={() =>
           	 <Users users={props.users} />
          	} />
        	</div>
    	</Router>
  	);
  }	


});