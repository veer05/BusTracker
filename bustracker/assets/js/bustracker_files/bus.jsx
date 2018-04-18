import React from 'react';
import { Card, CardBody } from 'reactstrap';

export default function Bus(props) {
	console.log('this is bus',props)
	let bus = props.bus;
	if (bus.noBus){
		return(
		<p> {bus.message}</p>);
	}
	else{
  return (
      
          <tr>
          	<td><p> RouteNo-TODO</p></td>
          	<td><p> { bus.arrival_time } </p></td>
          	<td><p>{ bus.departure_time } </p></td>
          </tr>
      
    );}
}